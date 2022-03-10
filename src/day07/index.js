import run from "aocrunner"

const split = str => {
  var a = ''
  var b = ''
  str.split(/\[|\]/).forEach((x, i) => {
    if (i % 2 == 0) {
      a += ' ' + x
    } else {
      b += ',' + x
    }
  });

  return [a, b]
}
const parseInput = rawInput => rawInput.split('\n').map(split)

const part1 = (rawInput) => {
  const input = parseInput(rawInput)

  const re = /(.)(?!\1)(.)(\2)(\1)/

  return input.filter(([s1, brackets]) => re.test(s1) && !re.test(brackets)).length
}

const part2 = (rawInput) => {
  const input = parseInput(rawInput)

  const re = /(.)(?!\1)(.)(\1).*\|.*(\2)(\1)(\2)/

  return input.filter(([a, b]) => re.test(a+'|'+b)).length
}

run({
  part1: {
    solution: part1,
  },
  part2: {
    solution: part2,
  },
})
