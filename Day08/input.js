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



    //PART 2
    scenicScore = []
    for (row = 0; row < treeMap.length; row++){
        scenicScore.push([])
        for (col = 0; col < treeMap[row].length; col++) {
            treeScenicScore = {northView: 0, southView: 0, westView: 0, eastView: 0};
            searchCol = col;
            while (searchCol > 0) { //Look West
                searchCol--;
                treeScenicScore.westView++;
                if (treeMap[row][col] <= treeMap[row][searchCol]) break;
            }
            searchCol = col;
            while (searchCol < treeMap[row].length - 1) { //Look East
                searchCol++;
                treeScenicScore.eastView++;
                if (treeMap[row][col] <= treeMap[row][searchCol]) break;
            }
            searchRow = row;
            while (searchRow > 0) { //Look North
                searchRow--;
                treeScenicScore.northView++;
                if (treeMap[row][col] <= treeMap[searchRow][col]) break;
            }
            searchRow = row;
            while (searchRow < treeMap.length - 1) { //Look South
                searchRow++;
                treeScenicScore.southView++;
                if (treeMap[row][col] <= treeMap[searchRow][col]) break;
            }
            totalTreeScenicScore = treeScenicScore.northView * treeScenicScore.southView * treeScenicScore.eastView * treeScenicScore.westView;
            scenicScore[row].push(totalTreeScenicScore);
        }
    }
    console.log(scenicScore);
    topScenicScore = 0;
    for (row of scenicScore) {
        for (value of row) {
            if (value > topScenicScore) topScenicScore = value;
        }
    }
    console.log(`The highest scenic score is ${topScenicScore}`)
})

compareArrays = (arrOne, arrTwo) => {
    return arrOne.length === arrTwo.length && arrOne.every((value, index) => value === arrTwo[index])
}