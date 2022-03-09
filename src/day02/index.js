import run from "aocrunner"

const parseInput = rawInput => rawInput.split('\n').map(l => l.split(''))

const dirs = { D: [1,0], R: [0,1], U: [-1,0], L: [0,-1]}

const part1 = (rawInput) => {
  const keypad = [[1,2,3],[4,5,6],[7,8,9]]
  const input = parseInput(rawInput)
  var x = 1
  var y = 1
  return input.map(l => l.map(c => dirs[c])).map(l => {
    l.forEach(([dx, dy]) => {
      x = Math.min(Math.max(x+dx, 0), 2)
      y = Math.min(Math.max(y+dy, 0), 2)
    })
    return keypad[x][y];
  }).join('')
}

const part2 = (rawInput) => {
  const input = parseInput(rawInput)

  return
}

const part1Input = `ULL
RRDDD
LURDL
UUUUD`
const part2Input = part1Input
run({
  part1: {
    tests: [
      { input: part1Input, expected: '1985' }
    ],
    solution: part1,
  },
  part2: {
    tests: [
      { input: part2Input, expected: "" }
    ],
    solution: part2,
  },
  onlyTests: false,
})
