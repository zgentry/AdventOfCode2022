const fs = require('fs');

fs.readFile('Input.txt', 'utf-8', (err, data) => {
    if (err) throw err;

    elfPairs = data.split('\r\n');

    elfPairs = elfPairs.map(elfPair => {
        [elf1, elf2] = elfPair.split(',');
        [elf1Start, elf1End] = elf1.split('-');
        [elf2Start, elf2End] = elf2.split('-');
        return {
            elf1Start: parseInt(elf1Start), 
            elf1End: parseInt(elf1End), 
            elf2Start: parseInt(elf2Start), 
            elf2End: parseInt(elf2End)
        };
    })

    badPairs = [];
    elfPairs.forEach(elfPair => {
        if (elfPair.elf1Start >= elfPair.elf2Start && elfPair.elf1End <= elfPair.elf2End) badPairs.push(elfPair);
        else if (elfPair.elf2Start >= elfPair.elf1Start && elfPair.elf2End <= elfPair.elf1End) badPairs.push(elfPair);
    });
    
    overlappingPairs = [];
    elfPairs.forEach(elfPair => {
        if (elfPair.elf1Start > elfPair.elf2Start && elfPair.elf1Start > elfPair.elf2End) {}//Gets all where elf1 is always higher than elf2
        else if(elfPair.elf2Start > elfPair.elf1Start && elfPair.elf2Start > elfPair.elf1End) {}//Gets all where elf2 is always higher than elf2
        else overlappingPairs.push(elfPair);
    })

    console.log(`Part 1: ${badPairs.length}`);
    console.log(`Part 2: ${overlappingPairs.length}`)
});