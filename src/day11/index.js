import run from "aocrunner"

const parseLine = l => l.match(re).slice(1).map(x => +x ? +x : x)
const parseInput = rawInput => rawInput.split('\n')//.map(parseLine)

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

const moveUp = (state, floor, i, j) => {
  const newState = state.map(x => x.map(x => x))
  newState[floor + 1][i] = true
  newState[floor][i] = false
  if (j) {
    newState[floor + 1][j] = true
    newState[floor][j] = false
  }
  return newState
}

const moveDown = (state, floor, i, j) => {
  const newState = state.map(x => x.map(x => x))
  newState[floor - 1][i] = true
  newState[floor][i] = false
  if (j != null) {
    newState[floor - 1][j] = true
    newState[floor][j] = false
  }
  return newState
}

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

const part1 = (rawInput) => {
  const input = parseInput(rawInput)
  const asd = input.map(l => l.split('contains ')[1].replace(/\.|(a )|(-compatible)/g, '').replace(/,? and /g, ', ').split(', ').filter(x => x != 'nothing relevant'))

  var elevator = 0

  const printOrder = asd.flat().sort()

  const seen = {}

  var initialState = Array(4).fill(0).map((_,i) => printOrder.map(x => asd[i].includes(x)))
  var states = [[initialState, elevator, 0, manhattan(initialState)]]
  for (var i = 0; i <= 5000000 && states.length; i++) {
    const [state, elevator, moves, man] = states.shift()

    if (state[3].every(x => x)) {
      console.log("VUNNET");
      return moves
    }
    const pos = getPossible(state, elevator, moves)
    pos.forEach(([state, elevator, moves]) => {
      var man = manhattan(state)
      var str = elevator + state.join('')

      str = elevator + ': '
      for (var floor = 0; floor < 4; floor++) {
        var pairs = 0
        var generators = 0
        var chips = 0
        for (var i = 0; i < state[floor].length; i+=2) {
          const generator = state[floor][i]
          const chip = state[floor][i+1]

          if (generator && chip) {
            pairs++
          } else if (generator) {
            generators++
          } else if (chip) {
            chips++
          }
        }
        str += pairs + ' ' + generators + ' ' + chips + "\n"
      }

      if (seen[str])
        return
      seen[str] = moves
      var j = binarySearch(states, man + moves, 0, states.length - 1)

      states.splice(j, 0, [state, elevator, moves, moves+man])
    })
  }

  return minMoves
}

const binarySearch = (states, item, low,high) => {
  if (states.length == 0)
    return 0
  if (high <= low)
    return (item > states[low][3]) ? (low + 1) : low;

  const mid = Math.floor((low + high) / 2);

  if (item == states[mid][3]) return mid + 1;

  if (item > states[mid][3]) return binarySearch(states, item, mid + 1, high);
  return binarySearch(states, item, low, mid - 1);
}

const part2 = (rawInput) => {
  const input = parseInput(rawInput)
  const asd = input.map(l => l.split('contains ')[1].replace(/\.|(a )|(-compatible)/g, '').replace(/,? and /g, ', ').split(', ').filter(x => x != 'nothing relevant'))
  asd[0].push('elerium generator')
  asd[0].push('elerium microchip')
  asd[0].push('dilithium generator')
  asd[0].push('dilithium microchip')

  var elevator = 0

  const printOrder = asd.flat().sort()

  const seen = {}


  var initialState = Array(4).fill(0).map((_,i) => printOrder.map(x => asd[i].includes(x)))
  var states = [[initialState, elevator, 0, manhattan(initialState)]]
  for (var i = 0; i <= 5000000 && states.length; i++) {
    const [state, elevator, moves, man] = states.shift()
    if (state[3].every(x => x)) {
      console.log("VUNNET");
      return moves
    }
    const pos = getPossible(state, elevator, moves)
    pos.forEach(([state, elevator, moves]) => {
      var man = manhattan(state)
      var str = elevator + state.join('')

      str = elevator + ': '
      for (var floor = 0; floor < 4; floor++) {
        var pairs = 0
        var generators = 0
        var chips = 0
        for (var i = 0; i < state[floor].length; i+=2) {
          const generator = state[floor][i]
          const chip = state[floor][i+1]

          if (generator && chip) {
            pairs++
          } else if (generator) {
            generators++
          } else if (chip) {
            chips++
          }
        }
        str += pairs + ' ' + generators + ' ' + chips + "\n"
      }

      if (seen[str])
        return
      seen[str] = moves
      var j = binarySearch(states, man + moves, 0, states.length - 1)

      states.splice(j, 0, [state, elevator, moves, moves+man])
    })
  }
}

const part1Input = `The first floor contains a hydrogen-compatible microchip and a lithium-compatible microchip.
The second floor contains a hydrogen generator.
The third floor contains a lithium generator.
The fourth floor contains nothing relevant.`
const part2Input = part1Input
run({
  part1: {
    tests: [
      { input: part1Input, expected: 11 },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      { input: part2Input, expected: '' },
    ],
    solution: part2,
  },
  onlyTests: false
})
