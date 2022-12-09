const fs = require('fs');

fs.readFile('Input.txt', 'utf-8', (err, data) => {
    if (err) throw err;

    moves = data.split('\r\n');
    console.log(moves)

    ropeKnots = [[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0]]

    map = [['X']];

    for (move of moves) {
        move = move.split(' ');
        move[1] = parseInt(move[1]);
        switch (move[0]) {
            //If the Head is moving upwards
            case 'U': 
                //Check if there is enough rows up to move,
                if (ropeKnots[0][0] < move[1]) {
                    //If not, add new rows with the number of columns of the current top row
                    for (i = 0; i < move[1]; i++) {
                        newRow = []
                        map[0].forEach(() => {
                            newRow.push('');
                        });
                        map.unshift(newRow);
                        ropeKnots.forEach(knot => {
                            knot[0]++;
                        })
                    }
                }
                //Now there are enough rows, preform the movements
                for (i = 0; i < move[1]; i++) {
                    ropeKnots[0][0]--;
                    for (j = 1; j < ropeKnots.length; j++) {
                        moveKnot(ropeKnots[j-1], ropeKnots[j]);
                    }
                    map[ropeKnots[ropeKnots.length - 1][0]][ropeKnots[ropeKnots.length - 1][1]] = 'X';
                }
                break;
            case 'D':
                if (map.length - ropeKnots[0][0] - 1 < move[1]) {
                    for (i = 0; i < move[1]; i++) {
                        newRow = []
                        map[0].forEach(() => {
                            newRow.push('');
                        });
                        map.push(newRow);
                    }
                }
                for (i = 0; i < move[1]; i++) {
                    ropeKnots[0][0]++;
                    for (j = 1; j < ropeKnots.length; j++) {
                        moveKnot(ropeKnots[j-1], ropeKnots[j]);
                    }
                    map[ropeKnots[ropeKnots.length - 1][0]][ropeKnots[ropeKnots.length - 1][1]] = 'X';
                }
                break;
            case 'L':
                if (ropeKnots[0][1] < move[1]) {
                    for (i = 0; i < move[1]; i++) {
                        map.forEach(line => {
                            line.unshift('');
                        })
                        ropeKnots.forEach(knot => {
                            knot[1]++;
                        })
                    }
                }
                for (i = 0; i < move[1]; i++) {
                    ropeKnots[0][1]--;
                    for (j = 1; j < ropeKnots.length; j++) {
                        moveKnot(ropeKnots[j-1], ropeKnots[j]);
                    }
                    map[ropeKnots[ropeKnots.length - 1][0]][ropeKnots[ropeKnots.length - 1][1]] = 'X';
                }
                break;
            case 'R':
                if (map[0].length - ropeKnots[0][1] - 1 < move[1]) {
                    for (i = 0; i < move[1]; i++) {
                        map.forEach(line => {
                            line.push('');
                        })
                    }
                }
                for (i = 0; i < move[1]; i++) {
                    ropeKnots[0][1]++;
                    for (j = 1; j < ropeKnots.length; j++) {
                        moveKnot(ropeKnots[j-1], ropeKnots[j]);
                    }
                    map[ropeKnots[ropeKnots.length - 1][0]][ropeKnots[ropeKnots.length - 1][1]] = 'X';
                }
                break;
        }
    }

    console.log(map);
    tailVisitedCount = 0;
    prettyMap = '';
    map.forEach(line => {
        line.forEach(entry => {
            if (entry == 'X') {
                tailVisitedCount++;
                prettyMap += 'X'
            }
            else {
                prettyMap += '.'
            }
        })
        prettyMap += '\n'
    })
    console.log(`Pretty Map`)
    console.log(prettyMap);
    console.log(`The tail visited ${tailVisitedCount} squares`)
})

moveTailUp = (head, tail) => {
    tail[0] = head[0] + 1;
    tail[1] = head[1];
}
moveTailDown = (head, tail) => {
    tail[0] = head[0] - 1;
    tail[1] = head[1];
}
moveTailLeft = (head, tail) => {
    tail[1] = head[1] + 1;
    tail[0] = head[0];
}
moveTailRight = (head, tail) => {
    tail[1] = head[1] - 1;
    tail[0] = head[0];
}
moveTailUpRight = (head, tail) => {
    tail[0] = head[0] + 1;
    tail[1] = head[1] - 1;
}
moveTailUpLeft = (head, tail) => {
    tail[0] = head[0] + 1;
    tail[1] = head[1] + 1;
}
moveTailDownRight = (head, tail) => {
    tail[0] = head[0] - 1;
    tail[1] = head[1] - 1;
}
moveTailDownLeft = (head, tail) => {
    tail[0] = head[0] - 1;
    tail[1] = head[1] + 1;
}


moveKnot = (head, tail) => {
    if (tail[0] - head[0] > 1 && head[1] - tail[1] > 1) moveTailUpRight(head, tail);
    else if (tail[0] - head[0] > 1 && tail[1] - head[1] > 1) moveTailUpLeft(head, tail);
    else if (head[0] - tail[0] > 1 && tail[1] - head[1] > 1) moveTailDownLeft(head, tail);
    else if (head[0] - tail[0] > 1 && head[1] - tail[1] > 1) moveTailDownRight(head, tail);
    else if (tail[0] - head[0] > 1) moveTailUp(head, tail);
    else if (head[0] - tail[0] > 1) moveTailDown(head, tail);
    else if (tail[1] - head[1] > 1) moveTailLeft(head, tail);
    else if (head[1] - tail[1] > 1) moveTailRight(head, tail);
}