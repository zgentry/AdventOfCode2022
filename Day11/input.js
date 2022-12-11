const fs = require('fs');

fs.readFile('Input.txt', 'utf-8', (err, data) => {
    if (err) throw err;

    monkeyStarting = data.split('\r\n\r\n');
    console.log(monkeyStarting);

    monkeys = [];
    monkeyStarting.forEach(monkey => {
        //Get Monkey Starting Items
        monkeyStartingItems = monkey.match(/Starting items: ((?:(?:\d)+(?:, )?)+)/)[1];
        monkeyStartingItems = monkeyStartingItems.split(', ');
        for (index in monkeyStartingItems) {
            monkeyStartingItems[index] = parseInt(monkeyStartingItems[index]);
        }
        //Get Monkey Operation
        monkeyOperation = monkey.match(/Operation: new = (.*)/)[1];
        //Get Monkey Test
        monkeyTest = parseInt(monkey.match(/Test: divisible by (\d*)/)[1]);
        //Get Monkey Throws
        monkeyTrueThrow = parseInt(monkey.match(/If true: throw to monkey (\d*)/)[1]);
        monkeyFalseThrow = parseInt(monkey.match(/If false: throw to monkey (\d*)/)[1]);

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

    for (round = 0; round < 20; round++) {
        for (monkey of monkeys) {
            while (monkey.items.length > 0) {
                curItem = monkey.items.shift();
                old = curItem;
                curItem = eval(monkey.operation);
                curItem = parseInt(Math.floor(curItem / 3));
                if (curItem % monkey.test == 0) {
                    monkeys[monkey.trueThrow].items.push(curItem);
                }
                else {
                    monkeys[monkey.falseThrow].items.push(curItem);
                }
                monkey.inspectionCount++;
            }
        }
        console.log(`------Completed Round ${round}------`);
        console.log(monkeys);
    }

    monkeys.sort((a, b) => a.inspectionCount - b.inspectionCount);
    console.log(monkeys);
    monkeyBusiness = monkeys[monkeys.length - 1].inspectionCount * monkeys[monkeys.length - 2].inspectionCount;
    console.log(`Total Monkey Business ${monkeyBusiness}`);
});