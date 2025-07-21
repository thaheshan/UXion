// Figma Plugin Main Code
console.log('🎨 DesignAI Pro Plugin Loaded');

// Plugin state
let isConnected = false;
let currentDesign = null;
let websocket = null;

// Initialize plugin
figma.showUI(__html__, { 
  width: 400, 
  height: 600,
  themeColors: true 
});

// WebSocket connection to backend
function connectToServer() {
  try {
    // Note: In actual Figma plugin, you'd use figma.clientStorage for persistent connection
    figma.ui.postMessage({
      type: 'connect-to-server',
      serverUrl: 'http://localhost:3001'
    });
  } catch (error) {
    console.error('Failed to connect to server:', error);
    figma.ui.postMessage({
      type: 'connection-error',
      error: error.message
    });
  }
}

// Create design elements from AI specification
function createDesignFromSpec(designSpec) {
  try {
    console.log('Creating design from spec:', designSpec);
    
    // Create main frame
    const frame = figma.createFrame();
    frame.name = designSpec.title || 'AI Generated Design';
    frame.resize(designSpec.layout?.width || 1200, designSpec.layout?.height || 800);
    
    // Set background
    if (designSpec.layout?.background) {
      const rgb = hexToRgb(designSpec.layout.background);
      frame.fills = [{
        type: 'SOLID',
        color: { r: rgb.r / 255, g: rgb.g / 255, b: rgb.b / 255 }
      }];
    }

    // Create components
    let yOffset = 50;
    const componentSpacing = 20;

    designSpec.components.forEach((component, index) => {
      const element = createComponent(component, frame, yOffset);
      if (element) {
        yOffset += element.height + componentSpacing;
      }
    });

    // Center frame in viewport
    figma.viewport.scrollAndZoomIntoView([frame]);
    
    // Select the frame
    figma.currentPage.selection = [frame];

    // Store current design
    currentDesign = designSpec;

    // Notify UI
    figma.ui.postMessage({
      type: 'design-created',
      success: true,
      designId: designSpec.id,
      message: `Created ${designSpec.type} with ${designSpec.components.length} components`
    });

  } catch (error) {
    console.error('Error creating design:', error);
    figma.ui.postMessage({
      type: 'design-error',
      error: error.message
    });
  }
}

// Create individual components
function createComponent(componentSpec, parent, yPosition) {
  const { type, properties } = componentSpec;
  let element = null;

  switch (type) {
    case 'logo':
      element = createLogo(properties, parent, yPosition);
      break;
    case 'title':
    case 'heading':
      element = createText(properties, parent, yPosition, 'heading');
      break;
    case 'text':
    case 'paragraph':
      element = createText(properties, parent, yPosition, 'body');
      break;
    case 'input':
      element = createInput(properties, parent, yPosition);
      break;
    case 'button':
      element = createButton(properties, parent, yPosition);
      break;
    case 'image':
      element = createImagePlaceholder(properties, parent, yPosition);
      break;
    case 'card':
      element = createCard(properties, parent, yPosition);
      break;
    case 'divider':
      element = createDivider(properties, parent, yPosition);
      break;
    default:
      element = createGenericComponent(properties, parent, yPosition);
  }

  return element;
}

// Component creation functions
function createLogo(properties, parent, yPosition) {
  const logoFrame = figma.createFrame();
  logoFrame.name = 'Logo';
  logoFrame.resize(120, 60);
  logoFrame.x = (parent.width - 120) / 2; // Center horizontally
  logoFrame.y = yPosition;
  
  // Create logo placeholder
  const logoRect = figma.createRectangle();
  logoRect.resize(120, 60);
  logoRect.fills = [{
    type: 'SOLID',
    color: { r: 0.2, g: 0.4, b: 1 }
  }];
  logoRect.cornerRadius = 8;
  
  logoFrame.appendChild(logoRect);
  parent.appendChild(logoFrame);
  
  return logoFrame;
}

function createText(properties, parent, yPosition, textType = 'body') {
  const textNode = figma.createText();
  
  // Load font
  figma.loadFontAsync({ family: "Inter", style: "Regular" }).then(() => {
    textNode.characters = properties.text || 'Sample Text';
    textNode.fontSize = textType === 'heading' ? 32 : 16;
    textNode.fontName = { family: "Inter", style: textType === 'heading' ? "Bold" : "Regular" };
    
    // Position
    textNode.x = 50;
    textNode.y = yPosition;
    
    // Color
    textNode.fills = [{
      type: 'SOLID',
      color: { r: 0.1, g: 0.1, b: 0.1 }
    }];
  });
  
  parent.appendChild(textNode);
  return textNode;
}

function createInput(properties, parent, yPosition) {
  const inputFrame = figma.createFrame();
  inputFrame.name = `Input - ${properties.label || 'Field'}`;
  inputFrame.resize(300, 50);
  inputFrame.x = 50;
  inputFrame.y = yPosition;
  
  // Input background
  inputFrame.fills = [{
    type: 'SOLID',
    color: { r: 1, g: 1, b: 1 }
  }];
  inputFrame.strokes = [{
    type: 'SOLID',
    color: { r: 0.8, g: 0.8, b: 0.8 }
  }];
  inputFrame.strokeWeight = 1;
  inputFrame.cornerRadius = 8;
  
  // Label
  if (properties.label) {
    figma.loadFontAsync({ family: "Inter", style: "Regular" }).then(() => {
      const label = figma.createText();
      label.characters = properties.label;
      label.fontSize = 14;
      label.fontName = { family: "Inter", style: "Medium" };
      label.x = 0;
      label.y = yPosition - 25;
      label.fills = [{
        type: 'SOLID',
        color: { r: 0.3, g: 0.3, b: 0.3 }
      }];
      parent.appendChild(label);
    });
  }
  
  // Placeholder text
  figma.loadFontAsync({ family: "Inter", style: "Regular" }).then(() => {
    const placeholder = figma.createText();
    placeholder.characters = properties.placeholder || `Enter ${properties.label || 'value'}`;
    placeholder.fontSize = 16;
    placeholder.fontName = { family: "Inter", style: "Regular" };
    placeholder.x = 15;
    placeholder.y = 15;
    placeholder.fills = [{
      type: 'SOLID',
      color: { r: 0.6, g: 0.6, b: 0.6 }
    }];
    inputFrame.appendChild(placeholder);
  });
  
  parent.appendChild(inputFrame);
  return inputFrame;
}

function createButton(properties, parent, yPosition) {
  const buttonFrame = figma.createFrame();
  buttonFrame.name = `Button - ${properties.text || 'Button'}`;
  buttonFrame.resize(200, 50);
  buttonFrame.x = 50;
  buttonFrame.y = yPosition;
  
  // Button styling
  const isPrimary = properties.style === 'primary';
  buttonFrame.fills = [{
    type: 'SOLID',
    color: isPrimary 
      ? { r: 0.2, g: 0.4, b: 1 } 
      : { r: 1, g: 1, b: 1 }
  }];
  
  if (!isPrimary) {
    buttonFrame.strokes = [{
      type: 'SOLID',
      color: { r: 0.8, g: 0.8, b: 0.8 }
    }];
    buttonFrame.strokeWeight = 1;
  }
  
  buttonFrame.cornerRadius = 8;
  
  // Button text
  figma.loadFontAsync({ family: "Inter", style: "Medium" }).then(() => {
    const buttonText = figma.createText();
    buttonText.characters = properties.text || 'Button';
    buttonText.fontSize = 16;
    buttonText.fontName = { family: "Inter", style: "Medium" };
    buttonText.textAlignHorizontal = 'CENTER';
    buttonText.textAlignVertical = 'CENTER';
    buttonText.resize(200, 50);
    buttonText.fills = [{
      type: 'SOLID',
      color: isPrimary 
        ? { r: 1, g: 1, b: 1 } 
        : { r: 0.2, g: 0.2, b: 0.2 }
    }];
    buttonFrame.appendChild(buttonText);
  });
  
  parent.appendChild(buttonFrame);
  return buttonFrame;
}

function createImagePlaceholder(properties, parent, yPosition) {
  const imageFrame = figma.createFrame();
  imageFrame.name = 'Image Placeholder';
  imageFrame.resize(properties.width || 300, properties.height || 200);
  imageFrame.x = 50;
  imageFrame.y = yPosition;
  imageFrame.fills = [{
    type: 'SOLID',
    color: { r: 0.95, g: 0.95, b: 0.95 }
  }];
  imageFrame.cornerRadius = 8;
  
  // Add image icon
  figma.loadFontAsync({ family: "Inter", style: "Regular" }).then(() => {
    const imageText = figma.createText();
    imageText.characters = '🖼️ Image';
    imageText.fontSize = 24;
    imageText.fontName = { family: "Inter", style: "Regular" };
    imageText.textAlignHorizontal = 'CENTER';
    imageText.textAlignVertical = 'CENTER';
    imageText.resize(imageFrame.width, imageFrame.height);
    imageText.fills = [{
      type: 'SOLID',
      color: { r: 0.6, g: 0.6, b: 0.6 }
    }];
    imageFrame.appendChild(imageText);
  });
  
  parent.appendChild(imageFrame);
  return imageFrame;
}

function createCard(properties, parent, yPosition) {
  const cardFrame = figma.createFrame();
  cardFrame.name = 'Card';
  cardFrame.resize(350, 200);
  cardFrame.x = 50;
  cardFrame.y = yPosition;
  cardFrame.fills = [{
    type: 'SOLID',
    color: { r: 1, g: 1, b: 1 }
  }];
  cardFrame.cornerRadius = 12;
  cardFrame.effects = [{
    type: 'DROP_SHADOW',
    color: { r: 0, g: 0, b: 0, a: 0.1 },
    offset: { x: 0, y: 4 },
    radius: 12,
    visible: true
  }];
  
  parent.appendChild(cardFrame);
  return cardFrame;
}

function createDivider(properties, parent, yPosition) {
  const divider = figma.createLine();
  divider.name = 'Divider';
  divider.resize(300, 0);
  divider.x = 50;
  divider.y = yPosition;
  divider.strokes = [{
    type: 'SOLID',
    color: { r: 0.9, g: 0.9, b: 0.9 }
  }];
  divider.strokeWeight = 1;
  
  parent.appendChild(divider);
  return divider;
}

function createGenericComponent(properties, parent, yPosition) {
  const genericFrame = figma.createFrame();
  genericFrame.name = properties.name || 'Component';
  genericFrame.resize(300, 100);
  genericFrame.x = 50;
  genericFrame.y = yPosition;
  genericFrame.fills = [{
    type: 'SOLID',
    color: { r: 0.98, g: 0.98, b: 0.98 }
  }];
  genericFrame.cornerRadius = 8;
  
  parent.appendChild(genericFrame);
  return genericFrame;
}

// Utility functions
function hexToRgb(hex) {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result ? {
    r: parseInt(result[1], 16),
    g: parseInt(result[2], 16),
    b: parseInt(result[3], 16)
  } : { r: 255, g: 255, b: 255 };
}

// Message handling from UI
figma.ui.onmessage = (msg) => {
  console.log('Received message:', msg);
  
  switch (msg.type) {
    case 'create-design':
      createDesignFromSpec(msg.designSpec);
      break;
      
    case 'connect-server':
      connectToServer();
      break;
      
    case 'update-design':
      if (currentDesign && msg.designSpec) {
        // Clear current design
        const selection = figma.currentPage.selection;
        selection.forEach(node => node.remove());
        
        // Create updated design
        createDesignFromSpec(msg.designSpec);
      }
      break;
      
    case 'export-design':
      if (currentDesign) {
        figma.ui.postMessage({
          type: 'design-exported',
          design: currentDesign,
          figmaFileKey: figma.fileKey
        });
      }
      break;
      
    case 'close-plugin':
      figma.closePlugin();
      break;
      
    default:
      console.log('Unknown message type:', msg.type);
  }
};

// Initialize connection on plugin start
connectToServer();