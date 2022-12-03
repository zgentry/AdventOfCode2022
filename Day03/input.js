const fs = require('fs');

fs.readFile('Input.txt', 'utf-8', (err, data) => {
    if (err) throw err;

    rucksacks = data.split('\r\n');
    output = []
    prioritySum = 0; 
    myRegex = /.*(.).*[,].*\1.*/m
    
    for(i = 0; i < rucksacks.length; i++) {
        rucksacks[i] = rucksacks[i].slice(0, rucksacks[i].length/2) + ',' + rucksacks[i].slice(rucksacks[i].length/2);
        output[i] = rucksacks[i].match(myRegex)[1];
        if (output[i].match(/[a-z]/)) {
            for(test = 'a'; test <= output[i]; test = String.fromCharCode(test.charCodeAt(0) + 1)) {
                prioritySum +=1;
            }
        }
        else if (output[i].match(/[A-Z]/)) {
            prioritySum += 26;
            for(test = 'A'; test <= output[i]; test = String.fromCharCode(test.charCodeAt(0) + 1)) {
                prioritySum +=1;
            }
        }
    };



    console.log(rucksacks);
    console.log(output);
    console.log(prioritySum);
})