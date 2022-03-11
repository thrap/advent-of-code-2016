import run from "aocrunner"
import MD5 from "crypto-js/md5.js"
import fs from 'fs'

const parseInput = rawInput => rawInput

var long = /(.)\1{4,}/
var short = /(.)\1{2,}/

const part1 = (rawInput) => {
  const secret = parseInput(rawInput)

  const idx = '0123456789abcdef'.split('').reduce((acc, c) => ({...acc, [c]: []}), {})

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

const part2 = () => {
  var hashes = fs.readFileSync('hashes.txt','utf8').split('\n')

  const isValid = (n, c) => {
    for(var i = 1; i <= 1000; i++) {
      if (new RegExp(c+c+c+c+c).test(hashes[n+i]))
        return true
    }
    return false
  }

  var keys = []
  for (var i = 0; keys.length < 64; i++) {
    var hash = hashes[i]

    if (short.test(hash)) {
      const char = hash.match(short)[0][0]

      if (isValid(i, char)) {
        keys.push(i)
      }
    }
  }

  return keys[63]
}

run({
  part1: {
    solution: part1,
  },
  part2: {
    solution: part2,
  },
})
