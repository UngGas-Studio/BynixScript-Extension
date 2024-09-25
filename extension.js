const vscode = require('vscode');

/**
 * @param {vscode.ExtensionContext} context
 */
function active(context) {
    let disposable = vscode.languages.registerDocumentRangeFormattingEditProvider('bs', {
        provideDocumentFormattingEdits(document) {
            let edits =[];
            const indentSize = 4;

            for (let i = 0; i < document.lineCount; i++) {
                let line = document.lineAt(i);
                let trimmedLine = line.text.trim();

                if (trimmedLine.length > 0) {
                    let range = new vscode.Range(i, 0, i, line.firstNonWhitespaceCharacterIndex);
                    let indent =''.repeat(indentSize);
                    edits.push(vscode.TextEdit.replace(range, indentSize));

                }
            }
            return edits;
        }
    });

    context.subscriptions.push(disposable);
}

function deactive() {}

module.exports = {
    active,
    deactive
};