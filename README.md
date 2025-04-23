# CodeSeek 🚀

[![VS Code Marketplace Version](https://img.shields.io/visual-studio-marketplace/v/sh20raj.codeseek-shade?style=flat-square)](https://marketplace.visualstudio.com/items?itemName=sh20raj.codeseek-shade)
[![Downloads](https://img.shields.io/visual-studio-marketplace/d/sh20raj.codeseek-shade?style=flat-square)](https://marketplace.visualstudio.com/items?itemName=sh20raj.codeseek-shade)
[![Visitors](https://api.visitorbadge.io/api/combined?path=https%3A%2F%2Fgithub.com%2FSH20RAJ%2FCodeSeek&countColor=%23263759&style=flat)](https://visitorbadge.io/status?path=https%3A%2F%2Fgithub.com%2FSH20RAJ%2FCodeSeek)
[![GitHub stars](https://img.shields.io/github/stars/SH20RAJ/CodeSeek?style=flat-square)](https://github.com/SH20RAJ/CodeSeek/stargazers)
[![GitHub forks](https://img.shields.io/github/forks/SH20RAJ/CodeSeek?style=flat-square)](https://github.com/SH20RAJ/CodeSeek/network)
[![GitHub issues](https://img.shields.io/github/issues/SH20RAJ/CodeSeek?style=flat-square)](https://github.com/SH20RAJ/CodeSeek/issues)
[![GitHub license](https://img.shields.io/github/license/SH20RAJ/CodeSeek?style=flat-square)](https://github.com/SH20RAJ/CodeSeek/blob/main/LICENSE)

CodeSeek is a powerful AI-powered coding assistant for VS Code that leverages DeepSeek's advanced AI models to enhance your coding experience. With intelligent code completion, interactive chat assistance, and automatic documentation generation, CodeSeek helps you write better code faster.

![CodeSeek](https://i.imgur.com/qRAHNoR.png)

## Features ✨

- 🧠 **Intelligent Code Completions**: Context-aware suggestions that understand your code structure and style
- 💬 **AI Chat Assistant**: Get coding help, explanations, and examples through an interactive chat interface
- 🏷️ **Smart Name Suggestions**: Generate meaningful variable, function, and class names for selected code
- 📚 **README Generation**: Automatically create comprehensive documentation for your projects
- ⚡ **Real-time AI Assistance**: Get help when you need it without leaving your editor
- 🔒 **Secure API Key Management**: Your DeepSeek API key is stored securely in VS Code settings

## Installation 📦

1. Open **VS Code**
2. Go to Extensions (`Ctrl+Shift+X` or `Cmd+Shift+X`)
3. Search for "CodeSeek"
4. Click **Install**
5. Reload VS Code

## Configuration ⚙️

1. Get your [DeepSeek API Key](https://platform.deepseek.com/api-keys)
2. Open VS Code Settings (`Ctrl+,` or `Cmd+,`)
3. Search for "CodeSeek"
4. Enter your API key:

```json
"codeseek.apiKey": "your-api-key-here"
```

## Usage 🛠️

### Code Completion

CodeSeek provides intelligent code completions as you type:

1. Start typing code in any file
2. CodeSeek will automatically suggest relevant completions based on context
3. Press Tab or Enter to accept a suggestion

### Chat Interface

Get help from the AI assistant through the chat panel:

1. Open Command Palette (`Ctrl+Shift+P` or `Cmd+Shift+P`)
2. Select **CodeSeek: Open Chat**
3. Type your coding questions or requests
4. The AI will respond with explanations, examples, and solutions

### Name Suggestions

Generate meaningful names for your code:

1. Select a block of code (function, variable declaration, etc.)
2. Right-click and choose **CodeSeek: Suggest Names** from the context menu
3. Choose from the AI-generated naming options
4. The selected name will replace your code selection

### Generate README

Automatically create documentation for your project:

1. Open a project folder in VS Code
2. Open Command Palette and select **CodeSeek: Generate README**
3. CodeSeek will analyze your project and generate a comprehensive README.md
4. Review and save the generated documentation

![CodeSeek Features](https://i.imgur.com/qRAHNoR.png)

## Advanced Configuration ⚙️

CodeSeek offers additional configuration options to customize your experience:

```json
{
  "codeseek.apiKey": "your-api-key-here",
  "codeseek.maxTokens": 100,  // Adjust for longer/shorter completions
  "codeseek.temperature": 0.7  // Lower for more deterministic responses, higher for more creative
}
```

## Troubleshooting 🔧

Common issues and solutions:

- **No suggestions appearing?**
  - Verify your DeepSeek API key is valid and correctly entered in settings
  - Check your internet connection
  - Ensure the file type is supported
  - Restart VS Code after changing settings

- **Slow responses?**
  - Reduce the maximum token count in settings
  - Check the DeepSeek API status
  - Consider using a more stable internet connection

- **Chat not working?**
  - Ensure your API key has sufficient credits
  - Try reloading the window (`Developer: Reload Window` in command palette)
  - Check the Output panel for any error messages

## Contributing 🤝

We welcome contributions! Please see our [Contributing Guide](CONTRIBUTING.md).

## License 📄

MIT License - See [LICENSE](LICENSE) for details.

View on GitHub: [https://github.com/SH20RAJ/CodeSeek](https://github.com/SH20RAJ/CodeSeek)

---

Check us out on [Product Hunt](https://www.producthunt.com/posts/codeseek-deepseek-ai-coding-assistant)!

---

**Disclaimer**: This extension requires a valid DeepSeek API key. Usage may be subject to DeepSeek's terms of service.
