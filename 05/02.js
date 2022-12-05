const fs = require('fs');

const moves = (stack, moves) => {

    const firstStack = stack[moves[1] - 1]
    const firstEndIdx = firstStack.length - moves[0];

    const secondStack = stack[moves[2] - 1]
    const secondEndIdx = secondStack.length;

    const cratesToMove = firstStack.splice(firstEndIdx, moves[0])
    secondStack.splice(secondEndIdx, 0, ...cratesToMove)

    return stack;
}

function main(text){

    // STACKS
    const stack = text.split(/\n\s*\n/)[0]
    const allStacks = []
    
    const stackSplit = stack.split(/\n/)
    
    for(let i = 0; i < stackSplit.length; i++){
        
        const line = stackSplit[i].match(/.{1,4}/g) ?? []
        const trimmedLine = line.reduce( (acc, curr) => {
            acc.push(curr.trim())
            return acc
        },[])
        allStacks.push(trimmedLine)
    }
    
    const verticalStacks = allStacks.reduce((acc, curr, idx) => {
        for(let i = 0; i < curr.length; i++){
            if(idx === 0){
                acc.push([curr[i]])
            } else {
                acc[i].unshift(curr[i])
            }
        }
        return acc;
    },[])
    
    const trimmedStacks = []
    
    for(const stack of verticalStacks){
        const newStack = stack.filter( crate => crate !== '')
        trimmedStacks.push(newStack)
    }

    // INSTRUCTIONS
    const allInstructions = text.split(/\n\s*\n/)[1].split(/\n/)
    
    const instructionNums = allInstructions.reduce( (acc, curr, idx) =>{
        acc.push(curr.match(/\d+/g))
        return acc
    },[])

    const movement = []

    for(let i = 0; i < instructionNums.length; i++){
        if(i === 0){
            movement.push(moves(trimmedStacks, instructionNums[i]))
        } else{
            movement.push(moves(movement[i-1], instructionNums[i]))
        }
    }
    const endMvmtIdx = movement.length - 1;
    const endCrates = movement[endMvmtIdx].reduce( (acc, curr, idx) => {
        const endIdx = curr.length - 1;
        acc.push(curr[endIdx])
        return acc
    },[]).join('').match(/\w/g).join('')

    console.log(endCrates)
}

main(fs.readFileSync('./input.txt', {encoding: 'utf-8'}));