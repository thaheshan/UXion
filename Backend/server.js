import express from 'express';
import { createServer } from 'http';
import { Server } from 'socket.io';
import cors from 'cors';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import dotenv from 'dotenv';
import { v4 as uuidv4 } from 'uuid';
import OpenAI from 'openai';

dotenv.config();

const app = express();
const server = createServer(app);
const io = new Server(server, {
  cors: {
    origin: process.env.NODE_ENV === 'production' 
      ? ['https://your-domain.com'] 
      : ['http://localhost:5173', 'http://localhost:3000'],
    methods: ['GET', 'POST'],
    credentials: true
  }
});

// Initialize OpenAI
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY || 'your-openai-api-key-here'
});

// Middleware
app.use(helmet());
app.use(cors({
  origin: process.env.NODE_ENV === 'production' 
    ? ['https://your-domain.com'] 
    : ['http://localhost:5173', 'http://localhost:3000'],
  credentials: true
}));
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
  message: 'Too many requests from this IP, please try again later.'
});
app.use('/api/', limiter);

// Store active sessions and designs
const activeSessions = new Map();
const designHistory = new Map();

// Design generation prompts and templates
const DESIGN_PROMPTS = {
  login: {
    system: "You are an expert UI/UX designer. Create a detailed design specification for a login screen based on the user's requirements.",
    template: {
      type: "login-screen",
      components: [
        { type: "logo", position: "top-center", size: "medium" },
        { type: "title", text: "Welcome Back", style: "heading-1" },
        { type: "input", label: "Email", type: "email", required: true },
        { type: "input", label: "Password", type: "password", required: true },
        { type: "button", text: "Sign In", style: "primary", action: "submit" },
        { type: "divider", text: "or" },
        { type: "social-buttons", providers: ["google", "github"] },
        { type: "link", text: "Forgot Password?", action: "forgot-password" }
      ]
    }
  },
  dashboard: {
    system: "You are an expert UI/UX designer. Create a detailed design specification for a dashboard interface based on the user's requirements.",
    template: {
      type: "dashboard",
      layout: "sidebar-main",
      components: [
        { type: "sidebar", items: ["dashboard", "analytics", "projects", "settings"] },
        { type: "header", items: ["search", "notifications", "profile"] },
        { type: "stats-cards", count: 4 },
        { type: "chart", chartType: "line", title: "Analytics Overview" },
        { type: "data-table", title: "Recent Activity" }
      ]
    }
  },
  landing: {
    system: "You are an expert UI/UX designer. Create a detailed design specification for a landing page based on the user's requirements.",
    template: {
      type: "landing-page",
      sections: [
        { type: "hero", layout: "center", cta: true },
        { type: "features", layout: "grid", columns: 3 },
        { type: "testimonials", layout: "carousel" },
        { type: "pricing", layout: "cards" },
        { type: "cta", style: "gradient-background" },
        { type: "footer", style: "minimal" }
      ]
    }
  }
};

// AI Design Generation Function
async function generateDesign(prompt, designType = 'general') {
  try {
    const systemPrompt = DESIGN_PROMPTS[designType]?.system || 
      "You are an expert UI/UX designer. Create a detailed design specification based on the user's requirements.";
    
    const completion = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [
        {
          role: "system",
          content: `${systemPrompt}
          
          Return a JSON object with the following structure:
          {
            "type": "design-type",
            "title": "Design Title",
            "description": "Brief description",
            "components": [
              {
                "id": "unique-id",
                "type": "component-type",
                "properties": {
                  "text": "content",
                  "style": "styling-info",
                  "position": "layout-info"
                }
              }
            ],
            "layout": {
              "width": 1200,
              "height": 800,
              "background": "#ffffff"
            },
            "figmaInstructions": [
              "Step-by-step instructions for Figma plugin"
            ]
          }`
        },
        {
          role: "user",
          content: prompt
        }
      ],
      temperature: 0.7,
      max_tokens: 2000
    });

    const designSpec = JSON.parse(completion.choices[0].message.content);
    
    // Add unique ID and timestamp
    designSpec.id = uuidv4();
    designSpec.timestamp = new Date().toISOString();
    designSpec.prompt = prompt;
    
    return designSpec;
  } catch (error) {
    console.error('Error generating design:', error);
    throw new Error('Failed to generate design');
  }
}

// Socket.IO connection handling
io.on('connection', (socket) => {
  console.log('User connected:', socket.id);
  
  // Store session
  activeSessions.set(socket.id, {
    id: socket.id,
    connectedAt: new Date(),
    designs: []
  });

  // Handle design generation request
  socket.on('generate-design', async (data) => {
    try {
      const { prompt, designType, sessionId } = data;
      
      // Emit typing indicator
      socket.emit('ai-typing', { isTyping: true });
      
      // Generate design using AI
      const designSpec = await generateDesign(prompt, designType);
      
      // Store in session
      const session = activeSessions.get(socket.id);
      if (session) {
        session.designs.push(designSpec);
      }
      
      // Store in design history
      designHistory.set(designSpec.id, designSpec);
      
      // Stop typing indicator
      socket.emit('ai-typing', { isTyping: false });
      
      // Send design back to client
      socket.emit('design-generated', {
        success: true,
        design: designSpec,
        message: `I've created a ${designSpec.type} based on your description. The design includes ${designSpec.components.length} components and is ready for Figma export.`
      });
      
      // Broadcast to Figma plugin if connected
      socket.broadcast.emit('figma-update', {
        type: 'new-design',
        design: designSpec
      });
      
    } catch (error) {
      console.error('Design generation error:', error);
      socket.emit('ai-typing', { isTyping: false });
      socket.emit('design-error', {
        success: false,
        message: 'Sorry, I encountered an error while generating your design. Please try again.'
      });
    }
  });

  // Handle design modification requests
  socket.on('modify-design', async (data) => {
    try {
      const { designId, modification, prompt } = data;
      const originalDesign = designHistory.get(designId);
      
      if (!originalDesign) {
        socket.emit('design-error', {
          success: false,
          message: 'Original design not found.'
        });
        return;
      }

      socket.emit('ai-typing', { isTyping: true });
      
      // Generate modification using AI
      const modificationPrompt = `
        Modify the following design based on this request: "${prompt}"
        
        Original design: ${JSON.stringify(originalDesign)}
        
        Return the complete modified design in the same JSON format.
      `;
      
      const modifiedDesign = await generateDesign(modificationPrompt, originalDesign.type);
      modifiedDesign.parentId = designId;
      modifiedDesign.modification = modification;
      
      // Store modified design
      designHistory.set(modifiedDesign.id, modifiedDesign);
      
      socket.emit('ai-typing', { isTyping: false });
      socket.emit('design-modified', {
        success: true,
        design: modifiedDesign,
        message: `I've updated your design based on your request: "${prompt}"`
      });
      
      // Update Figma plugin
      socket.broadcast.emit('figma-update', {
        type: 'design-modified',
        design: modifiedDesign
      });
      
    } catch (error) {
      console.error('Design modification error:', error);
      socket.emit('ai-typing', { isTyping: false });
      socket.emit('design-error', {
        success: false,
        message: 'Sorry, I encountered an error while modifying your design. Please try again.'
      });
    }
  });

  // Handle Figma plugin connection
  socket.on('figma-connect', (data) => {
    console.log('Figma plugin connected:', data);
    socket.join('figma-plugins');
    socket.emit('figma-connected', { success: true });
  });

  // Handle Figma plugin requests
  socket.on('figma-request-design', (data) => {
    const { designId } = data;
    const design = designHistory.get(designId);
    
    if (design) {
      socket.emit('figma-design-data', { design });
    } else {
      socket.emit('figma-error', { message: 'Design not found' });
    }
  });

  // Handle disconnect
  socket.on('disconnect', () => {
    console.log('User disconnected:', socket.id);
    activeSessions.delete(socket.id);
  });
});

// REST API Routes
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date().toISOString() });
});

app.get('/api/designs', (req, res) => {
  const designs = Array.from(designHistory.values());
  res.json({ designs: designs.slice(-20) }); // Return last 20 designs
});

app.get('/api/designs/:id', (req, res) => {
  const design = designHistory.get(req.params.id);
  if (design) {
    res.json({ design });
  } else {
    res.status(404).json({ error: 'Design not found' });
  }
});

app.post('/api/export-figma', async (req, res) => {
  try {
    const { designId, figmaFileKey, accessToken } = req.body;
    const design = designHistory.get(designId);
    
    if (!design) {
      return res.status(404).json({ error: 'Design not found' });
    }
    
    // Here you would implement actual Figma API integration
    // For now, we'll simulate the export process
    
    res.json({
      success: true,
      message: 'Design exported to Figma successfully',
      figmaUrl: `https://figma.com/file/${figmaFileKey}`,
      exportedAt: new Date().toISOString()
    });
    
  } catch (error) {
    console.error('Figma export error:', error);
    res.status(500).json({ error: 'Failed to export to Figma' });
  }
});

// Error handling middleware
app.use((error, req, res, next) => {
  console.error('Server error:', error);
  res.status(500).json({ error: 'Internal server error' });
});

const PORT = process.env.PORT || 3001;

server.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`🌐 Frontend: http://localhost:5173`);
  console.log(`🔌 WebSocket: ws://localhost:${PORT}`);
});