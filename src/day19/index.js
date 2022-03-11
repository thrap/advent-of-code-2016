import run from "aocrunner"

const parseInput = rawInput => +rawInput

const part1 = (rawInput) => {
  const elves = parseInput(rawInput)

  const arr = Array(elves).fill(0).map((_,i) => ({num: i+1, left: (i+1) % elves}))

  var elf = arr[0]
  for(var i = 0; arr[elf.left].num != elf.num; i++) {
    elf.left = arr[elf.left].left
    elf = arr[elf.left]
  }

  return elf.num
}

const part2brute = (rawInput) => {
  const elves = parseInput(rawInput)

  const arr = Array(elves).fill(0).map((_,i) => ({num: i+1, left: (i+1) % elves}))

  //console.log(arr);
  var remainding = elves
  var elf = arr[0]
  for(var i = 0; remainding > 0; i++) {
    if (remainding % 1000 == 0) {
      console.log(remainding);
    }
    var across = Math.floor(remainding/2)
    var goalElf = elf
    for (var j = 0; j < across-1; j++) {
      goalElf = arr[goalElf.left]
    }
    if (arr[goalElf.left] == elf) {
      return elf.num
    }
    /*console.log("steps across", across, remainding);
    console.log(elf.num, arr[goalElf.left].num);
    console.log();*/
    goalElf.left = arr[goalElf.left].left
    remainding--
    elf = arr[elf.left]
  }

  return elf.num
}

const part2 = (rawInput) => {
  return part2brute(rawInput)
}

run({
  part1: {
    tests: [
      { input: '5', expected: 3 },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      { input: '5', expected: 2 },
      { input: '999', expected: 270 },
      { input: '83741', expected: 24692 },
    ],
    solution: part2,
  },
  onlyTests: true
})
