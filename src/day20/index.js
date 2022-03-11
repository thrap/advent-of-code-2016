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
  const input = parseInput(rawInput)
  input.sort((a, b) => a[0] - b[0])

  var count = 0
  var max = 0
  for (var i = 0; i < input.length-1; i++) {

    var possible = Math.max(input[i][1] + 1, max)
    max = Math.max(input[i][1] + 1, max)
    if (possible < input[i+1][0]) {
      count += input[i+1][0] - possible
    }
  }
  return count
}

run({
  part1: {
    solution: part1,
  },
  part2: {
    solution: part2,
  },
})
