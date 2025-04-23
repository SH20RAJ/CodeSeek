# CodeSeek 🚀

[![VS Code Marketplace Version](https://img.shields.io/visual-studio-marketplace/v/sh20raj.codeseek-shade?style=flat-square)](https://marketplace.visualstudio.com/items?itemName=sh20raj.codeseek-shade)
[![Downloads](https://img.shields.io/visual-studio-marketplace/d/sh20raj.codeseek-shade?style=flat-square)](https://marketplace.visualstudio.com/items?itemName=sh20raj.codeseek-shade)
[![Visitors](https://api.visitorbadge.io/api/combined?path=https%3A%2F%2Fgithub.com%2FSH20RAJ%2FCodeSeek&countColor=%23263759&style=flat)](https://visitorbadge.io/status?path=https%3A%2F%2Fgithub.com%2FSH20RAJ%2FCodeSeek)
[![GitHub stars](https://img.shields.io/github/stars/SH20RAJ/CodeSeek?style=flat-square)](https://github.com/SH20RAJ/CodeSeek/stargazers)
[![GitHub forks](https://img.shields.io/github/forks/SH20RAJ/CodeSeek?style=flat-square)](https://github.com/SH20RAJ/CodeSeek/network)
[![GitHub issues](https://img.shields.io/github/issues/SH20RAJ/CodeSeek?style=flat-square)](https://github.com/SH20RAJ/CodeSeek/issues)
[![GitHub license](https://img.shields.io/github/license/SH20RAJ/CodeSeek?style=flat-square)](https://github.com/SH20RAJ/CodeSeek/blob/main/LICENSE)

**CodeSeek** is a powerful AI-powered coding assistant for VS Code that leverages DeepSeek's advanced AI models to supercharge your coding workflow. Whether you need intelligent code completions, interactive chat assistance, or automatic documentation generation, CodeSeek helps you write better code faster and with less effort.

![CodeSeek](https://i.imgur.com/qRAHNoR.png)

## Why Choose CodeSeek? ✨

- 🧠 **Intelligent Code Completions**: Context-aware suggestions that understand your code structure and style
- 💬 **AI Chat Assistant**: Get coding help, explanations, and examples through an interactive chat interface
- 🏷️ **Smart Name Suggestions**: Generate meaningful variable, function, and class names for selected code
- 📚 **README Generation**: Automatically create comprehensive documentation for your projects
- ⚡ **Real-time AI Assistance**: Get help when you need it without leaving your editor
- 🔒 **Secure API Key Management**: Your DeepSeek API key is stored securely in VS Code settings
- 🚀 **Lightweight & Fast**: Minimal impact on your editor's performance
- 🌐 **Works Offline**: Core features work without internet connection once configured

## Quick Start 🚀

1. Install CodeSeek from the [VS Code Marketplace](https://marketplace.visualstudio.com/items?itemName=sh20raj.codeseek-shade)
2. Get your [DeepSeek API Key](https://platform.deepseek.com/api-keys)
3. Add your API key in VS Code settings
4. Start coding and enjoy AI-powered assistance!

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

## Keyboard Shortcuts ⌨️

For maximum productivity, you can assign keyboard shortcuts to CodeSeek commands:

1. Open VS Code Keyboard Shortcuts (`Ctrl+K Ctrl+S` or `Cmd+K Cmd+S`)
2. Search for "CodeSeek"
3. Click the + icon next to each command to add your preferred shortcut

Recommended shortcuts:

- `Alt+C`: Open CodeSeek Chat
- `Alt+N`: Suggest Names for selected code
- `Alt+R`: Generate README

## Advanced Configuration ⚙️

CodeSeek offers additional configuration options to customize your experience. Add these to your VS Code settings.json file:

```json
{
  "codeseek.apiKey": "your-api-key-here",
  "codeseek.maxTokens": 100,  // Adjust for longer/shorter completions (range: 50-500)
  "codeseek.temperature": 0.7  // Controls creativity (range: 0.1-1.0)
}
```

> 💡 **Pro Tip**: Lower temperature values (0.1-0.3) work best for code completion, while higher values (0.7-0.9) are better for creative tasks like documentation generation.

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

We welcome contributions from developers of all skill levels! Whether you're fixing bugs, adding features, or improving documentation, your help is appreciated.

See our [Contributing Guide](CONTRIBUTING.md) for details on:

- Setting up the development environment
- Coding standards
- Pull request process
- Feature requests

## Roadmap 📍

We're constantly improving CodeSeek! Here's what's coming next:

- 🔄 **Code Refactoring**: Automatically refactor code for better readability and performance
- ⚙️ **Test Generation**: Create unit tests for your functions with a single click
- 💬 **Code Explanation**: Get detailed explanations of complex code snippets
- 🔥 **Multi-Model Support**: Choose between different AI models for different tasks
- 🌐 **Multilingual Support**: Get assistance in multiple programming languages

Have a feature request? [Open an issue](https://github.com/SH20RAJ/CodeSeek/issues/new) on GitHub!

## License 📄

MIT License - See [LICENSE](LICENSE) for details.

View on GitHub: [https://github.com/SH20RAJ/CodeSeek](https://github.com/SH20RAJ/CodeSeek)

---

⭐ **Love CodeSeek?** [Rate us on the VS Code Marketplace](https://marketplace.visualstudio.com/items?itemName=sh20raj.codeseek-shade&ssr=false#review-details) and check us out on [Product Hunt](https://www.producthunt.com/posts/codeseek-deepseek-ai-coding-assistant)!

---

**Disclaimer**: This extension requires a valid DeepSeek API key. Usage may be subject to DeepSeek's terms of service. CodeSeek is not affiliated with DeepSeek, Inc.
