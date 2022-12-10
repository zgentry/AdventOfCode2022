const fs = require('fs');

fs.readFile('Input.txt', 'utf-8', (err, data) => {
    if (err) throw err;

    instructions = data.split('\r\n');
    xReg = [1]
    for (instruction of instructions) {
        [instruction, value] = instruction.split(' ');
        value = parseInt(value);
        console.log(`Instruction ${instruction} and value ${value}`);
        xReg.push(xReg[xReg.length - 1]);
        if (instruction == "addx") {
            xReg.push(xReg[xReg.length - 1] + value)
        }
    }
    console.log(xReg)
    signalStrengthSum = 0;
    for (i = 19; i < xReg.length; i = i + 40){
        signalStrengthSum += xReg[i] * (i + 1);
        console.log(`past 2: ${xReg[i - 2]} ${xReg[i - 1]} current: ${xReg[i]} next two ${xReg[i + 1]} ${xReg[i + 2]}`);
    }
    console.log(`The sum of the signal strength is ${signalStrengthSum}`)
});