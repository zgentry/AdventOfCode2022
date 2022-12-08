const fs = require('fs');

fs.readFile('Input.txt', 'utf-8', (err, data) => {
    if (err) throw err;

    console.log(data);
    treeMap = data.split('\r\n').map(row => row.split(''))

    for (const row in treeMap) {
        for (const col in treeMap[row]) {
            treeMap[row][col] = parseInt(treeMap[row][col])
        }
    }

    console.log(treeMap);

    visableTreesIndex = []
    for (row = 0; row < treeMap.length; row++) { //Get all from left
        curRowValue = -1;
        for (col = 0; col < treeMap[row].length; col++) {
            if (treeMap[row][col] > curRowValue){
                
                if(row == 0) console.log(`checking row ${row} and col ${col}`);
                visableTree = [row, col];
                if (visableTreesIndex.length == 0) visableTreesIndex.push(visableTree);
                found = false;
                for (visableTreeIndex of visableTreesIndex){
                    if (compareArrays(visableTreeIndex, visableTree)) {
                        if(row == 0) console.log(`checking row ${row} and col ${col} with a value of ${visableTreeIndex} and ${visableTree}`);
                        found = true;
                        break;
                    }
                }
                if (!found) {
                    visableTreesIndex.push(visableTree);
                }
                curRowValue = treeMap[row][col];
            }
        }
    }
    console.log(`Visable Tree Index after Left search`)
    console.log(visableTreesIndex);
    for (row = 0; row < treeMap.length; row++) { //Get all from right
        curRowValue = -1;
        for (col = 0; col < treeMap[row].length; col++) {
            if (treeMap[row][treeMap[row].length - col - 1] > curRowValue){
                visableTree = [row, treeMap[row].length - col - 1];
                if (visableTreesIndex.length == 0) visableTreesIndex.push(visableTree);
                found = false;
                for (visableTreeIndex of visableTreesIndex){
                    if (compareArrays(visableTreeIndex, visableTree)) {
                        found = true;
                        break;
                    }
                }
                if (!found) {
                    visableTreesIndex.push(visableTree);
                }
                curRowValue = treeMap[row][treeMap[row].length - col - 1];
            }
        }
    }
    console.log(`Visable Tree Index after Right search`)
    console.log(visableTreesIndex);
    for (col = 0; col < treeMap[0].length; col++) {
        curColValue = -1;
        for (row = 0; row < treeMap.length; row++) {
            if (treeMap[row][col] > curColValue) {
                visableTree = [row, col];
                if (visableTreesIndex.length == 0) visableTreesIndex.push(visableTree);
                found = false;
                for (visableTreeIndex of visableTreesIndex){
                    if (compareArrays(visableTreeIndex, visableTree)) {
                        found = true;
                        break;
                    }
                }
                if (!found) {
                    visableTreesIndex.push(visableTree);
                }
                curColValue = treeMap[row][col];
            }
        }
    }
    console.log(`Visable Tree Index after Top search`)
    console.log(visableTreesIndex);
    for (col = 0; col < treeMap[0].length; col++) {
        curColValue = -1;
        for (row = 0; row < treeMap.length; row++) {
            if (treeMap[treeMap.length - row - 1][col] > curColValue) {
                visableTree = [treeMap.length - row - 1, col];
                if (visableTreesIndex.length == 0) visableTreesIndex.push(visableTree);
                found = false;
                for (visableTreeIndex of visableTreesIndex){
                    if (compareArrays(visableTreeIndex, visableTree)) {
                        found = true;
                        break;
                    }
                }
                if (!found) {
                    visableTreesIndex.push(visableTree);
                }
                curColValue = treeMap[treeMap.length - row - 1][col];
            }
        }
    }
    console.log(`Visable Tree Index after Bottom search`)
    visableTreesIndex.sort((a, b) => { return a[0] - b[0]})
    console.log(visableTreesIndex);

    console.log(`Total trees visable from the outside ${visableTreesIndex.length}`)
})

compareArrays = (arrOne, arrTwo) => {
    return arrOne.length === arrTwo.length && arrOne.every((value, index) => value === arrTwo[index])
}