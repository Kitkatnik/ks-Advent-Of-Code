// INPUT: number of calories each Elf is carrying

const fs = require('fs');

function main(text){
    const input = text.split(/\r?\n/);

    const output = input
        .reduce( (acc, curr, index) => {
            if(index === 0 && curr !== ""){ 
                const numCurr = parseInt(curr)
                return [...acc, numCurr];
            }

            if(curr !== ""){ 
                const numCurr = parseInt(curr)
                let countIndex = acc.length - 1;

                if(countIndex === 0){
                    return [acc[countIndex] += numCurr];
                } else {
                    acc[countIndex] += numCurr;
                    return [...acc];
                }
            } else {
                return [...acc, 0];
            }
        },[])
    const topThreeTotal = output.sort( (a,b) => b - a).slice(0,3).reduce( (acc, curr) => acc + curr);

    console.log(topThreeTotal);
}

main(fs.readFileSync('./input.txt', {encoding: 'utf-8'}));

// OUTPUT: an array of integers representing the number of calories each Elf is carrying --> sort by largest value --> print out the first array element --> how many total calories is that elf carrying?