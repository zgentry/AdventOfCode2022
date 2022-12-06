const fs = require('fs');

fs.readFile('Input.txt', 'utf-8', (err, data) => {
    if (err) throw err;

    console.log(data);

    //PART 1
    firstMatch = 0;
    for (i = 3; i < data.length; i++) {
        currentChars = data[i - 3] + data[i - 2] + data[i - 1] + data[i];
        if (currentChars.match(/(?:([a-z])(?!.*\1)){4}/)) {
            firstMatch = i + 1;
            break;
        }
    }

    //PART 2
    part2firstMatch = 0;
    for (i = 13; i < data.length; i++) {
        currentChars = '';
        for (j = 14; j > 0; j--) {
            currentChars += data[i - j + 1];
        }
        if (currentChars.match(/(?:([a-z])(?!.*\1)){14}/)) {
            part2firstMatch = i + 1;
            break;
        }
    }

    console.log(firstMatch);
    console.log(part2firstMatch);
});