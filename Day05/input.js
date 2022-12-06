const fs = require('fs');

fs.readFile('Input.txt', 'utf-8', (err, data) => {
    if (err) throw err;

    //Get the inputs and moves as different variables
    [inputValues, moves] = data.split('\r\n\r\n');

    //Split the lines of the input variables
    inputValues = inputValues.split('\r\n');
    moves = moves.split('\r\n');

    //Get the individual columns of each line
    for (i = 0; i < inputValues.length; i++) {
        inputValues[i] = inputValues[i] + ' ';
        inputValues[i] = inputValues[i].match(/((\[[A-Z]\]|(...))(\s))/gm);
    };

    //Create a 'silo' for each column
    silos = [];
    inputValues.forEach(element => {
        silos.push([]);
    });

    //Get the values from the columns and put the letter value in the silo
    for (i = 0; i < inputValues.length; i++) {
        for (j = 0; j < inputValues[i].length; j++) {
            value = inputValues[i][j].match(/\[(.)\] /m);
            if(value) silos[j].unshift(value[1]);
        }
    }

    moves.forEach(move => {
        //Convert the input string to useful information
        [fullString, numToMove, fromSilo, toSilo] = move.match(/(\d*) \w* (\d*) \w* (\d*)/m);
        console.log(`Moving ${numToMove} objects from silo ${fromSilo} to silo ${toSilo}`);

        //Move the values from one silo to another based on the input data
        for (i = 0; i < numToMove; i++) {
            silos[toSilo - 1].push(silos[fromSilo - 1].pop());
        }
    });

    finalTopLevel = '';
    silos.forEach(silo => {
        finalTopLevel += silo.pop();
    })
    console.log(`Final top pieces ${finalTopLevel}`)
});