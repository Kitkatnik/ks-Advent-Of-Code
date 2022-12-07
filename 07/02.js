const fs = require('fs');

const findChildren = (currNode, input, index) => {

    while(index < input.length){

        const currLine = input[index];

        if( currLine === "$ ls"){ // $ ls
            index++;

        } else if( /^[dir]+/.test(currLine) ){ // dir a
            
            const newNode = {
                name: currLine.split(" ")[1],
                type: 'dir',
                size: 0,
                files: []
            }
            currNode.files.push(newNode);
            index++;

        } else if( /^\d/.test(currLine) ){ // 3948213749823 b.txt
            
            const split = currLine.split(" ")
            const newNode = {
                name: split[1],
                type: 'file',
                size: parseInt(split[0]),
                files: []
            }
            currNode.files.push(newNode);
            index++;

        } else if( /(?:\W\scd\s\w+)/.test(currLine) ){ // $ cd aflhsf
            const dirName = currLine.split(" ")[2];
            const cdNode = currNode.files.find( node => node.name === dirName && node.type === 'dir' )
            index = findChildren(cdNode, input, index+1); 

        } else if( currLine === "$ cd .." ){ // $ cd ..
            return index+1;
        }
    }
}

const parseInput = (input) => {
    const rootNode = {
        name: '/',
        type: 'dir',
        size: 0,
        files: []
    }

    findChildren(rootNode, input, 1);
    return rootNode;
}

const assignDirSize = (currNode) => {
    let dirSize = 0;

    for(let i = 0; i < currNode.files.length; i++){

        let currFile = currNode.files[i];
        if(currFile.type === "file"){
            dirSize += currFile.size;
        } else {
            dirSize += assignDirSize(currFile);
        }
    }
    currNode.size = dirSize;
    return currNode.size;
}

const buildArray = (currNode, spaceNeeded, listOfDir) => {

    for(let i = 0; i < currNode.files.length; i++){

        let currFile = currNode.files[i];

        if(currFile.type === "dir"){
            buildArray(currFile, spaceNeeded, listOfDir)
            listOfDir.push(currFile.size);
        } 
    }
    return;
}

function main(text){
    const split = text.split(/\r?\n/); 
    const rootNode = parseInput(split);
    assignDirSize(rootNode);

    const totalSize = rootNode.size
    const unusedSpace = 70000000 - totalSize;
    
    const spaceNeeded = 30000000 - unusedSpace;
    const listOfDir = [rootNode.size]

    buildArray(rootNode, spaceNeeded, listOfDir)

    const finalNum = listOfDir.sort((a,b) => a-b).filter( num => num > spaceNeeded)[0]
    
    console.log(finalNum);
}

main(fs.readFileSync('./input.txt', {encoding: 'utf-8'}));