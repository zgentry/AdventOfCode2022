const fs = require('fs');

fs.readFile('Input Data.txt', 'utf-8', (err, data) => {
    if (err) throw err;

    
    inventory = data.split('\r\n');

    elvesTotalCal = [0];

    i = 0;
    inventory.forEach(element => {
        if (element == '') {
            i++;
            elvesTotalCal[i] = 0;
        }
        else {
            elvesTotalCal[i] += parseInt(element);
            console.log(parseInt(element));
        }
    });

    console.log(elvesTotalCal);
    
    largestElf = 0;
    secondElf = 1;
    thirdElf = 2;
    for(i = 3; i < elvesTotalCal.length; i++) {
        if (elvesTotalCal[largestElf] < elvesTotalCal[i]) {
            thirdElf = secondElf;
            secondElf = largestElf;
            largestElf = i;
        }
        else if (elvesTotalCal[secondElf] < elvesTotalCal[i]) {
            thirdElf = secondElf;
            secondElf = i;
        }
        else if (elvesTotalCal[thirdElf] < elvesTotalCal[i]) {
            thirdElf = i;
        }
    }

    console.log("Elf with largest Cal count is " + largestElf + " at " + elvesTotalCal[largestElf]);

    combinedCalCount = elvesTotalCal[largestElf] + elvesTotalCal[secondElf] + elvesTotalCal[thirdElf];
    console.log("The 3 Elves with the largest Cal count have a combined " + combinedCalCount + " calories");
})