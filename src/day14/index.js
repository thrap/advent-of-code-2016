import run from "aocrunner"
import MD5 from "crypto-js/md5.js"

const parseInput = rawInput => rawInput

const part1 = (rawInput) => {
  const secret = parseInput(rawInput)

  const idx = '0123456789abcdef'.split('').reduce((acc, c) => ({...acc, [c]: []}), {})

  var long = /(.)\1{4,}/
  var short = /(.)\1{2,}/
  var keys = new Set()
  for (var i = 0; keys.size < 64; i++) {
    var hash = MD5(secret + i).toString()

    if (long.test(hash)) {
      Object.keys(idx).forEach(c => idx[c] = idx[c].filter(x => i - x <= 1000))
      const char = hash.match(long)[0][0]

      keys = new Set([...keys, ...idx[char]])
    }

    if (short.test(hash)) {
      const char = hash.match(short)[0][0]

      idx[char].push(i)
    }
  }

  return Math.max(...keys)
}

const part2 = (rawInput) => {
  const input = parseInput(rawInput)

  return
}

const part1Input = `abc`
const part2Input = part1Input
run({
  part1: {
    tests: [
      { input: part1Input, expected: 22728 },
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
