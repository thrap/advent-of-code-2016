import run from "aocrunner"

const step = a => {
  const b = a.split('').reverse().map(c => c == '0' ? 1 : 0).join('')
  return a + 0 + b
}

const part1 = (state) => {
  const disc = 272
  while (state.length < disc) {
    state = step(state)
  }

  const checksum = ([a, b, ...t]) => {
    const str = (a == b ? '1' : '0') + (t.length ? checksum(t) : '')
    return str
  }

  var sum = state.substring(0, disc)

  while(sum.length % 2 == 0) {
    sum = checksum(sum)
  }
  return sum
}

const part2 = (state) => {
  const disc = 35651584
  while (state.length < disc) {
    state = step(state)
  }

  var sum = state.substring(0, disc)
  while (sum.length % 2 == 0) {
    var newSum = ''
    for (var i = 0; i < sum.length; i+=2) {
      if (sum[i] == sum[i+1])
        newSum += '1'
      else
        newSum += '0'
    }
    sum = newSum
  }
  return sum
}

run({
  part1: {
    solution: part1,
  },
  part2: {
    solution: part2,
  },
})
