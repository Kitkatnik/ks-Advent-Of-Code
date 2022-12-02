const fs = require('fs');

function main(text){
    const playerOne = ['A', 'B', 'C']
    const playerTwo = ['X', 'Y', 'Z']
    const rounds = text.split(/\r?\n/);
    
    const roundScores = rounds.map( (round) => {
        const play = round.split(" ");
        let score = 0;
        const elf = playerOne.indexOf(play[0]);
        const me = playerTwo.indexOf(play[1]);

        // result scores
        switch(play[1]){
            case 'X':
                score += 0;
                break;
            case 'Y':
                score += 3;
                break;
            case 'Z':
                score += 6;
                break;
        }

        // type scores
        if( score === 0){
            switch(play[0]){
                case 'A': // ROCK beats SCISSORS (3)
                    score += 3;
                    break;
                case 'B': // PAPER beats ROCK (1)
                    score += 1;
                    break;
                case 'C': // SCISSORS beats PAPER (2)
                    score += 2;
                    break;
            }
        } else if( score === 3){
            switch(play[0]){
                case 'A': // ROCK draws ROCK (1)
                    score += 1;
                    break;
                case 'B': // PAPER draws PAPER (2)
                    score += 2;
                    break;
                case 'C': // SCISSORS draws SCISSOR (3)
                    score += 3;
                    break;
            }
        } else if( score === 6){
            switch(play[0]){
                case 'A': // ROCK loses to PAPER (2)
                    score += 2;
                    break;
                case 'B': // PAPER loses to SCISSORS (3)
                    score += 3;
                    break;
                case 'C': // SCISSORS loses to ROCK (1)
                    score += 1;
                    break;
            }
        }
        return score;
    })
    .reduce( (acc, curr) => acc + curr)
    
    console.log(roundScores)
}

main(fs.readFileSync('./input.txt', {encoding: 'utf-8'}));

// A = ROCK         B = PAPER           C = SCISSORS
// X = ROCK = 1     Y = PAPER = 2       Z = SCISSORS = 3

// ROCK > SCISSORS > PAPER > ROCK

// LOST = 0, DRAW = 3, WON = 6

// X = LOSS, Y = DRAW, Z = WIN

// A = ROCK, Y = ROCK === 4 / draw
// B = PAPER, X = ROCK  === 1 / loss
// C = SCISSORS, Z = ROCK === 7 / win

// 