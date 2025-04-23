const vscode = require('vscode');
const DeepSeekProvider = require('./providers/deepseekProvider');
const { registerChatCommand } = require('./commands/chatCommand');
const { registerNameCommand } = require('./commands/nameCommand');
const { registerReadmeCommand } = require('./commands/readmeCommand');

function activate(context) {
    console.log('CodeSeek extension is now active');

    // Initialize the code completion provider
    const provider = new DeepSeekProvider(context);

    // Register the completion provider for all languages
    const completionDisposable = vscode.languages.registerInlineCompletionItemProvider(
        { pattern: '**' },
        {
            provideInlineCompletionItems: (document, position, context, token) =>
                provider.provideInlineCompletionItems(document, position, context, token)
        }
    );

    context.subscriptions.push(completionDisposable);

    // Register commands
    registerChatCommand(context);
    registerNameCommand(context);
    registerReadmeCommand(context);
}

function deactivate() {}

module.exports = {
    activate,
    deactivate
};