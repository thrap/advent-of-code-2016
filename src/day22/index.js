import run from "aocrunner"

const re = /node-x(\d+)-y(\d+) +(\d+)T +(\d+)T +(\d+)T +(\d+)%/
const parseLine = l => l.match(re).slice(1).map(x => +x)
const parseInput = rawInput => rawInput.split('\n').slice(2).map(parseLine)

const part1 = (rawInput) => {
  const nodes = parseInput(rawInput)
  const USED = 3
  const AVAIL = 4
  const isViable = (a, b) => {
    return a[USED] != 0 && (b[AVAIL] >= a[USED])
  }
  var viable = 0
  for (var i = 0; i < nodes.length; i++) {
    for (var j = 0; j < nodes.length; j++) {
      if (i == j)
        continue
      if (isViable(nodes[i], nodes[j])) {
        viable++
      }
    }
  }

  return viable
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
