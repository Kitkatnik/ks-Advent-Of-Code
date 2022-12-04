const fs = require('fs');

const allNumbers = (low, high) => {
    const result = []
    
    const lowNum = parseInt(low)
    const highNum = parseInt(high)

    for(let i = lowNum; i <= highNum; i++){
        result.push(parseInt(i));
    }

    return result;
}

const duplicateCheck = (one, two) => {
    const checkerOne = []
    const checkerTwo = []
    for(const numOne of one){
        if(two.includes(numOne)) {
            checkerOne.push("true")
        };
    }
    for(const numTwo of two){
        if(one.includes(numTwo)) {
            checkerTwo.push("true")
        };
    }

    return (checkerOne.length === one.length || checkerTwo.length === two.length)
}

function main(text){
    let count = 0;
    const pairs = text.split(/\n/)
    
    const sections = pairs.reduce( (acc, curr) => {
        acc.push(curr.split(","))
        
        return acc;
        
    },[])
    
    
    for( const section of sections ){
        const sectionOne = [];
        const sectionTwo = [];
        for(let i = 0; i < section.length; i++){
            if(i === 0){
                sectionOne.push(...section[i].match(/\d+/g));
            } else {
                sectionTwo.push(...section[i].match(/\d+/g));
            }
        }
        
        const fullOne = allNumbers(sectionOne[0], sectionOne[1])
        const fullTwo = allNumbers(sectionTwo[0], sectionTwo[1])

        if(duplicateCheck(fullOne, fullTwo)) count++
    }
    console.log("count: ", count)
}

main(fs.readFileSync('./input.txt', {encoding: 'utf-8'}));