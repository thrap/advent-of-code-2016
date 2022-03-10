import run from "aocrunner"

const re = /(.*)/
const parseLine = l => l.match(re).slice(1).map(x => +x ? +x : x)
const parseInput = rawInput => rawInput.split('\n')//.map(parseLine)

const prettyPrint = (elevator, state, printOrder) => {
  for (var i = 3; i >= 0; i--) {
    console.log("F"+(i+1), (elevator == i ? 'E ' : '. '), printOrder.map((x, j) => {
      const [h, t] = x.split(' ')
      const abbr = h.substring(0, printOrder.length == 4 ? 1 : 2).toUpperCase() + '' +  t[0].toUpperCase()
      return state[i][j] ? abbr : '. ' + (printOrder.length == 4 ? '' : ' ')
    }).join(' '))
  }
  console.log();
}
const part1 = (rawInput) => {
  const input = parseInput(rawInput)
  const asd = input.map(l => l.split('contains ')[1].replace(/\.|(a )|(-compatible)/g, '').replace(/,? and /g, ', ').split(', ').filter(x => x != 'nothing relevant'))

  var elevator = 0

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

  var minMoves = Number.MAX_VALUE
  const seen = {}
  const recur = (state, elevator, moves) => {
    if (moves >= minMoves)
      return
    var str = elevator + state.join('')
    if (seen[str] && seen[str] < moves)
      return
    seen[str] = moves
    //prettyPrint(elevator, state, printOrder)
    if (!isValid(state)) return
    if (state[3].every(x => x)) {
      console.log("VUNNET");
      console.log(moves);
      minMoves = moves
      return
    }

    const floor = state[elevator]
    for (var i = 0; i < floor.length; i++) {
      if (floor[i]) {
        for (var j = i + 1; j < floor.length; j++) {
          if (floor[j]) {
            if (elevator < 3)
              recur(moveUp(state, elevator, i, j), elevator + 1, moves + 1)
            if (elevator > 0)
              recur(moveDown(state, elevator, i, j), elevator - 1, moves + 1)
          }
        }

        if (elevator < 3)
          recur(moveUp(state, elevator, i), elevator + 1, moves + 1)
        if (elevator > 0)
          recur(moveDown(state, elevator, i), elevator - 1, moves + 1)
      }
    }

  }

  const printOrder = asd.flat().sort()
  var state = Array(4).fill(0).map((_,i) => printOrder.map(x => asd[i].includes(x)))

  recur(state, elevator, 0)

  return minMoves
}

const part2 = (rawInput) => {
  const input = parseInput(rawInput)

  return
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
  onlyTests: true
})
