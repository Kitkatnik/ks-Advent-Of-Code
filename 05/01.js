const fs = require('fs');

const moves = (stack, moves) => {

    for(let i = 0; i < moves[0]; i++){
        const firstStack = stack[moves[1] - 1]
        const firstEndIdx = firstStack.length - 1;

        const secondStack = stack[moves[2] - 1]
        const secondEndIdx = secondStack.length;


        
        const crateToMove = firstStack.splice(firstEndIdx, 1)

        secondStack.splice(secondEndIdx, 0, ...crateToMove)
    }
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
    /*
    [
        '        [Q] [B]         [H]        ',
        '    [F] [W] [D] [Q]     [S]        ',
        '    [D] [C] [N] [S] [G] [F]        ',
        '    [R] [D] [L] [C] [N] [Q]     [R]',
        '[V] [W] [L] [M] [P] [S] [M]     [M]',
        '[J] [B] [F] [P] [B] [B] [P] [F] [F]',
        '[B] [V] [G] [J] [N] [D] [B] [L] [V]',
        '[D] [P] [R] [W] [H] [R] [Z] [W] [S]',
        ' 1   2   3   4   5   6   7   8   9 '
    ]
    */
    // console.log(trimmedStacks)

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

/*
    MOVES
    [
        [ '1', '2', '1' ],
        [ '3', '1', '3' ],
        [ '2', '2', '1' ],
        [ '1', '1', '2' ]
    ]
    STACK
    [
        [ '1', '[Z]', '[N]' ],
        [ '2', '[M]', '[C]', '[D]' ],
        [ '3', '[P]' ]
    ]

    [ '1', '2', '1' ]
    MOVES 0 === 1
    MOVES 1 === 2
    MOVES 2 === 1

    DONE - "move 1" loop 1
    DO - "from 2" target verticalStacks[index 2-1]
    DO - "to 1" splice(start,delete, item1, item2, itemN) ==> returns items deleted
            const crate = splice(array.length-1, 1) == '[D]'
            array[indexTwo].push(crate)

    // */