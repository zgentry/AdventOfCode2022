const fs = require('fs');

fs.readFile('Input.txt', 'utf-8', (err, data) => {
    if (err) throw err;

    myRegex = /.*(.).*[,].*\1.*[,].*\1.*/

    rucksacks = data.split('\r\n');
    groups = []
    prioritySum = 0;

    for(i = 0; i < rucksacks.length/3; i++){
        groups.push({elf1: rucksacks[i*3], elf2: rucksacks[i*3 + 1], elf3: rucksacks[i*3 + 2]});
    }

    groups.forEach(group => {
        groupItems = group.elf1 + ',' + group.elf2 + ',' + group.elf3;
        badge = groupItems.match(myRegex)[1];

        if (badge.match(/[a-z]/)) {
            for(test = 'a'; test <= badge; test = String.fromCharCode(test.charCodeAt(0) + 1)) {
                prioritySum +=1;
            }
        }
        else if (badge.match(/[A-Z]/)) {
            prioritySum += 26;
            for(test = 'A'; test <= badge; test = String.fromCharCode(test.charCodeAt(0) + 1)) {
                prioritySum +=1;
            }
        }
    });

    console.log(groups);
    console.log(prioritySum);
})