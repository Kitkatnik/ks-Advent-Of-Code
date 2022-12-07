const fs = require('fs');

function main(text){
    for(let i = 0; i < text.length - 3; i++){
        const characters = text.slice(i, i+4)
        const markerCheck = new Set(characters);
        
        if(markerCheck.size === characters.length){
            console.log(i+4)
            break;
        }
    }

}

main(fs.readFileSync('./input.txt', {encoding: 'utf-8'}));