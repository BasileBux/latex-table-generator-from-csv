const fs = require('fs');
const readline = require('readline');

function read_csv(filename, csvSeparator) {
    const data = [];
    const fileStream = fs.createReadStream(filename);

    const rl = readline.createInterface({
        input: fileStream,
        crlfDelay: Infinity
    });

    return new Promise(resolve => {
        rl.on('line', line => {
            data.push(line.split(csvSeparator));
        });

        rl.on('close', () => {
            resolve(data);
        });
    });
}

function longestRow(data) {
    let max = 0;
    for (const row of data) {
        if (row.length > max) {
            max = row.length;
        }
    }
    return max;
}

function generateVertical(length, mode) {
    let finalHeader = '{';
    for (let i = 0; i < length; i++) {
        if (i === 0 && (mode === 1 || mode === 3 || mode === 4)) {
            finalHeader += "|";
        }
        finalHeader += "c";
        if ((i !== length - 1 && mode === 2) || (mode === 1 || mode === 3)) {
            finalHeader += "|";
        }
        if (i === length - 1 && mode === 4) {
            finalHeader += "|";
        }
    }
    return finalHeader + '}';
}

function generateTable(data, mode) {
    let finalTable = "\\begin{table}[H]\n\\begin{tabular} ";
    finalTable += generateVertical(longestRow(data), mode) + '\n';
    if (mode === 1 || mode === 4 || mode === 3) {
        finalTable += "\\hline\n";
    }
    const max_lengths = Array.from({ length: data[0].length }, (_, i) => Math.max(...data.map(row => row[i].length)));
    for (let index = 0; index < data.length; index++) {
        const row = data[index];
        for (let i = 0; i < row.length; i++) {
            finalTable += row[i].padEnd(max_lengths[i]) + " & ";
        }
        finalTable = finalTable.slice(0, -3) + " \\\\ ";
        if ((index !== data.length - 1 && mode === 2) || mode === 1 || mode === 4) {
            finalTable += "\\hline";
        }
        if (index === data.length - 1 && mode === 3) {
            finalTable += "\\hline";
        }
        finalTable += '\n';
    }
    finalTable += "\\end{tabular}\n\\end{table}";
    return finalTable;
}

function writeToFile(table, filename, folderPath) {
    fs.writeFileSync(`${folderPath}/[latex-table]-${filename.slice(0, -4)}.txt`, table);
}

module.exports = {
    read_csv,
    longestRow,
    generateTable,
    writeToFile
};
