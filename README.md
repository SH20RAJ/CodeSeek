# CodeSeek 🚀

[![VS Code Marketplace Version](https://img.shields.io/visual-studio-marketplace/v/your-publisher-name.codeseek?style=flat-square)](https://marketplace.visualstudio.com/items?itemName=your-publisher-name.codeseek)
[![Downloads](https://img.shields.io/visual-studio-marketplace/d/your-publisher-name.codeseek?style=flat-square)](https://marketplace.visualstudio.com/items?itemName=your-publisher-name.codeseek)
[![Build Status](https://img.shields.io/github/actions/workflow/status/your-name/codeseek/ci.yml?style=flat-square)](https://github.com/your-name/codeseek/actions)

AI-powered coding assistant with DeepSeek integration for VS Code, featuring intelligent code completion, chat assistance, and documentation generation.

## Features ✨

- 🧠 Context-aware code completions
- 💬 In-IDE chat interface
- 🔍 Smart variable/method name suggestions
- 📚 README.md generation
- ⚡ Real-time AI assistance
- 🔒 Secure API key management

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
Just start typing - CodeSeek will automatically suggest completions.

### Chat Interface
1. Open Command Palette (`Ctrl+Shift+P` or `Cmd+Shift+P`)
2. Select **CodeSeek: Open Chat**
3. Type your question/request

### Name Suggestions
1. Select code
2. Right-click and choose **CodeSeek: Suggest Names**
3. Choose from AI-generated options

### Generate README
1. Open a project folder
2. Run command **CodeSeek: Generate README**
3. Review and save generated documentation

## Troubleshooting 🔧

Common issues:
- **No suggestions appearing?**
  - Verify API key is valid
  - Check internet connection
  - Ensure file type is supported

- **Slow responses?**
  - Reduce maximum token count in settings
  - Check DeepSeek API status

## Contributing 🤝

We welcome contributions! Please see our [Contributing Guide](CONTRIBUTING.md).

## License 📄

MIT License - See [LICENSE](LICENSE) for details.

---

**Disclaimer**: This extension requires a valid DeepSeek API key. Usage may be subject to DeepSeek's terms of service.
