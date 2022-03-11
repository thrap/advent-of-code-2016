import run from "aocrunner"

const re = /has (\d+) p.* (\d+)\./
const parseLine = l => l.match(re).slice(1).map(x => +x ? +x : x)
const discs = input => input.split('\n').map(parseLine)

const timing = discs => {
  for (var offset = 0; true; offset++) {
    const positions = discs.map(([length, pos], i) => (pos + i + 1 + offset) % length)
    if (positions.every(x => x == 0)) {
      return offset
    }
  }
}

const part1 = (input) => timing(discs(input))

const part2 = (input) => timing(discs(input).concat([[11, 0]]))

run({
  part1: {
    solution: part1,
  },
  part2: {
    solution: part2,
  },
})
