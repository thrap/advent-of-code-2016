import run from "aocrunner"

const re = /(.*)/
const parseLine = l => l.match(re).slice(1).map(x => +x ? +x : x)
const parseInput = rawInput => rawInput.split('\n')

const part1 = (rawInput) => {
  const input = parseInput(rawInput)

  const re = /(.)(?!\1)(.)(\2)(\1)/

  const split = str => {
    var a = ''
    var b = ''
    str.split(/\[|\]/).forEach((x, i) => {
      if (i % 2 == 0) {
        a += ' ' + x
      } else {
        b += '|' + x
      }
    });

    return [a, b]
  }


  return input.map(split).filter(([s1, brackets]) => re.test(s1) && !re.test(brackets)).length
}

const part2 = (rawInput) => {
  const input = parseInput(rawInput)

  return
}

run({
  part1: {
    solution: part1,
  },
  part2: {
    tests: [
    ],
    solution: part2,
  },
  onlyTests: false
})
