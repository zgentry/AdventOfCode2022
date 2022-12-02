const { match } = require('assert');
const fs = require('fs');

fs.readFile('Input.txt', 'utf-8', (err, data) => {
    if (err) throw err;

    matches = data.split('\r\n');
    console.log(matches);

    matchOutcomes = [];

    matches.forEach(matchInput => {
        let match = {score: 0, opponentPlay: 0, myPlay: 0};
        matchPlay = matchInput.split(' ');

        if (matchPlay[0] == 'A') match.opponentPlay = 1;
        else if (matchPlay[0] == 'B') match.opponentPlay = 2;
        else if (matchPlay[0] == 'C') match.opponentPlay = 3;

        if (matchPlay[1] == 'X') match.myPlay = 1;
        else if (matchPlay[1] == 'Y') match.myPlay = 2;
        else if (matchPlay[1] == 'Z') match.myPlay = 3;

        match.score += match.myPlay;

        if (match.opponentPlay - match.myPlay == 0) match.score += 3;
        else if(match.myPlay - match.opponentPlay == 1) match.score +=6;
        else if(match.opponentPlay - match.myPlay == 2) match.score +=6;
 
        matchOutcomes.push(match);
    });

    console.log(matchOutcomes);

    totalScore = 0;
    matchOutcomes.forEach(element => {
        totalScore += element.score;
    });

    console.log("Total score of " + totalScore);
});