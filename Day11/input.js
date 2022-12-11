const fs = require('fs');

fs.readFile('Input.txt', 'utf-8', (err, data) => {
    if (err) throw err;

    monkeyStarting = data.split('\r\n\r\n'); 

    monkeys = [];
    monkeyStarting.forEach(monkey => {
        //Get Monkey Starting Items
        monkeyStartingItems = monkey.match(/Starting items: ((?:(?:\d)+(?:, )?)+)/)[1];
        monkeyStartingItems = monkeyStartingItems.split(', ');
        for (index in monkeyStartingItems) {
            monkeyStartingItems[index] = BigInt(monkeyStartingItems[index]);
        }
        //Get Monkey Operation
        monkeyOperation = monkey.match(/Operation: new = (.*)/)[1];
        [monkeyOperation, monkeyOps, monkeyOpsNum] = monkeyOperation.match(/([^\d]*)(\d*)/);
        if (monkeyOpsNum != '') {
            monkeyOperation = monkeyOps + "BigInt(" + monkeyOpsNum + ")"
        }
        console.log(monkeyOperation)
        //Get Monkey Test
        monkeyTest = BigInt(monkey.match(/Test: divisible by (\d*)/)[1]);
        //Get Monkey Throws
        monkeyTrueThrow = BigInt(monkey.match(/If true: throw to monkey (\d*)/)[1]);
        monkeyFalseThrow = BigInt(monkey.match(/If false: throw to monkey (\d*)/)[1]);

        //Store the monkey information in the array
        monkeys.push({
            items: monkeyStartingItems,
            operation: monkeyOperation,
            test: monkeyTest,
            trueThrow: monkeyTrueThrow,
            falseThrow: monkeyFalseThrow,
            inspectionCount: 0
        })
    });

    monkeys.sort((a, b) => a - b);
    testArr = []
    monkeys.forEach(monkey => {
        testArr.push(monkey.test);
    })
    remainderGCD = BigInt(lcmArr(testArr, testArr.length))
    console.log(remainderGCD);

    for (round = 0; round < 10000; round++) {
        for (monkey of monkeys) {
            while (monkey.items.length > 0) {
                curItem = monkey.items.shift();
                old = curItem;
                curItem = eval(monkey.operation);
                // curItem = parseInt(Math.floor(curItem / 3));
                if (curItem % monkey.test == 0) {
                    monkeys[monkey.trueThrow].items.push(curItem % remainderGCD);
                }
                else {
                    monkeys[monkey.falseThrow].items.push(curItem % remainderGCD);
                }
                monkey.inspectionCount++;
            }
        }
        if ( round % 100 == 0) {
            console.log(`Round ${round} completed`);
        }
    }

    monkeys.sort((a, b) => a.inspectionCount - b.inspectionCount);
    console.log(monkeys);
    monkeyBusiness = monkeys[monkeys.length - 1].inspectionCount * monkeys[monkeys.length - 2].inspectionCount;
    console.log(`Total Monkey Business ${monkeyBusiness}`);
});

gcd = (a, b) => {
    if (a == 0) return b;
    return gcd(b % a, a);
}

lcm = (a, b) => {
    return (a * b) / gcd(a, b);
}

lcmArr = (arr, n) => {
    result = arr[0];
    for (i = 1; i < n; i++) {
        result = lcm(arr[i], result);
    }
    return result;
}