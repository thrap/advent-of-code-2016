import run from "aocrunner"

const parseInput = rawInput => rawInput.split('\n').map(l => l.split(''))

const coords = (grid, c) => {
  for (var x = 0; x < grid.length; x++) {
    for (var y = 0; y < grid[0].length; y++) {
      if (grid[x][y] == c)
        return [x, y]
    }
  }
}

const aStar = (grid, start, goal) => {
  const [goalX, goalY] = coords(grid, goal)

  var states = [[...coords(grid, start), 0, 0]]
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
const dirs = [[1,0],[0,1],[-1,0],[0,-1]]
const part1 = (rawInput) => {
  const grid = parseInput(rawInput)

  var coords = {}
  for (var x = 0; x < grid.length; x++) {
    for (var y = 0; y < grid[0].length; y++) {
      if (/\d/.test(grid[x][y]))
        coords[grid[x][y]] = [x, y]
    }
  }
  var nodes = Object.keys(coords).sort()

  console.log(coords);
  console.log(nodes);
  const distance = {}
  nodes.forEach(start => {
    distance[start] = {}
    nodes.forEach(goal => {
      distance[start][goal] = aStar(grid, start, goal)
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
      var length = pathLength(acc)
      if (length < min) {
        min = length
        console.log(min);
      }
    }

    arr.forEach(c => {
      var newSet = [...arr].filter(x => x != c)
      permutations(newSet, acc + c)
    })
  }

  permutations(nodes.slice(1), '0')

  console.log(distance);

  console.log(aStar(grid, 0, 4));
  console.log(aStar(grid, 4, 1));
  console.log(aStar(grid, 1, 2));
  console.log(aStar(grid, 2, 3));

  console.log(grid.length * grid[0].length);

  return min
}

const part2 = (rawInput) => {
  const grid = parseInput(rawInput)

  var coords = {}
  for (var x = 0; x < grid.length; x++) {
    for (var y = 0; y < grid[0].length; y++) {
      if (/\d/.test(grid[x][y]))
        coords[grid[x][y]] = [x, y]
    }
  }
  var nodes = Object.keys(coords).sort()

  console.log(coords);
  console.log(nodes);
  const distance = {}
  nodes.forEach(start => {
    distance[start] = {}
    nodes.forEach(goal => {
      distance[start][goal] = aStar(grid, start, goal)
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
      var length = pathLength(acc+"0")
      if (length < min) {
        min = length
        console.log(min);
      }
    }

    arr.forEach(c => {
      var newSet = [...arr].filter(x => x != c)
      permutations(newSet, acc + c)
    })
  }

  permutations(nodes.slice(1), '0')

  console.log(distance);

  console.log(aStar(grid, 0, 4));
  console.log(aStar(grid, 4, 1));
  console.log(aStar(grid, 1, 2));
  console.log(aStar(grid, 2, 3));

  console.log(grid.length * grid[0].length);

  return min
  const input = parseInput(rawInput)

  return
}

const part1Input = `###########
#0.1.....2#
#.#######.#
#4.......3#
###########`
const part2Input = part1Input
run({
  part1: {
    tests: [
      { input: part1Input, expected: 14 },
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
