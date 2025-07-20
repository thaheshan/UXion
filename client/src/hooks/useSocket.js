import { useEffect, useState, useCallback } from 'react';
import socketService from '../services/socketService';

export const useSocket = () => {
  const [isConnected, setIsConnected] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [connectionError, setConnectionError] = useState(null);

  useEffect(() => {
    // Connect to socket
    socketService.connect();

    // Set up event listeners
    const handleConnectionStatus = ({ connected }) => {
      setIsConnected(connected);
      if (connected) {
        setConnectionError(null);
      }
    };

    const handleConnectionError = (error) => {
      setConnectionError(error.message || 'Connection failed');
      setIsConnected(false);
    };

    const handleTyping = ({ isTyping }) => {
      setIsTyping(isTyping);
    };

    socketService.on('connection-status', handleConnectionStatus);
    socketService.on('connection-error', handleConnectionError);
    socketService.on('ai-typing', handleTyping);

    // Cleanup on unmount
    return () => {
      socketService.off('connection-status', handleConnectionStatus);
      socketService.off('connection-error', handleConnectionError);
      socketService.off('ai-typing', handleTyping);
      socketService.disconnect();
    };
  }, []);

  const generateDesign = useCallback((prompt, designType) => {
    try {
      socketService.generateDesign(prompt, designType);
    } catch (error) {
      console.error('Failed to generate design:', error);
      throw error;
    }
  }, []);

  const modifyDesign = useCallback((designId, modification, prompt) => {
    try {
      socketService.modifyDesign(designId, modification, prompt);
    } catch (error) {
      console.error('Failed to modify design:', error);
      throw error;
    }
  }, []);

  const connectFigma = useCallback((pluginData) => {
    try {
      socketService.connectFigma(pluginData);
    } catch (error) {
      console.error('Failed to connect Figma:', error);
      throw error;
    }
  }, []);

  return {
    isConnected,
    isTyping,
    connectionError,
    generateDesign,
    modifyDesign,
    connectFigma,
    socketService
  };
};

export default useSocket;