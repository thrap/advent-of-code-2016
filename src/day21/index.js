import run from "aocrunner"

const parseInput = rawInput => rawInput.split('\n')

const rotateLeft = (str, n) => {
  for (var i = 0; i < n; i++) {
    str = str.slice(1) + str[0]
  }
  return str
}
const rotateRight = (str, n) => {
  for (var i = 0; i < n; i++) {
    str = str[str.length-1] + str.slice(0, str.length-1)
  }
  return str
}

const swap = (str, from, to) => {
  const arr = str.split('')
  var temp = arr[from]
  arr[from] = arr[to]
  arr[to] = temp

  return arr.join('')
}

const reverse = (str, from, to) => {
  const temp = str.slice(from, to+1)
  return str.replace(temp, temp.split('').reverse().join(''))
}

const move = (str, from, to) => {
  const arr = str.split('')
  arr.splice(from, 1)
  arr.splice(to, 0, str[from])
  return arr.join('')
}

const scramble = (instructions, str) => {
  const rotateR = /rotate right (\d) steps?/
  const rotateL = /rotate left (\d) steps?/
  const rotateB = /rotate based on position of letter (.+)/
  const swapI = /swap position (\d+) with position (\d+)/
  const swapC = /swap letter (.+) with letter (.+)/
  const reverseP = /reverse positions (\d+) through (\d+)/
  const moveP = /move position (\d+) to position (\d+)/

  return instructions.reduce((acc, op) => {
    if (rotateR.test(op)) {
      return rotateRight(acc, +op.match(rotateR)[1])
    } else if (rotateL.test(op)){
      return rotateLeft(acc, +op.match(rotateL)[1])
    } else if (rotateB.test(op)) {
      const char = op.match(rotateB)[1]
      const idx = acc.indexOf(char)
      return rotateRight(acc, 1 + (idx >= 4 ? idx + 1 : idx))
    } else if (swapI.test(op)){
      const [from, to] = op.match(swapI).slice(1).map(c => +c)
      return swap(acc, from, to)
    } else if (swapC.test(op)) {
      const [a, b] = op.match(swapC).slice(1)
      const from = acc.indexOf(a)
      const to = acc.indexOf(b)
      return swap(acc, from, to)
    } else if (reverseP.test(op)) {
      const [from, to] = op.match(reverseP).slice(1).map(c => +c)
      return reverse(acc, from, to)
    } else if (moveP.test(op)) {
      const [from, to] = op.match(moveP).slice(1).map(c => +c)
      return move(acc, from, to)
    } else {
      throw 1
    }
  }, str)
}

const part1 = (rawInput) => {
  const instructions = parseInput(rawInput)

  var str = 'abcdefgh'

  return scramble(instructions, str)
}

const part2 = (rawInput) => {
  const instructions = parseInput(rawInput)

  var found
  const permutations = (arr, acc) => {
    if (found) return
    if (arr.length == 0 || found) {
      if (scramble(instructions, acc) == 'fbgdceah') {
        found = acc
      }
    }

    arr.forEach(c => {
      var newSet = [...arr].filter(x => x != c)
      permutations(newSet, acc + c)
    })
  }

  permutations('abcdefgh'.split(''), '')
  return found
}

run({
  part1: {
    solution: part1,
  },
  part2: {
    solution: part2,
  },
})
