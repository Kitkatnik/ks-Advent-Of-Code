const fs = require('fs');

function main(text){
    const groupsOfThree = text.match(/(?:.+\n?){3}/gm)

    let grouped = []
    for (const eachGroup of groupsOfThree){
        grouped.push(eachGroup.trim().split(/\r?\n/));
    }

    let total = 0;

    for(const group of grouped){
        const elfOne = group[0].split("")
        const elfTwo = group[1].split("")
        const elfThree = group[2].split("")

        const errorLetter = elfOne.filter( letter => (elfTwo.indexOf(letter) > -1 && elfThree.indexOf(letter) > -1)).slice(0,1)
        
        if(/[A-Z]/.test(errorLetter)){
            total += errorLetter[0].charCodeAt(0) - 38
        } else {
            total += errorLetter[0].charCodeAt(0) - 96
        }
    }
    console.log(total)
}

main(fs.readFileSync('./input.txt', {encoding: 'utf-8'}));