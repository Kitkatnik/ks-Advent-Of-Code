const fs = require('fs');

function main(text){
    const rucksacks = text.split(/\r?\n/);
    const allRucksacks = [];
    let total = 0;


    for(let i = 0; i < rucksacks.length; i++){
        const middle = Math.floor(rucksacks[i].length / 2);
        const rucksackOne = rucksacks[i].substr(0,middle).split("")
        const rucksackTwo = rucksacks[i].substr(middle).split("")

        allRucksacks.push([rucksackOne, rucksackTwo])
    }
    
    for( const rucksacks of allRucksacks ) {

        const errorLetter = rucksacks[0].filter( letter => rucksacks[1].indexOf(letter) > -1).slice(0,1)

        if(/[A-Z]/.test(errorLetter)){
            total += errorLetter[0].charCodeAt(0) - 38
        } else {
            total += errorLetter[0].charCodeAt(0) - 96
        }
    }
    console.log(total)
}

main(fs.readFileSync('./input.txt', {encoding: 'utf-8'}));