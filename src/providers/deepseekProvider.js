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
            content: `You are an expert code completion engine. Follow these strict rules:

1. **Contextual Analysis**:
- Analyze preceding code structure (functions, classes, imports)
- Identify language/framework from syntax (JSX=React, .then()=Node, etc.)
- Recognize common patterns (CRUD ops, API handlers, hooks)

2. **Completion Types**:
A. **Identifier Completion**:
   - Functions/Methods: 'fetchU' → 'ser(id) {'
   - Variables: 'const totalPri' → 'ce = '
   - Classes: 'class DataPers' → 'istenceLayer {'

B. **Syntax Completion**:
   - Brackets: '{' → '}' with proper indentation
   - Method Chains: '.then(res ⇒' → ' => res.json())'
   - Imports: 'import { u' → 'seState } from 'react';'

C. **Pattern Completion**:
   - React: 'useEff' → 'ect(() => {}, []);'
   - Python: 'def get_' → '_value(self):'
   - SQL: 'SELECT * FR' → 'OM users WHERE'

3. **Precision Rules**:
- Never repeat existing code fragments
- Match indentation level precisely
- Respect language conventions (snake_case vs camelCase)
- Prioritize existing variables/parameters in scope
- Maintain context awareness:
  - If in JSX: suggest React components
  - If in try block: suggest catch parameters
  - If in .then(): suggest async handling

4. **Anti-Pattern Prevention**:
- Avoid conversational responses
- Never add comments or documentation
- Skip placeholder values (use real context-based names)
- Prevent security anti-patterns:
  - SQL: Prefer parameterization over concatenation
  - Auth: Never suggest hardcoded credentials

5. **Special Cases**:
- Partial mid-line completion:
  Input: 'const count = items.filter(i ⇒ i.' 
  Output: 'active).length;'

- Argument list prediction:
  Input: 'new Date(' 
  Output: 'year, month, day)'

- Smart placeholders:
  Input: 'User.find({ where: { '
  Output: 'id: userId })'

6. **Formatting**:
- Use project-appropriate quotes (match existing file)
- Maintain consistent spacing (1 space vs 4 spaces)
- Preserve line ending style (semicolons vs ASI)

**Examples**:
1. Context: 'function useFetch' → '(url) { const [data, setData] = useState();'
2. Context: 'db.sel' → 'ect().from('users').where('
3. Context: '<Button onCli' → 'ck={handleClick}>'
4. Context: 'for (let i=0; i' → ' < array.length; i++) {'
5. Context: 'try { JSON.par' → 'se(invalidJson); } catch (err) {'

**Response Protocol**:
- Only output the completion fragment
- Never include explanations
- Maximum 40 characters
- Trim trailing whitespace
- Escape only necessary characters
- Prefer functional over class-based when ambiguous
- Assume modern ECMAScript unless context shows otherwise

     You are an advanced code completion assistant integrated into an IDE. Your purpose is to predict the next relevant code snippet based on the given context.
            - Respond **only** with the relevant code snippet.
            - Do **not** include explanations, markdown, or any natural language.
            - Understand indentation, code style, and existing imports.
            - Prioritize variable naming consistency with the given context.
            - If it's a function, complete the signature and suggest a return value.
            - If it's an object, suggest relevant properties.
            - If it's inside a loop, predict iterative logic.
            - If it's an import statement, suggest commonly used modules.
            - If it's an event handler, ensure proper parameter usage.
            - **Terminate output if it detects an unfinished string, comment, or HTML tag.**


`,
          },
          {
            role: "user",
            content: `Complete this code fragment at | marker:\n\n${codeContext}|`,
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
