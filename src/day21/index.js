import run from "aocrunner"

const re = /(.*)/
const parseLine = l => l.match(re).slice(1).map(x => +x ? +x : x)
const parseInput = rawInput => rawInput.split('\n')//.map(parseLine)

const part1 = (rawInput) => {
  const input = parseInput(rawInput)

  var str = 'abcdefgh'

  console.log(input)

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
    console.log(from, to);
    console.log(arr);
    console.log(str[from]);
    arr.splice(from, 1)
    arr.splice(to, 0, str[from])
    console.log(arr)
    return arr.join('')
  }

  const rotateR = /rotate right (\d) steps?/
  const rotateL = /rotate left (\d) steps?/
  const rotateB = /rotate based on position of letter (.+)/
  const swapI = /swap position (\d+) with position (\d+)/
  const swapC = /swap letter (.+) with letter (.+)/
  const reverseP = /reverse positions (\d+) through (\d+)/
  const moveP = /move position (\d+) to position (\d+)/
  return input.reduce((acc, op) => {
    console.log(acc);
    console.log(op);
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

  return
}

const part2 = (rawInput) => {
  const input = parseInput(rawInput)

  return
}

const part1Input = `swap position 4 with position 0
swap letter d with letter b
reverse positions 0 through 4
rotate left 1 step
move position 1 to position 4
move position 3 to position 0
rotate based on position of letter b
rotate based on position of letter d`
const part2Input = part1Input
run({
  part1: {
    tests: [
      { input: part1Input, expected: '' },
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
