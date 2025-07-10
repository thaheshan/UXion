import io from 'socket.io-client';

class SocketService {
  constructor() {
    this.socket = null;
    this.isConnected = false;
    this.listeners = new Map();
  }

  connect() {
    const serverUrl = import.meta.env.VITE_SERVER_URL || 'http://localhost:3001';
    
    this.socket = io(serverUrl, {
      transports: ['websocket', 'polling'],
      timeout: 20000,
      forceNew: true
    });

    this.socket.on('connect', () => {
      console.log('✅ Connected to server:', this.socket.id);
      this.isConnected = true;
      this.emit('connection-status', { connected: true });
    });

    this.socket.on('disconnect', () => {
      console.log('❌ Disconnected from server');
      this.isConnected = false;
      this.emit('connection-status', { connected: false });
    });

    this.socket.on('connect_error', (error) => {
      console.error('Connection error:', error);
      this.emit('connection-error', error);
    });

    // Design generation events
    this.socket.on('ai-typing', (data) => {
      this.emit('ai-typing', data);
    });

    this.socket.on('design-generated', (data) => {
      this.emit('design-generated', data);
    });

    this.socket.on('design-modified', (data) => {
      this.emit('design-modified', data);
    });

    this.socket.on('design-error', (data) => {
      this.emit('design-error', data);
    });

    // Figma integration events
    this.socket.on('figma-connected', (data) => {
      this.emit('figma-connected', data);
    });

    this.socket.on('figma-update', (data) => {
      this.emit('figma-update', data);
    });

    return this.socket;
  }

  disconnect() {
    if (this.socket) {
      this.socket.disconnect();
      this.socket = null;
      this.isConnected = false;
    }
  }

  // Event emitter methods
  on(event, callback) {
    if (!this.listeners.has(event)) {
      this.listeners.set(event, []);
    }
    this.listeners.get(event).push(callback);
  }

  off(event, callback) {
    if (this.listeners.has(event)) {
      const callbacks = this.listeners.get(event);
      const index = callbacks.indexOf(callback);
      if (index > -1) {
        callbacks.splice(index, 1);
      }
    }
  }

  emit(event, data) {
    if (this.listeners.has(event)) {
      this.listeners.get(event).forEach(callback => callback(data));
    }
  }

  // Design generation methods
  generateDesign(prompt, designType = 'general') {
    if (!this.isConnected) {
      throw new Error('Not connected to server');
    }

    this.socket.emit('generate-design', {
      prompt,
      designType,
      sessionId: this.socket.id,
      timestamp: new Date().toISOString()
    });
  }

  modifyDesign(designId, modification, prompt) {
    if (!this.isConnected) {
      throw new Error('Not connected to server');
    }

    this.socket.emit('modify-design', {
      designId,
      modification,
      prompt,
      timestamp: new Date().toISOString()
    });
  }

  // Figma integration methods
  connectFigma(pluginData) {
    if (!this.isConnected) {
      throw new Error('Not connected to server');
    }

    this.socket.emit('figma-connect', {
      ...pluginData,
      timestamp: new Date().toISOString()
    });
  }

  requestDesign(designId) {
    if (!this.isConnected) {
      throw new Error('Not connected to server');
    }

    this.socket.emit('figma-request-design', { designId });
  }

  sendFigmaUpdate(updateData) {
    if (!this.isConnected) {
      throw new Error('Not connected to server');
    }

    this.socket.emit('figma-update', updateData);
  }
}

export default new SocketService();