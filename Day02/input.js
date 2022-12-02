const { match } = require('assert');
const fs = require('fs');

fs.readFile('Input.txt', 'utf-8', (err, data) => {
    if (err) throw err;

    matches = data.split('\r\n');
    console.log(matches);

    matchOutcomes = [];

    matches.forEach(matchInput => {
        let match = {score: 0, opponentPlay: 0, myPlay: 0, outcome: ''};
        matchPlay = matchInput.split(' ');

        if (matchPlay[0] == 'A') match.opponentPlay = 1;
        else if (matchPlay[0] == 'B') match.opponentPlay = 2;
        else if (matchPlay[0] == 'C') match.opponentPlay = 3;

        if (matchPlay[1] == 'X') match.outcome = 'LOSE';
        else if (matchPlay[1] == 'Y') match.outcome = 'TIE';
        else if (matchPlay[1] == 'Z') match.outcome = 'WIN';

        if (match.outcome == 'TIE') {
            match.score += 3;
            match.myPlay = match.opponentPlay;
        } 
        else if(match.outcome == 'LOSE') {
            if (match.opponentPlay > 1) match.myPlay = match.opponentPlay - 1;
            else match.myPlay = 3;
        } 
        else if(match.outcome == 'WIN') {
            match.score +=6;
            if (match.opponentPlay < 3) match.myPlay = match.opponentPlay + 1;
            else match.myPlay = 1;
        } 
 
        match.score += match.myPlay;

        matchOutcomes.push(match);
    });

    console.log(matchOutcomes);

    totalScore = 0;
    matchOutcomes.forEach(element => {
        totalScore += element.score;
    });

    console.log("Total score of " + totalScore);
});