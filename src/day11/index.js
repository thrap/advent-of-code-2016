import run from "aocrunner"

const parseLine = l => l.split('contains ')[1].replace(/\.|(a )|(-compatible)/g, '').replace(/,? and /g, ', ').split(', ').filter(x => x != 'nothing relevant')
const parseInput = rawInput => rawInput.split('\n').map(parseLine)

const isValid = state => {
  return state.every(floor => {
    const hasGenerator = floor.some((x, i) => i % 2 == 0 && x)
    if (!hasGenerator)
      return true
    for (var i = 1; i < floor.length; i+=2) {
      if (floor[i] && !floor[i-1])
        return false
    }
    return true
  })
}

const move = (state, floor, d, i, j) => {
  const newState = state.map(x => x.map(x => x))
  newState[floor + d][i] = true
  newState[floor][i] = false
  if (j != null) {
    newState[floor + d][j] = true
    newState[floor][j] = false
  }
  return newState
}

const moveUp = (state, floor, i, j) => move(state, floor, 1, i, j)
const moveDown = (state, floor, i, j) => move(state, floor, -1, i, j)

const getPossible = (state, elevator, moves) => {
  const queue = []
  const floor = state[elevator]
  for (var i = 0; i < floor.length; i++) {
    if (floor[i]) {
      for (var j = i + 1; j < floor.length; j++) {
        if (floor[j]) {
          if (elevator < 3)
            queue.push([moveUp(state, elevator, i, j), elevator + 1, moves + 1])
          if (elevator > 0)
            queue.push([moveDown(state, elevator, i, j), elevator - 1, moves + 1])
        }
      }

      if (elevator < 3)
        queue.push([moveUp(state, elevator, i), elevator + 1, moves + 1])
      if (elevator > 0)
        queue.push([moveDown(state, elevator, i), elevator - 1, moves + 1])
    }
  }
  return queue.filter(([state]) => isValid(state))
}

const manhattan = state => {
  var sum = 0
  for (var i = 1; i < 4; i++) {
    sum += i * state[3-i].filter(x => x).length
  }
  return sum
}

const solve = (input) => {
  const objects = input.flat().sort()
  var initialState = Array(4).fill(0).map((_,i) => objects.map(x => input[i].includes(x)))

  const seen = {}
  var states = [[initialState, 0, 0, 0]]
  while (states.length) {
    const [state, elevator, moves] = states.shift()
    if (state[3].every(x => x)) {
      return moves
    }

    const pos = getPossible(state, elevator, moves)
    pos.forEach(([state, elevator, moves]) => {
      var man = manhattan(state)
      var str = elevator + ': '
      for (var floor = 0; floor < 4; floor++) {
        var sum = 0
        for (var i = 0; i < state[floor].length; i+=2) {
          sum += state[floor][i] * 100 + state[floor][i+1]
        }
        str += sum + ","
      }

      if (seen[str])
        return
      seen[str] = true

      states.push([state, elevator, moves, moves+man])
    })

    states.sort((a, b) => a[3] - b[3])
  }
}

const part1 = (rawInput) => solve(parseInput(rawInput))

const part2 = (rawInput) => {
  const asd = parseInput(rawInput)
  asd[0].push('elerium generator')
  asd[0].push('elerium microchip')
  asd[0].push('dilithium generator')
  asd[0].push('dilithium microchip')

  return solve(asd)
}

run({
  part1: {
    solution: part1,
  },
  part2: {
    solution: part2,
  },
})
