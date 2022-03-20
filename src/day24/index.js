import run from "aocrunner"

const grid = input => input.split('\n').map(l => l.split(''))
const dirs = [[1,0],[0,1],[-1,0],[0,-1]]

const aStar = (grid, start, goal) => {
  const [goalX, goalY] = goal

  var states = [[...start, 0, 0]]
  const seen = {}
  while (states.length) {
    const [x, y, moves] = states.shift()
    if (x == goalX && y == goalY) {
      return moves
    }

    const pos = dirs.filter(([dx, dy]) => (grid[x + dx]?.[y+dy] != '#'))
    pos.forEach(([dx, dy]) => {
      var man = Math.abs(goalX - (x+dx)) + Math.abs(goalY - (y+dy))

      if (seen[[x+dx,y+dy]])
        return
      seen[[x+dx,y+dy]] = true

      states.push([x+dx, y+dy, moves + 1, moves+man])
    })

    states.sort((a, b) => a[3] - b[3])
  }
}

const shortest = (grid, part2) => {
  var coords = {}
  for (var x = 0; x < grid.length; x++) {
    for (var y = 0; y < grid[0].length; y++) {
      if (/\d/.test(grid[x][y]))
        coords[grid[x][y]] = [x, y]
    }
  }
  var nodes = Object.keys(coords).sort()

  const distance = {}
  nodes.forEach(start => {
    distance[start] = {}
    nodes.forEach(goal => {
      distance[start][goal] = aStar(grid, coords[start], coords[goal])
    })
  })

  const pathLength = str => {
    var sum = 0
    for (var i = 0; i < str.length-1; i++) {
      sum += distance[str[i]][str[i+1]]
    }
    return sum
  }

  var min = Number.MAX_VALUE
  const permutations = (arr, acc) => {
    if (arr.length == 0) {
      var length = pathLength(acc+ (part2 ? '0':''))
      if (length < min) {
        min = length
      }
    }

    arr.forEach(c => {
      var newSet = [...arr].filter(x => x != c)
      permutations(newSet, acc + c)
    })
  }

  permutations(nodes.slice(1), '0')

  return min
}

const part1 = (input) => shortest(grid(input))

const part2 = (input) => shortest(grid(input), true)

run({
  part1: {
    solution: part1,
  },
  part2: {
    solution: part2,
  },
})
