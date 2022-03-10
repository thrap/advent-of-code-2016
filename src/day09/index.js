import run from "aocrunner"

const part1 = (input) => {
  const decompress = str => {
    if (!str)
      return 0
    const re = /^\((\d+)x(\d+)\)/
    if (re.test(str)) {
      const [m, length, repeats] = str.match(re)
      return length * repeats + decompress(str.substr(+length + m.length))
    } else {
      return 1 + decompress(str.substr(1))
    }
  }

  return decompress(input)
}

const part2 = (input) => {

  return
}

run({
  part1: {
    tests: [
      { input: 'ADVENT', expected: 6 },
      { input: '(6x1)(1x3)A', expected: 6 },
      { input: 'X(8x2)(3x3)ABCY', expected: 18 },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      { input: '', expected: "" }
    ],
    solution: part2,
  },
  onlyTests: false,
})
