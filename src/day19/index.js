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

const part2 = (rawInput) => {
  const input = parseInput(rawInput)

  return
}

const part1Input = `5`
const part2Input = part1Input
run({
  part1: {
    tests: [
      { input: part1Input, expected: '' },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      { input: part2Input, expected: '' },
    ],
    solution: part2,
  },
  onlyTests: false,
})
