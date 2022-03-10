import run from "aocrunner"

var SIZE = 50
const createGrid = input => {
  const n = +input
  const grid = Array(SIZE).fill(0).map(_ => Array(SIZE))
  for (var x = 0; x < SIZE; x++) {
    for (var y = 0; y < SIZE; y++) {
      grid[x][y] = (x*x + 3*x + 2*x*y + y + y*y + n).toString(2).replace(/0/g,'').length % 2 == 1
    }
  }
  return grid
}

const dirs = [[1,0],[0,1],[-1,0],[0,-1]]

const part1 = (rawInput) => {
  const grid = createGrid(rawInput)

  const goalX = 31
  const goalY = 39

  var minSteps = Number.MAX_VALUE
  const min = {}
  const dfs = (x,y, steps) => {
    if ((min[[x,y]] && min[[x,y]] < steps) || steps >= minSteps) return

    min[[x,y]] = steps
    if (x == goalX && y == goalY) {
      minSteps = Math.min(minSteps, steps)
      return
    }
    dirs.forEach(([dx, dy]) => {
      if (grid[x + dx]?.[y+dy] === false) {
        dfs(x+dx, y+dy, steps+1)
      }
    })
  }

  dfs(1,1, 0);

  return minSteps
}

const part2 = (rawInput) => {
  const grid = createGrid(rawInput)

  const min = {}
  const dfs = (x,y, steps) => {
    if ((min[[x,y]] && min[[x,y]] < steps) || steps > 50) return
    min[[x,y]] = steps

    dirs.forEach(([dx, dy]) => {
      if (grid[x + dx]?.[y+dy] == false) {
        dfs(x+dx, y+dy, steps+1)
      }
    })
  }

  dfs(1,1, 0);

  return Object.keys(min).length
}

run({
  part1: {
    solution: part1,
  },
  part2: {
    solution: part2,
  },
})
