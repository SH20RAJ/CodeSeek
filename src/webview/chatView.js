const vscode = require('vscode');
const path = require('path');

/**
 * Manages the chat webview panel
 */
class ChatView {
  /**
   * @param {vscode.ExtensionContext} context
   */
  constructor(context) {
    this.context = context;
    this.panel = null;
    this.apiClient = null;
    this.messages = [];
  }

  /**
   * Set the API client
   * @param {OpenAI} client The OpenAI client
   */
  setApiClient(client) {
    this.apiClient = client;
  }

  /**
   * Create and show the chat panel
   */
  show() {
    if (this.panel) {
      this.panel.reveal();
      return;
    }

    // Create and show panel
    this.panel = vscode.window.createWebviewPanel(
      'codeseekChat',
      'CodeSeek Chat',
      vscode.ViewColumn.Beside,
      {
        enableScripts: true,
        retainContextWhenHidden: true,
        localResourceRoots: [
          vscode.Uri.file(path.join(this.context.extensionPath, 'media'))
        ]
      }
    );

    // Set initial HTML content
    this.panel.webview.html = this.getWebviewContent();

    // Handle messages from the webview
    this.panel.webview.onDidReceiveMessage(
      async message => {
        switch (message.command) {
          case 'sendMessage':
            await this.handleUserMessage(message.text);
            break;
        }
      },
      undefined,
      this.context.subscriptions
    );

    // Reset when the panel is closed
    this.panel.onDidDispose(
      () => {
        this.panel = null;
      },
      null,
      this.context.subscriptions
    );
  }

  /**
   * Handle user messages
   * @param {string} text The user's message
   */
  async handleUserMessage(text) {
    if (!this.apiClient) {
      this.updateChat('system', 'Error: API client not configured. Please set your DeepSeek API key in settings.');
      return;
    }

    // Add user message to chat
    this.messages.push({ role: 'user', content: text });
    this.updateChat('user', text);

    try {
      // Show loading indicator
      this.panel.webview.postMessage({ command: 'setLoading', value: true });

      // Get response from API
      const completion = await this.apiClient.chat.completions.create({
        model: 'deepseek-chat',
        messages: [
          {
            role: 'system',
            content: 'You are CodeSeek, an AI coding assistant. Help the user with coding questions, explain concepts, and provide code examples when appropriate. Be concise but thorough.'
          },
          ...this.messages
        ],
        temperature: 0.7,
        max_tokens: 1000
      });

      // Process response
      const responseText = completion.choices[0].message.content;
      this.messages.push({ role: 'assistant', content: responseText });
      this.updateChat('assistant', responseText);
    } catch (error) {
      console.error('Chat API Error:', error);
      this.updateChat('system', `Error: ${error.message}`);
    } finally {
      // Hide loading indicator
      this.panel.webview.postMessage({ command: 'setLoading', value: false });
    }
  }

  /**
   * Update the chat with a new message
   * @param {string} role The role (user, assistant, system)
   * @param {string} content The message content
   */
  updateChat(role, content) {
    if (this.panel) {
      this.panel.webview.postMessage({
        command: 'addMessage',
        role,
        content
      });
    }
  }

  /**
   * Get the HTML content for the webview
   * @returns {string} The HTML content
   */
  getWebviewContent() {
    return `<!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>CodeSeek Chat</title>
        <style>
            body {
                font-family: var(--vscode-font-family);
                padding: 0;
                margin: 0;
                color: var(--vscode-editor-foreground);
                display: flex;
                flex-direction: column;
                height: 100vh;
            }
            .chat-container {
                flex: 1;
                overflow-y: auto;
                padding: 20px;
            }
            .message {
                margin-bottom: 15px;
                display: flex;
                flex-direction: column;
            }
            .message-header {
                font-weight: bold;
                margin-bottom: 5px;
            }
            .user .message-header {
                color: var(--vscode-terminal-ansiBlue);
            }
            .assistant .message-header {
                color: var(--vscode-terminal-ansiGreen);
            }
            .system .message-header {
                color: var(--vscode-terminal-ansiYellow);
            }
            .message-content {
                white-space: pre-wrap;
                line-height: 1.5;
            }
            .message-content code {
                font-family: var(--vscode-editor-font-family);
                background-color: var(--vscode-textCodeBlock-background);
                padding: 2px 4px;
                border-radius: 3px;
            }
            .message-content pre {
                background-color: var(--vscode-textCodeBlock-background);
                padding: 10px;
                border-radius: 5px;
                overflow-x: auto;
            }
            .input-container {
                display: flex;
                padding: 10px;
                border-top: 1px solid var(--vscode-panel-border);
            }
            #message-input {
                flex: 1;
                padding: 8px;
                border: 1px solid var(--vscode-input-border);
                background-color: var(--vscode-input-background);
                color: var(--vscode-input-foreground);
                border-radius: 4px;
                resize: none;
                min-height: 60px;
            }
            #send-button {
                margin-left: 10px;
                padding: 0 15px;
                background-color: var(--vscode-button-background);
                color: var(--vscode-button-foreground);
                border: none;
                border-radius: 4px;
                cursor: pointer;
            }
            #send-button:hover {
                background-color: var(--vscode-button-hoverBackground);
            }
            .loading {
                display: none;
                margin: 10px 0;
                text-align: center;
                color: var(--vscode-descriptionForeground);
            }
            .loading.active {
                display: block;
            }
            .dot-flashing {
                display: inline-block;
                position: relative;
                width: 10px;
                height: 10px;
                border-radius: 5px;
                background-color: var(--vscode-descriptionForeground);
                animation: dot-flashing 1s infinite linear alternate;
                animation-delay: 0s;
            }
            .dot-flashing::before, .dot-flashing::after {
                content: '';
                display: inline-block;
                position: absolute;
                top: 0;
                width: 10px;
                height: 10px;
                border-radius: 5px;
                background-color: var(--vscode-descriptionForeground);
                animation: dot-flashing 1s infinite alternate;
            }
            .dot-flashing::before {
                left: -15px;
                animation-delay: 0.5s;
            }
            .dot-flashing::after {
                left: 15px;
                animation-delay: 1s;
            }
            @keyframes dot-flashing {
                0% { background-color: var(--vscode-descriptionForeground); }
                50%, 100% { background-color: rgba(152, 152, 152, 0.2); }
            }
        </style>
    </head>
    <body>
        <div class="chat-container" id="chat-container">
            <div class="message system">
                <div class="message-header">CodeSeek</div>
                <div class="message-content">Hello! I'm CodeSeek, your AI coding assistant. How can I help you today?</div>
            </div>
        </div>
        <div class="loading" id="loading">
            <div class="dot-flashing"></div>
        </div>
        <div class="input-container">
            <textarea id="message-input" placeholder="Type your message here..." rows="3"></textarea>
            <button id="send-button">Send</button>
        </div>

        <script>
            (function() {
                const vscode = acquireVsCodeApi();
                const chatContainer = document.getElementById('chat-container');
                const messageInput = document.getElementById('message-input');
                const sendButton = document.getElementById('send-button');
                const loading = document.getElementById('loading');

                // Function to send a message
                function sendMessage() {
                    const text = messageInput.value.trim();
                    if (text) {
                        vscode.postMessage({
                            command: 'sendMessage',
                            text: text
                        });
                        messageInput.value = '';
                    }
                }

                // Event listeners
                sendButton.addEventListener('click', sendMessage);
                messageInput.addEventListener('keydown', (e) => {
                    if (e.key === 'Enter' && !e.shiftKey) {
                        e.preventDefault();
                        sendMessage();
                    }
                });

                // Handle messages from the extension
                window.addEventListener('message', event => {
                    const message = event.data;
                    
                    switch (message.command) {
                        case 'addMessage':
                            addMessageToChat(message.role, message.content);
                            break;
                        case 'setLoading':
                            loading.className = message.value ? 'loading active' : 'loading';
                            break;
                    }
                });

                // Add a message to the chat
                function addMessageToChat(role, content) {
                    const messageDiv = document.createElement('div');
                    messageDiv.className = \`message \${role}\`;
                    
                    const headerDiv = document.createElement('div');
                    headerDiv.className = 'message-header';
                    headerDiv.textContent = role === 'user' ? 'You' : 
                                           role === 'assistant' ? 'CodeSeek' : 'System';
                    
                    const contentDiv = document.createElement('div');
                    contentDiv.className = 'message-content';
                    
                    // Process markdown-like content
                    let processedContent = content
                        .replace(/\\`\\`\\`([\\s\\S]*?)\\`\\`\\`/g, '<pre><code>$1</code></pre>')
                        .replace(/\\`([^\\`]+)\\`/g, '<code>$1</code>')
                        .replace(/\\n/g, '<br>');
                    
                    contentDiv.innerHTML = processedContent;
                    
                    messageDiv.appendChild(headerDiv);
                    messageDiv.appendChild(contentDiv);
                    
                    chatContainer.appendChild(messageDiv);
                    chatContainer.scrollTop = chatContainer.scrollHeight;
                }
            }());
        </script>
    </body>
    </html>`;
  }
}

module.exports = ChatView;
