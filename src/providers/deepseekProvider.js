const vscode = require("vscode");
const { OpenAI } = require("openai");

class DeepSeekProvider {
  constructor(context) {
    this.context = context;
    this.openai = null;
    this.setupClient();
  }

  async setupClient() {
    const config = vscode.workspace.getConfiguration("codeseek");
    const apiKey = config.get("apiKey");

    if (!apiKey) {
      vscode.window.showErrorMessage("Configure DeepSeek API key in settings");
      return;
    }

    this.openai = new OpenAI({
      baseURL: "https://api.deepseek.com/v1", // Removed /v1
      apiKey: apiKey,
    });
  }

  async provideInlineCompletionItems(document, position) {
    if (!this.openai) return [];

    try {
      const linePrefix = document
        .lineAt(position)
        .text.substring(0, position.character);
      const contextRange = new vscode.Range(
        Math.max(0, position.line - 2),
        0,
        position.line,
        position.character
      );
      const codeContext = document.getText(contextRange);

      const completion = await this.openai.chat.completions.create({
        model: "deepseek-chat",
        messages: [
          {
            role: "system",
            content:
              "Respond ONLY with code completion for the provided context. No explanations. No markdown. No natural language.",
          },
          {
            role: "user",
            content: `Complete this code. Current cursor position shown by |. Only respond with the code to insert.\n\n${codeContext}|`,
          },
        ],
        max_tokens: 30,
        temperature: 0.2,
        top_p: 0.3,
        stop: ["\n", "//", "/*", "<|endoftext|>"],
      });

      if (!completion?.choices?.[0]?.message?.content) return [];

      let suggestion = completion.choices[0].message.content
        .replace(/```.*/gs, "") // Remove code blocks
        .split("\n")[0] // Take first line only
        .trim();

      // Filter non-code responses
      if (suggestion.match(/^(please|sorry|can i|would you)/i)) {
        return [];
      }

      return [
        new vscode.InlineCompletionItem(
          suggestion,
          new vscode.Range(position, position)
        ),
      ];
    } catch (error) {
      console.error("Completion Error:", error);
      return [];
    }
  }

  handleError(error) {
    let message = error.message;
    if (error.statusCode) {
      message = `API Error [${error.statusCode}]: ${message}`;
    }
    vscode.window.showErrorMessage(message);
  }
}

module.exports = DeepSeekProvider;
