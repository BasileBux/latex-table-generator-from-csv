const vscode = require('vscode');
const path = require('path');
const { read_csv, generateTable, writeToFile } = require('./command-palette.js');

async function selectMode() {
    const mode = await vscode.window.showQuickPick([
        { label: 'All Lines', value: 1 },
        { label: 'No External Lines', value: 2 },
        { label: 'No Internal Horizontal Lines', value: 3 },
        { label: 'No Internal Vertical Lines', value: 4 },
        { label: 'No Lines', value: 5 }
    ], { placeHolder: 'Select mode' });

    if (!mode) {
        vscode.window.showErrorMessage('No mode selected.');
        return null;
    }
    const selectedMode = mode.value;
    return selectedMode;
}

async function processSelectedFile(filePath, mode, tableOutput, csvSeparator) {
    const data = await read_csv(filePath, csvSeparator);
    const table = generateTable(data, mode);

    // Get the root path of the workspace
    const rootPath = vscode.workspace.workspaceFolders[0].uri.fsPath;
    let outputMessage = 'LaTeX Table generated successfully and ';

    switch (tableOutput) {
        case 'text file':
            outputMessage += 'written to file';
            writeToFile(table, path.basename(filePath), rootPath);
            break;
        case 'clipboard':
            outputMessage += 'copied to clipboard';
            vscode.env.clipboard.writeText(table);
            break;
        default:
            outputMessage = outputMessage.slice(0, -5);
            outputMessage += ', written to file and copied to clipboard';
            writeToFile(table, path.basename(filePath), rootPath);
            vscode.env.clipboard.writeText(table);
            break;
    }
    outputMessage += '. ';
    vscode.window.showInformationMessage(outputMessage);
}

function activate(context) {
    let commandPalette = vscode.commands.registerCommand('latex-table-generator-from-csv.generateLatexTable', async function () {
        let config = vscode.workspace.getConfiguration('latex-table-generator-from-csv');
        let tableOutput = config.get('tableOutput');
        let csvSeparator = config.get('csvSeparator');

        const fileUri = await vscode.window.showOpenDialog({
            canSelectFiles: true,
            canSelectFolders: false,
            canSelectMany: false,
            openLabel: 'Select CSV File'
        });

        if (!fileUri || fileUri.length === 0) {
            vscode.window.showErrorMessage('No file selected.');
            return;
        }
        const selectedFilePath = fileUri[0].fsPath;
        const selectedMode = await selectMode();
        await processSelectedFile(selectedFilePath, selectedMode, tableOutput, csvSeparator);
    });

    let currentFile = vscode.commands.registerCommand('latex-table-generator-from-csv.generateLatexTableFromCurrentFile', async function () {
        let config = vscode.workspace.getConfiguration('latex-table-generator-from-csv');
        let tableOutput = config.get('tableOutput');
        let csvSeparator = config.get('csvSeparator');
        const currentFilePath = vscode.window.activeTextEditor.document.uri.fsPath;
        if (!currentFilePath.endsWith('.csv')) {
            vscode.window.showErrorMessage('The current file is not a CSV file.');
            return;
        }
        const selectedMode = await selectMode();
        await processSelectedFile(currentFilePath, selectedMode, tableOutput, csvSeparator);
    });

    context.subscriptions.push(currentFile);
    context.subscriptions.push(commandPalette);
}

function deactivate() { }

module.exports = {
    activate,
    deactivate
};
