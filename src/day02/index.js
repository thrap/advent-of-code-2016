import run from "aocrunner"

const dirs = { D: [1,0], R: [0,1], U: [-1,0], L: [0,-1] }

const parseInput = rawInput => rawInput.split('\n').map(l => l.split('').map(c => dirs[c]))

const code = (moves, keypad, x, y) => {
  return moves.map(l => {
    l.forEach(([dx, dy]) => {
      if (keypad[x + dx]?.[y+dy]) {
        x = x+dx
        y = y+dy
      }
    })
    return keypad[x][y];
  }).join('')
}

const part1 = (rawInput) => {
  const moves = parseInput(rawInput)
  const keypad = [[1,2,3],[4,5,6],[7,8,9]]

  return code(moves, keypad, 1, 1)
}

const part2 = (rawInput) => {
  const moves = parseInput(rawInput)
  const keypad = [[,,1],[,2,3,4],[5,6,7,8,9],[,'A','B','C'],[,,'D']]

  return code(moves, keypad, 2, 0)
}

run({
  part1: {
    solution: part1,
  },
  part2: {
    solution: part2,
  },
})
