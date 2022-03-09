import run from "aocrunner"

const parseInput = rawInput => rawInput.split('\n').map(l => l.trim().split(/ +/).map(x => +x))

const part1 = (rawInput) => {
  const triangles = parseInput(rawInput).map(t => t.sort((a,b) => a-b))

  return triangles.filter(([a,b,c]) => a + b > c).length
}

const part2 = (rawInput) => {

}

run({
  part1: {
    solution: part1,
  },
  part2: {
    solution: part2,
  },
})
