const vscode = require('vscode');
const ApiUtils = require('../utils/apiUtils');

/**
 * Command handler for suggesting names for selected code
 * @param {vscode.ExtensionContext} context The extension context
 */
function registerNameCommand(context) {
  const disposable = vscode.commands.registerCommand('codeseek.suggestNames', async () => {
    const editor = vscode.window.activeTextEditor;
    if (!editor) {
      vscode.window.showErrorMessage('No active editor found');
      return;
    }

    const selection = editor.selection;
    if (selection.isEmpty) {
      vscode.window.showErrorMessage('Please select some code first');
      return;
    }

    const selectedText = editor.document.getText(selection);
    const client = ApiUtils.createClient();
    
    if (!client) return;

    try {
      vscode.window.withProgress({
        location: vscode.ProgressLocation.Notification,
        title: 'Generating name suggestions...',
        cancellable: false
      }, async () => {
        const completion = await client.chat.completions.create({
          model: 'deepseek-chat',
          messages: [
            {
              role: 'system',
              content: `You are a naming expert for code. Given a code snippet, suggest 5 clear, concise, and descriptive names for it.
              Follow these rules:
              - If it's a function/method, suggest function/method names (camelCase or snake_case based on context)
              - If it's a class, suggest class names (PascalCase)
              - If it's a variable, suggest variable names (camelCase or snake_case based on context)
              - If it's a constant, suggest constant names (UPPER_SNAKE_CASE)
              - Names should be descriptive but concise
              - Consider the language/framework conventions
              - Return ONLY a numbered list with no additional text`
            },
            {
              role: 'user',
              content: `Suggest names for this code:\n\n${selectedText}`
            }
          ],
          temperature: 0.7,
          max_tokens: 200
        });

        const suggestions = completion.choices[0].message.content
          .split('\n')
          .filter(line => line.trim().length > 0);

        if (suggestions.length === 0) {
          vscode.window.showErrorMessage('Failed to generate name suggestions');
          return;
        }

        const selected = await vscode.window.showQuickPick(suggestions, {
          placeHolder: 'Select a name suggestion'
        });

        if (selected) {
          // Extract just the name from the suggestion (remove numbers and other text)
          const nameMatch = selected.match(/\d+\.\s*([a-zA-Z0-9_]+)/);
          const name = nameMatch ? nameMatch[1] : selected.trim();
          
          // Replace the selection with the name
          editor.edit(editBuilder => {
            editBuilder.replace(selection, name);
          });
        }
      });
    } catch (error) {
      ApiUtils.handleError(error);
    }
  });

  context.subscriptions.push(disposable);
}

module.exports = {
  registerNameCommand
};
