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
  var elves = parseInput(rawInput)

  var magic = 1
  while (magic*3-1 < elves/2) {
    magic = 3*magic - 1
  }
  return elves - magic*2+1
}

run({
  part1: {
    solution: part1,
  },
  part2: {
    solution: part2,
  },
})
