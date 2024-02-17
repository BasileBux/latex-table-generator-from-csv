# LaTeX table generator

This extension is a simple tool to generate LaTeX tables from CSV files. And output them to text files and/or your clipboard. 

It is recommended to pair this extension with the [Edit CSV extension](https://marketplace.visualstudio.com/items?itemName=janisdd.vscode-edit-csv) to be able to work directly with CSV files in VSCode. 

## Features

Execute the function `Generate latex table from csv` from command palette

![Generate latex table from csv in command palette](https://github.com/BasileBux/latex-table-generator-from-csv/blob/224d933f1e62006d5d17cc73517c44afcad2d2f7/assets/latex-table-fromFile-demo.gif)
or simply click on the `LaTeX table` button in the editor groups when in a CSV file 

![Generate latex table from csv in editor group](https://github.com/BasileBux/latex-table-generator-from-csv/blob/b03009a69741a5b599dcf43d0c74895c36c5dd83/assets/latex-table-fromCurrentFile-demo.gif) 

to generate a LaTeX table from a CSV file.

## Extension Settings

This extension contributes the following settings:

* `latex-table-generator-from-csv.tableOutput`: Specifies the way to output the generated LaTeX table. You can choose to output to the clipboard, to a text file, or to both. The default is "clipboard".

  Options:
  * `"clipboard"`: Outputs the LaTeX table to the clipboard.
  * `"text file"`: Outputs the LaTeX table to a text file located in the root folder of your project.
  * `"clipboard and text file"`: Outputs the LaTeX table to both the clipboard and a text file.

* `latex-table-generator-from-csv.csvSeparator`: Specifies the character to use as the CSV separator. The default is ",".

You can change these settings by going to the settings in Visual Studio Code (File > Preferences > Settings or `Ctrl+,`) and searching for "Latex Table Generator".

## Release Notes

### 0.0.1

Initial release. 

## :warning: Disclaimer

This extension is a small non-commercial project. It is not affiliated with the LaTeX project or any other project. Tools such as github copilot and chatGPT were highly used in the developpement process.

The extension was motivated and is highly inspired from the [LaTeX Table Generator](https://www.tablesgenerator.com/latex_tables) website and the [Edit CSV extension](https://marketplace.visualstudio.com/items?itemName=janisdd.vscode-edit-csv). 