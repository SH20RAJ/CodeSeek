const vscode = require('vscode');
const { OpenAI } = require('openai');

/**
 * Utility class for DeepSeek API operations
 */
class ApiUtils {
  /**
   * Create a new OpenAI client with DeepSeek base URL
   * @returns {OpenAI|null} The OpenAI client or null if API key is not configured
   */
  static createClient() {
    const config = vscode.workspace.getConfiguration('codeseek');
    const apiKey = config.get('apiKey');

    if (!apiKey) {
      vscode.window.showErrorMessage('Please configure your DeepSeek API key in settings');
      return null;
    }

    return new OpenAI({
      baseURL: 'https://api.deepseek.com/v1',
      apiKey: apiKey,
    });
  }

  /**
   * Get configuration values
   * @returns {Object} Configuration object with maxTokens and temperature
   */
  static getConfig() {
    const config = vscode.workspace.getConfiguration('codeseek');
    return {
      maxTokens: config.get('maxTokens') || 100,
      temperature: config.get('temperature') || 0.7
    };
  }

  /**
   * Handle API errors
   * @param {Error} error The error object
   * @returns {string} Error message
   */
  static handleError(error) {
    console.error('DeepSeek API Error:', error);
    let message = error.message || 'Unknown error occurred';
    
    if (error.response) {
      message = `API Error [${error.response.status}]: ${message}`;
    }
    
    vscode.window.showErrorMessage(`CodeSeek: ${message}`);
    return message;
  }
}

module.exports = ApiUtils;
