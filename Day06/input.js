const fs = require('fs');

fs.readFile('Input.txt', 'utf-8', (err, data) => {
    if (err) throw err;

    console.log(data);

    firstMatch = 0;
    for (i = 3; i < data.length; i++) {
        currentChars = data[i - 3] + data[i - 2] + data[i - 1] + data[i];
        if (currentChars.match(/(?:([a-z])(?!.*\1)){4}/)) {
            firstMatch = i + 1;
            break;
        }
    }

    console.log(firstMatch);
});