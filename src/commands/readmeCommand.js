const vscode = require('vscode');
const fs = require('fs');
const path = require('path');
const ApiUtils = require('../utils/apiUtils');

/**
 * Command handler for generating README.md
 * @param {vscode.ExtensionContext} context The extension context
 */
function registerReadmeCommand(context) {
  const disposable = vscode.commands.registerCommand('codeseek.generateReadme', async () => {
    // Check if we have a workspace folder
    if (!vscode.workspace.workspaceFolders || vscode.workspace.workspaceFolders.length === 0) {
      vscode.window.showErrorMessage('Please open a project folder first');
      return;
    }

    const workspaceRoot = vscode.workspace.workspaceFolders[0].uri.fsPath;
    const client = ApiUtils.createClient();
    
    if (!client) return;

    try {
      // Gather project information
      const projectInfo = await gatherProjectInfo(workspaceRoot);
      
      vscode.window.withProgress({
        location: vscode.ProgressLocation.Notification,
        title: 'Generating README.md...',
        cancellable: false
      }, async () => {
        // Generate README content
        const readmeContent = await generateReadmeContent(client, projectInfo);
        
        // Check if README already exists
        const readmePath = path.join(workspaceRoot, 'README.md');
        let shouldWrite = true;
        
        if (fs.existsSync(readmePath)) {
          const choice = await vscode.window.showWarningMessage(
            'README.md already exists. Do you want to overwrite it?',
            'Overwrite',
            'Preview Only'
          );
          
          shouldWrite = choice === 'Overwrite';
        }
        
        if (shouldWrite) {
          fs.writeFileSync(readmePath, readmeContent);
          vscode.window.showInformationMessage('README.md has been generated successfully');
        }
        
        // Show preview
        const doc = await vscode.workspace.openTextDocument({
          content: readmeContent,
          language: 'markdown'
        });
        
        await vscode.window.showTextDocument(doc);
      });
    } catch (error) {
      ApiUtils.handleError(error);
    }
  });

  context.subscriptions.push(disposable);
}

/**
 * Gather information about the project
 * @param {string} workspaceRoot The workspace root path
 * @returns {Object} Project information
 */
async function gatherProjectInfo(workspaceRoot) {
  const info = {
    name: path.basename(workspaceRoot),
    files: [],
    packageJson: null,
    languages: new Set(),
    hasTests: false
  };
  
  // Check for package.json
  const packageJsonPath = path.join(workspaceRoot, 'package.json');
  if (fs.existsSync(packageJsonPath)) {
    try {
      info.packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));
    } catch (error) {
      console.error('Error parsing package.json:', error);
    }
  }
  
  // Get list of files (limit to 100 to avoid performance issues)
  const files = await vscode.workspace.findFiles('**/*', '**/node_modules/**', 100);
  
  for (const file of files) {
    const relativePath = path.relative(workspaceRoot, file.fsPath);
    info.files.push(relativePath);
    
    // Determine language from file extension
    const ext = path.extname(file.fsPath).toLowerCase();
    switch (ext) {
      case '.js':
        info.languages.add('JavaScript');
        break;
      case '.ts':
        info.languages.add('TypeScript');
        break;
      case '.py':
        info.languages.add('Python');
        break;
      case '.java':
        info.languages.add('Java');
        break;
      case '.html':
        info.languages.add('HTML');
        break;
      case '.css':
        info.languages.add('CSS');
        break;
      case '.php':
        info.languages.add('PHP');
        break;
      case '.go':
        info.languages.add('Go');
        break;
      case '.rb':
        info.languages.add('Ruby');
        break;
      case '.rs':
        info.languages.add('Rust');
        break;
    }
    
    // Check if project has tests
    if (relativePath.includes('test') || relativePath.includes('spec')) {
      info.hasTests = true;
    }
  }
  
  return info;
}

/**
 * Generate README content based on project information
 * @param {OpenAI} client The OpenAI client
 * @param {Object} projectInfo Project information
 * @returns {string} Generated README content
 */
async function generateReadmeContent(client, projectInfo) {
  const completion = await client.chat.completions.create({
    model: 'deepseek-chat',
    messages: [
      {
        role: 'system',
        content: `You are a documentation expert. Generate a comprehensive README.md for a project based on the provided information.
        Include the following sections:
        - Project title and description
        - Features
        - Installation instructions
        - Usage examples
        - API documentation (if applicable)
        - Contributing guidelines
        - License information
        
        Use proper Markdown formatting with headers, lists, code blocks, etc.
        Be concise but thorough.
        If information is missing, make reasonable assumptions based on the project name and files.`
      },
      {
        role: 'user',
        content: `Generate a README.md for my project with the following information:
        
        Project name: ${projectInfo.name}
        
        Package.json (if available): ${projectInfo.packageJson ? JSON.stringify(projectInfo.packageJson, null, 2) : 'Not available'}
        
        Languages used: ${Array.from(projectInfo.languages).join(', ')}
        
        Has tests: ${projectInfo.hasTests ? 'Yes' : 'No'}
        
        Files (sample): ${projectInfo.files.slice(0, 20).join('\n')}`
      }
    ],
    temperature: 0.7,
    max_tokens: 1500
  });

  return completion.choices[0].message.content;
}

module.exports = {
  registerReadmeCommand
};
