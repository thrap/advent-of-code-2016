import run from "aocrunner"

const re = /has (\d+) p.* (\d+)\./
const parseLine = l => l.match(re).slice(1).map(x => +x ? +x : x)
const parse = input => input.split('\n').map(parseLine)

const part1 = (input) => {
  const discs = parse(input)

  for (var offset = 0; true; offset++) {
    const positions = discs.map(([length, pos], i) => (pos + i + 1 + offset) % length)
    if (positions.every(x => x == 0)) {
      return offset
    }
  }
}

const part2 = (input) => {
  const discs = parse(input)

  return
}

const part1Input = `Disc #1 has 5 positions; at time=0, it is at position 4.
Disc #2 has 2 positions; at time=0, it is at position 1.`
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
