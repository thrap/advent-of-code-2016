import run from "aocrunner"
import MD5 from "crypto-js/md5.js";

const parseInput = rawInput => rawInput//.split('\n')//.map(parseLine)

const part1 = (rawInput) => {
  const secret = parseInput(rawInput)
  var ans = ''
  for (var i = 0; ans.length < 8; i++) {
    var hash = MD5(secret + i).toString()
    if (hash.substring(0, 5) == '00000') {
      ans += hash[5]
      console.log(i, ans);
    }
  }
  return ans
}

const part2 = (rawInput) => {
  const secret = parseInput(rawInput)
  var ans = Array(8)
  var count = 0
  for (var i = 0; count < 8; i++) {
    var hash = MD5(secret + i).toString()
    if (hash.substring(0, 5) == '00000') {
      const idx = hash[5]
      if (!ans[idx] && idx < 8) {
        ans[idx] = hash[6]
        count++
        console.log(i, ans);
      }
    }
  }
  return ans.join('')
}

run({
  part1: {
    solution: part1,
  },
  part2: {
    solution: part2,
  },
})
