const vscode = require('vscode');
const ChatView = require('../webview/chatView');
const ApiUtils = require('../utils/apiUtils');

/**
 * Command handler for opening the chat interface
 * @param {vscode.ExtensionContext} context The extension context
 */
function registerChatCommand(context) {
  const chatView = new ChatView(context);
  
  const disposable = vscode.commands.registerCommand('codeseek.openChat', () => {
    const client = ApiUtils.createClient();
    if (client) {
      chatView.setApiClient(client);
      chatView.show();
    }
  });
  
  context.subscriptions.push(disposable);
}

module.exports = {
  registerChatCommand
};
