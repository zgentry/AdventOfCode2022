workingDir = '/test/'
splitWorkingDir = workingDir.split('/'); //Get the indivual folders of the workingDir

splitWorkingDir = splitWorkingDir.slice(1, splitWorkingDir.length - 1);
console.log(splitWorkingDir);
for (const nextDirectory of splitWorkingDir) {
    console.log(nextDirectory)
}