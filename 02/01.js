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

        if(elf === 0 && me === 2){
            score += 0;
        } else if(elf === 2 && me === 0){
            score += 6;
        } else if(elf === me){
            score += 3;
        } else if(elf < me){
            score += 6;
        } else if(elf > me){
            score += 0;
        }
        
        switch(play[1]){
            case 'X':
                score += 1;
                break;
            case 'Y':
                score += 2;
                break;
            case 'Z':
                score += 3;
                break;
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

// console.log(playerOne.indexOf(elf));
// console.log(playerTwo.indexOf(me));
// console.log("==========")

// LOST = 0, DRAW = 3, WON = 6

// C SCISSORS and Z SCISSORS === 3+3 = 6
// 6
// ROCK and ROCK = 3+1 = 4
// 4
// PAPER and SCISSOR = 6 + 3
// A ROCK and Z SCISSORS = 0 + 3

// win
// loss
// draw
// loss
// win