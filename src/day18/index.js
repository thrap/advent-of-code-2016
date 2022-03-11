import run from "aocrunner"

const parseInput = rawInput => rawInput.split('').map(c => c == '^')

const nextRow = (traps, count) => {
  var row = []
  for(var i = 0; i < traps.length; i++) {
    const l = traps[i-1]
    const c = traps[i]
    const r = traps[i+1]
    if ((l && c && !r) || (!l && c && r) || (l && !c && !r) || (!l && !c && r)) {
      row.push(true)
    } else {
      count ++
      row.push(false)
    }
  }
  return [row, count]
}

const count = (rows, input) => {
  var traps = parseInput(input)
  var count = traps.filter(x => !x).length

  for (var j = 1; j < rows; j++) {
    [traps, count] = nextRow(traps, count)
  }

  return count
}

const part1 = (input) => count(40, input)

const part2 = (input) => count(400000, input)

run({
  part1: {
    solution: part1,
  },
  part2: {
    solution: part2,
  },
})
