const fs = require('fs');

smallDirs = []
const depthFirst = (dirName, arr) => {
    dirSize = 0
    arr.forEach(element => {
        if (element.directory) dirSize += depthFirst(dirName + element.dirName + '/', element.dir);
        else dirSize += element.fileSize;
    });
    if (dirSize <= 100000) smallDirs.push({dirName: dirName, dirSize: dirSize})
    return dirSize;
}

//PART2
allDirsSize = []
const depthFirstPart2 = (dirName, arr) => {
    dirSize = 0
    arr.forEach(element => {
        if (element.directory) dirSize += depthFirstPart2(dirName + element.dirName + '/', element.dir);
        else dirSize += element.fileSize;
    });
    allDirsSize.push({dirName: dirName, dirSize: dirSize})
    return dirSize;
}
//PART2

fs.readFile('Input.txt', 'utf-8', (err, data) => {
    if (err) throw err;

    inputLines = data.split('\r\n');
    console.log(inputLines);

    drive = []
    workingDir = '/';

    for (lineIndex in inputLines) {
        line = inputLines[lineIndex];
        //Command
        if (line.match(/^\$ (.*)$/)) {
            curCommand = line.split(' ');
            if (curCommand[1] == 'ls') continue;
            if (curCommand[1] == 'cd') {
                if (curCommand[2] == '..') {
                    newWorkingDir = workingDir.split('/');
                    newWorkingDir = newWorkingDir.filter(element => {return element != ''})
                    workingDir = '/';
                    for (i = 0; i < newWorkingDir.length - 1; i++) {
                        workingDir += newWorkingDir[i] + '/';
                    }
                }
                else if (curCommand[2] == '/') {
                    workingDir = '/';
                }
                else {
                    workingDir += curCommand[2] + '/';
                }
            }
            console.log(workingDir);
        }
        else {
            insertObject = {}
            //Create new file, get file information
            if (line.match(/^(\d*) ([^\s]*)$/)) {
                fileInfo = line.match(/^(\d*) ([^\s]*)$/)
                insertObject = {
                    directory: false,
                    fileName: fileInfo[2],
                    fileSize: parseInt(fileInfo[1])
                }
            }

            //Create new directory, get directory information
            else if (line.match(/^dir ([^\s]*)$/)) {
                dirInfo = line.match(/^dir ([^\s]*)$/)
                insertObject = {
                    directory: true,
                    dirName: dirInfo[1],
                    dir: []
                }
            }

            //Insert the new file/directory in the array
            curDir = drive //Gets a reference to the full drive
            splitWorkingDir = workingDir.split('/'); //Get the indivual folders of the workingDir
            splitWorkingDir = splitWorkingDir.slice(1, splitWorkingDir.length - 1); //Remove the blank '' from the start and end of the working dir
            for (const nextDirectory of splitWorkingDir) {
                curDir.every(object => {
                    if (object.directory) {
                        if (object.dirName == nextDirectory) {
                            curDir = object.dir;
                            return false;
                        }
                    }
                    return true;
                });
            }
            curDir.push(insertObject);
        }
    }
    
    console.log(drive);

    depthFirst('/', drive);
    console.log(smallDirs)
    combinedSmallDirSize = 0
    smallDirs.forEach(smallDir => {
        combinedSmallDirSize += smallDir.dirSize;
    })
    
    //PART2
    depthFirstPart2('/', drive);
    allDirsSize.sort((a, b) =>  a.dirSize - b.dirSize);
    console.log(allDirsSize)
    neededSize = allDirsSize[allDirsSize.length - 1].dirSize - (70000000 - 30000000)
    bestDirToRemove = {}
    allDirsSize.every(dir => {
        if(dir.dirSize > neededSize) {
            bestDirToRemove = dir;
            return false;
        }
        return true;
    })
    //PART2

    console.log(`The total small dir size is ${combinedSmallDirSize}`)
    console.log(`The best dir to remove is ${bestDirToRemove.dirName} with a size of ${bestDirToRemove.dirSize}`)
});

