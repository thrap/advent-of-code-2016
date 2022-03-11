import run from "aocrunner"

const parseInput = rawInput => rawInput.split('\n').map(l => l.split('-').map(x => +x))

const part1 = (rawInput) => {
  const input = parseInput(rawInput)
  input.sort((a, b) => a[0] - b[0])

  for (var i = 0; i < input.length; i++) {
    var possible = input[i][1] + 1
    if (possible < input[i+1][0]) {
      return possible
    }
  }
}

const part2 = (rawInput) => {

}

const part1Input = `5-8
0-2
4-7`
const part2Input = part1Input
run({
  part1: {
    tests: [
      { input: part1Input, expected: 3 },
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
