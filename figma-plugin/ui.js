// Figma Plugin UI JavaScript
console.log('🎨 DesignAI Pro UI Loaded');

// State management
let isConnected = false;
let isTyping = false;
let socket = null;
let currentDesign = null;
let messageHistory = [];

// DOM elements
const messagesContainer = document.getElementById('messages');
const messageInput = document.getElementById('messageInput');
const sendBtn = document.getElementById('sendBtn');
const connectionStatus = document.getElementById('connectionStatus');

// Initialize plugin UI
document.addEventListener('DOMContentLoaded', () => {
  setupEventListeners();
  connectToServer();
  loadMessageHistory();
});

// Event listeners
function setupEventListeners() {
  // Message input handling
  messageInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  });

  messageInput.addEventListener('input', () => {
    autoResizeTextarea();
  });

  // Send button
  sendBtn.addEventListener('click', sendMessage);
}

// Auto-resize textarea
function autoResizeTextarea() {
  messageInput.style.height = 'auto';
  messageInput.style.height = Math.min(messageInput.scrollHeight, 100) + 'px';
}

// Connect to WebSocket server
function connectToServer() {
  try {
    updateConnectionStatus('connecting', '🟡 Connecting to server...');
    
    // Simulate WebSocket connection (in real plugin, this would be actual WebSocket)
    setTimeout(() => {
      isConnected = true;
      updateConnectionStatus('connected', '🟢 Connected to DesignAI Pro');
      
      // Send connection message to main plugin code
      parent.postMessage({
        pluginMessage: {
          type: 'connect-server',
          timestamp: new Date().toISOString()
        }
      }, '*');
      
      addSystemMessage('Connected! Ready to generate designs.');
    }, 1500);
    
  } catch (error) {
    console.error('Connection failed:', error);
    updateConnectionStatus('disconnected', '🔴 Connection failed');
    addSystemMessage('Connection failed. Please try again.');
  }
}

// Update connection status
function updateConnectionStatus(status, message) {
  connectionStatus.textContent = message;
  connectionStatus.className = `connection-status ${status}`;
}

// Send message
function sendMessage() {
  const message = messageInput.value.trim();
  if (!message || !isConnected || isTyping) return;

  // Add user message to chat
  addMessage(message, 'user');
  messageInput.value = '';
  autoResizeTextarea();

  // Show typing indicator
  showTypingIndicator();

  // Detect design type from message
  const designType = detectDesignType(message);

  // Send to main plugin code
  parent.postMessage({
    pluginMessage: {
      type: 'generate-design',
      prompt: message,
      designType: designType,
      timestamp: new Date().toISOString()
    }
  }, '*');

  // Simulate AI response (in real implementation, this comes from server)
  setTimeout(() => {
    hideTypingIndicator();
    handleDesignGeneration(message, designType);
  }, 2000 + Math.random() * 1000);
}

// Quick message sender
function sendQuickMessage(message) {
  messageInput.value = message;
  sendMessage();
}

// Detect design type from user message
function detectDesignType(message) {
  const lowerMessage = message.toLowerCase();
  
  if (lowerMessage.includes('login') || lowerMessage.includes('signin') || lowerMessage.includes('sign in')) {
    return 'login';
  } else if (lowerMessage.includes('dashboard') || lowerMessage.includes('admin')) {
    return 'dashboard';
  } else if (lowerMessage.includes('landing') || lowerMessage.includes('homepage') || lowerMessage.includes('hero')) {
    return 'landing';
  } else if (lowerMessage.includes('mobile') || lowerMessage.includes('app')) {
    return 'mobile';
  } else if (lowerMessage.includes('card') || lowerMessage.includes('profile')) {
    return 'card';
  }
  
  return 'general';
}

// Handle design generation
function handleDesignGeneration(prompt, designType) {
  // Generate mock design specification
  const designSpec = generateMockDesign(prompt, designType);
  currentDesign = designSpec;

  // Add AI response with design preview
  const aiMessage = `I've created a ${designSpec.type} based on your description. The design includes ${designSpec.components.length} components and is being generated in Figma now.`;
  
  addMessage(aiMessage, 'ai', designSpec);

  // Send design to main plugin code for creation
  parent.postMessage({
    pluginMessage: {
      type: 'create-design',
      designSpec: designSpec
    }
  }, '*');

  // Save to history
  saveToHistory(prompt, designSpec);
}

// Generate mock design specification
function generateMockDesign(prompt, designType) {
  const baseDesign = {
    id: generateId(),
    title: `AI Generated ${designType.charAt(0).toUpperCase() + designType.slice(1)}`,
    type: designType,
    description: `Generated from: "${prompt}"`,
    timestamp: new Date().toISOString(),
    layout: {
      width: 1200,
      height: 800,
      background: '#ffffff'
    },
    components: []
  };

  // Add components based on design type
  switch (designType) {
    case 'login':
      baseDesign.components = [
        { id: '1', type: 'logo', properties: { position: 'top-center' } },
        { id: '2', type: 'title', properties: { text: 'Welcome Back', style: 'heading' } },
        { id: '3', type: 'input', properties: { label: 'Email', type: 'email', placeholder: 'Enter your email' } },
        { id: '4', type: 'input', properties: { label: 'Password', type: 'password', placeholder: 'Enter your password' } },
        { id: '5', type: 'button', properties: { text: 'Sign In', style: 'primary' } },
        { id: '6', type: 'divider', properties: { text: 'or' } },
        { id: '7', type: 'button', properties: { text: 'Continue with Google', style: 'secondary' } }
      ];
      break;
      
    case 'dashboard':
      baseDesign.components = [
        { id: '1', type: 'header', properties: { title: 'Dashboard' } },
        { id: '2', type: 'card', properties: { title: 'Total Users', value: '1,234' } },
        { id: '3', type: 'card', properties: { title: 'Revenue', value: '$12,345' } },
        { id: '4', type: 'card', properties: { title: 'Orders', value: '567' } },
        { id: '5', type: 'chart', properties: { type: 'line', title: 'Analytics' } }
      ];
      break;
      
    case 'landing':
      baseDesign.components = [
        { id: '1', type: 'header', properties: { navigation: true } },
        { id: '2', type: 'title', properties: { text: 'Welcome to Our Platform', style: 'hero' } },
        { id: '3', type: 'text', properties: { text: 'Discover amazing features and boost your productivity' } },
        { id: '4', type: 'button', properties: { text: 'Get Started', style: 'primary' } },
        { id: '5', type: 'image', properties: { width: 600, height: 400 } }
      ];
      break;
      
    default:
      baseDesign.components = [
        { id: '1', type: 'title', properties: { text: 'Generated Design', style: 'heading' } },
        { id: '2', type: 'text', properties: { text: 'This is a custom design based on your prompt.' } },
        { id: '3', type: 'button', properties: { text: 'Action Button', style: 'primary' } }
      ];
  }

  return baseDesign;
}

// Add message to chat
function addMessage(content, type, design = null) {
  const messageDiv = document.createElement('div');
  messageDiv.className = `message ${type}`;
  messageDiv.textContent = content;

  // Add design preview if provided
  if (design && type === 'ai') {
    const previewDiv = document.createElement('div');
    previewDiv.className = 'design-preview';
    previewDiv.innerHTML = `
      <h4>🎨 ${design.title}</h4>
      <p style="font-size: 11px; color: #6c757d; margin-bottom: 8px;">
        ${design.components.length} components • ${design.type}
      </p>
      <div class="design-actions">
        <button class="btn btn-primary" onclick="createInFigma('${design.id}')">
          Create in Figma
        </button>
        <button class="btn btn-secondary" onclick="modifyDesign('${design.id}')">
          Modify
        </button>
      </div>
    `;
    messageDiv.appendChild(previewDiv);
  }

  messagesContainer.appendChild(messageDiv);
  scrollToBottom();
  
  // Save to history
  messageHistory.push({
    content,
    type,
    design,
    timestamp: new Date().toISOString()
  });
}

// Add system message
function addSystemMessage(content) {
  const messageDiv = document.createElement('div');
  messageDiv.className = 'message system';
  messageDiv.textContent = content;
  messagesContainer.appendChild(messageDiv);
  scrollToBottom();
}

// Show typing indicator
function showTypingIndicator() {
  if (isTyping) return;
  
  isTyping = true;
  sendBtn.disabled = true;
  
  const typingDiv = document.createElement('div');
  typingDiv.className = 'typing-indicator';
  typingDiv.id = 'typingIndicator';
  typingDiv.innerHTML = `
    <div class="typing-dots">
      <div class="typing-dot"></div>
      <div class="typing-dot"></div>
      <div class="typing-dot"></div>
    </div>
    <span style="font-size: 12px; color: #6c757d;">AI is designing...</span>
  `;
  
  messagesContainer.appendChild(typingDiv);
  scrollToBottom();
}

// Hide typing indicator
function hideTypingIndicator() {
  isTyping = false;
  sendBtn.disabled = false;
  
  const typingIndicator = document.getElementById('typingIndicator');
  if (typingIndicator) {
    typingIndicator.remove();
  }
}

// Scroll to bottom of messages
function scrollToBottom() {
  messagesContainer.scrollTop = messagesContainer.scrollHeight;
}

// Create design in Figma
function createInFigma(designId) {
  const design = currentDesign;
  if (!design) return;

  addSystemMessage('Creating design in Figma...');
  
  parent.postMessage({
    pluginMessage: {
      type: 'create-design',
      designSpec: design
    }
  }, '*');
}

// Modify design
function modifyDesign(designId) {
  const modification = prompt('How would you like to modify this design?');
  if (!modification) return;

  addMessage(modification, 'user');
  showTypingIndicator();

  setTimeout(() => {
    hideTypingIndicator();
    addMessage('I\'ve updated the design based on your feedback. The changes are being applied in Figma.', 'ai');
    
    // Send modification to main plugin
    parent.postMessage({
      pluginMessage: {
        type: 'modify-design',
        designId: designId,
        modification: modification
      }
    }, '*');
  }, 1500);
}

// Utility functions
function generateId() {
  return Math.random().toString(36).substr(2, 9);
}

function saveToHistory(prompt, design) {
  // In a real implementation, this would save to figma.clientStorage
  console.log('Saving to history:', { prompt, design });
}

function loadMessageHistory() {
  // In a real implementation, this would load from figma.clientStorage
  console.log('Loading message history...');
}

// Listen for messages from main plugin code
window.addEventListener('message', (event) => {
  const { type, data } = event.data.pluginMessage || {};
  
  switch (type) {
    case 'design-created':
      addSystemMessage('✅ Design created successfully in Figma!');
      break;
      
    case 'design-error':
      addSystemMessage('❌ Error creating design. Please try again.');
      break;
      
    case 'connection-status':
      updateConnectionStatus(data.connected ? 'connected' : 'disconnected', 
        data.connected ? '🟢 Connected' : '🔴 Disconnected');
      break;
      
    default:
      console.log('Unknown message from plugin:', type, data);
  }
});

// Initialize welcome message
setTimeout(() => {
  addMessage('Hello! I\'m your AI design assistant. Describe any interface you\'d like to create and I\'ll generate it in Figma instantly. Try saying something like "Create a modern login screen" or "Design a dashboard for analytics".', 'ai');
}, 500);