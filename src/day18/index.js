import run from "aocrunner"

const re = /(.*)/
const parseLine = l => l.match(re).slice(1).map(x => +x ? +x : x)
const parseInput = rawInput => rawInput.split('').map(c => c == '^')

const part1 = (rawInput) => {
  var board = [parseInput(rawInput)]
  for (var j = 1; j < 40; j++) {
    var row = []
    const traps = board[j-1]
    for(var i = 0; i < traps.length; i++) {
      const left = traps[i-1]
      const center = traps[i]
      const right = traps[i+1]
      if (left && center && !right) {
        row.push(true)
      } else if (!left && center && right) {
        row.push(true)
      } else if (left && !center && !right) {
        row.push(true)
      } else if (!left && !center && right) {
        row.push(true)
      } else {
        row.push(false)
      }
    }
    board.push(row)
  }

  return board.flat().filter(x => !x).length
}

const part2 = (rawInput) => {
  const input = parseInput(rawInput)

  return
}

run({
  part1: {
    solution: part1,
  },
  part2: {
    solution: part2,
  },
})
