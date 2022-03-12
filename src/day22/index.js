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

  var width = Math.max(...input.map(l => l[0])) + 1
  var height = Math.max(...input.map(l => l[1])) + 1

  var grid = Array(height).fill(0).map(_ => Array(width).fill())

  input.forEach(([x, y, size, used]) => {
    grid[y][x] = [used, size]
  })

  const dirs = [[1,0],[0,1],[-1,0],[0,-1]]

  const USED = 0
  const SIZE = 1
  var seen = {}
  var minSteps = Number.MAX_VALUE
  const recur = (x, y, grid, steps) => {
    if (steps >= minSteps) return
    if (x == 0 && y == 0) {
      console.log("FUNNET");
      minSteps = Math.min(steps, minSteps)
      console.log(minSteps);
      return
    }
    var str = ""+grid
    if (seen[str] <= steps)
      return
    seen[str] = steps
    for (var i = 0; i < height; i++) {
      for (var j = 0; j < width; j++) {
        const A = grid[i][j]
        if (A[USED] == 0)
          continue
        dirs.forEach(([di, dj]) => {
          var B = grid?.[i + di]?.[j+dj]
          if (!B) return

          if (B[SIZE]-B[USED] >= A[USED]) {
            const cpy = grid.map(x => [...x])
            cpy[i][j] = [0, A[SIZE]]
            cpy[i+di][j+dj] = [A[USED]+B[USED], B[SIZE]]
            if (i == y && j == x) {
              recur(x+dj, y+di, cpy, steps+1)
            }
            recur(x, y, cpy, steps + 1)
          }
        })
      }
    }
  }

  recur(width - 1, 0, grid, 0)
  return minSteps
}

run({
  part1: {
    solution: part1,
  },
  part2: {
    tests: [
      { input: `root@ebhq-gridcenter# df -h
Filesystem            Size  Used  Avail  Use%
/dev/grid/node-x0-y0   10T    8T     2T   80%
/dev/grid/node-x0-y1   11T    6T     5T   54%
/dev/grid/node-x0-y2   32T   28T     4T   87%
/dev/grid/node-x1-y0    9T    7T     2T   77%
/dev/grid/node-x1-y1    8T    0T     8T    0%
/dev/grid/node-x1-y2   11T    7T     4T   63%
/dev/grid/node-x2-y0   10T    6T     4T   60%
/dev/grid/node-x2-y1    9T    8T     1T   88%
/dev/grid/node-x2-y2    9T    6T     3T   66%`, expected: 7 }
    ],
    solution: part2,
  },
  onlyTests: true
})
