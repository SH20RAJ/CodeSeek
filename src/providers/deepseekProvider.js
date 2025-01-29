const vscode = require('vscode');
const { OpenAI } = require('openai');

class DeepSeekProvider {
    constructor(context) {
        this.context = context;
        this.openai = null;
        this.setupClient();
    }

    async setupClient() {
        const config = vscode.workspace.getConfiguration('codeseek');
        const apiKey = config.get('apiKey');
        
        if (!apiKey) {
            vscode.window.showErrorMessage('Please configure your DeepSeek API key');
            return;
        }

        this.openai = new OpenAI({
            baseURL: 'https://api.deepseek.com/v1',
            apiKey: apiKey
        });
    }

    async provideInlineCompletionItems(document, position, context, token) {
        if (!this.openai) {
            return [];
        }

        try {
            // Get the current line text up to the cursor
            const linePrefix = document.lineAt(position).text.substring(0, position.character);
            
            // Get a few lines before for context
            const startLine = Math.max(0, position.line - 5);
            const contextRange = new vscode.Range(startLine, 0, position.line, position.character);
            const codeContext = document.getText(contextRange);

            const completion = await this.openai.completions.create({
              model: "deepseek-chat",
              prompt: codeContext,
              max_tokens: vscode.workspace
                .getConfiguration("codeseek")
                .get("maxTokens"),
              temperature: vscode.workspace
                .getConfiguration("codeseek")
                .get("temperature"),
            });

            if (completion.choices && completion.choices.length > 0) {
                const suggestion = completion.choices[0].text;
                return [
                    {
                        text: suggestion,
                        range: new vscode.Range(position, position)
                    }
                ];
            }
        } catch (error) {
            this.handleError(error);
        }

        return [];
    }

    handleError(error) {
        if (error.response) {
            switch (error.response.status) {
                case 401:
                    vscode.window.showErrorMessage('Invalid DeepSeek API key');
                    break;
                case 429:
                    vscode.window.showErrorMessage('API rate limit exceeded');
                    break;
                case 500:
                    vscode.window.showErrorMessage('DeepSeek server error');
                    break;
                default:
                    vscode.window.showErrorMessage(`DeepSeek API error: ${error.message}`);
            }
        } else {
            vscode.window.showErrorMessage(`Network error: ${error.message}`);
        }
    }
}

module.exports = DeepSeekProvider; 