import run from "aocrunner"

const parseInput = rawInput => rawInput.split(', ').map(x => [x[0], +x.substr(1)])

const part1 = (rawInput) => {
  const input = parseInput(rawInput)
  const dirs = [[1,0],[0,1],[-1,0],[0,-1]]
  var dir = 0
  var x = 0
  var y = 0
  input.forEach(([turn, steps]) => {
    dir = (4 + dir + (turn == 'R' ? -1 : 1)) % 4
    const [dx, dy] = dirs[dir]
    x += dx * steps
    y += dy * steps
  })

  return Math.abs(x) + Math.abs(y)
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
