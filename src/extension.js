const vscode = require('vscode');
const DeepSeekProvider = require('./providers/deepseekProvider');

function activate(context) {
    console.log('CodeSeek extension is now active');

    const provider = new DeepSeekProvider(context);
    
    // Register the completion provider for all languages
    const disposable = vscode.languages.registerInlineCompletionItemProvider(
        { pattern: '**' },
        {
            provideInlineCompletionItems: (document, position, context, token) => 
                provider.provideInlineCompletionItems(document, position, context, token)
        }
    );

    context.subscriptions.push(disposable);
}

function deactivate() {}

module.exports = {
    activate,
    deactivate
}; 