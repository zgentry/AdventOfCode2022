const fs = require('fs');

fs.readFile('Input.txt', 'utf-8', (err, data) => {
    if (err) throw err;

    moves = data.split('\r\n');
    console.log(moves)

    headPos = [0, 0];
    tailPos = [0, 0];

    map = [['X']];

    for (move of moves) {
        move = move.split(' ');
        move[1] = parseInt(move[1]);
        switch (move[0]) {
            //If the Head is moving upwards
            case 'U': 
                //Check if there is enough rows up to move,
                if (headPos[0] < move[1]) {
                    //If not, add new rows with the number of columns of the current top row
                    for (i = 0; i < move[1]; i++) {
                        newRow = []
                        map[0].forEach(() => {
                            newRow.push('');
                        });
                        map.unshift(newRow);
                        headPos[0]++;
                        tailPos[0]++;
                    }
                }
                //Now there are enough rows, preform the movements
                for (i = 0; i < move[1]; i++) {
                    headPos[0]--;
                    if (tailPos[0] - headPos[0] > 1) {
                        tailPos[0] = headPos[0] + 1;
                        tailPos[1] = headPos[1];
                    }
                    map[tailPos[0]][tailPos[1]] = 'X';
                }
                break;
            case 'D':
                if (map.length - headPos[0] - 1 < move[1]) {
                    for (i = 0; i < move[1]; i++) {
                        newRow = []
                        map[0].forEach(() => {
                            newRow.push('');
                        });
                        map.push(newRow);
                    }
                }
                for (i = 0; i < move[1]; i++) {
                    headPos[0]++;
                    if (headPos[0] - tailPos[0] > 1) {
                        tailPos[0] = headPos[0] - 1;
                        tailPos[1] = headPos[1];
                    }
                    map[tailPos[0]][tailPos[1]] = 'X';
                }
                break;
            case 'L':
                if (headPos[1] < move[1]) {
                    for (i = 0; i < move[1]; i++) {
                        map.forEach(line => {
                            line.unshift('');
                        })
                        headPos[1]++;
                        tailPos[1]++;
                    }
                }
                for (i = 0; i < move[1]; i++) {
                    headPos[1]--;
                    if (tailPos[1] - headPos[1] > 1) {
                        tailPos[1] = headPos[1] + 1;
                        tailPos[0] = headPos[0];
                    }
                    map[tailPos[0]][tailPos[1]] = 'X';
                }
                break;
            case 'R':
                if (map[0].length - headPos[1] - 1 < move[1]) {
                    for (i = 0; i < move[1]; i++) {
                        map.forEach(line => {
                            line.push('');
                        })
                    }
                }
                for (i = 0; i < move[1]; i++) {
                    headPos[1]++;
                    if (headPos[1] - tailPos[1] > 1) {
                        tailPos[1] = headPos[1] - 1;
                        tailPos[0] = headPos[0];
                    }
                    map[tailPos[0]][tailPos[1]] = 'X';
                }
                break;
        }
    }

    console.log(map);
    tailVisitedCount = 0;
    map.forEach(line => {
        line.forEach(entry => {
            if (entry == 'X') tailVisitedCount++;
        })
    })
    console.log(`The tail visited ${tailVisitedCount} squares`)
})