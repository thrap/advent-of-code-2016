import run from "aocrunner"

const marker = /^\((\d+)x(\d+)\)/

const part1 = (input) => {
  const decompress = str => {
    if (!str)
      return 0
    if (marker.test(str)) {
      const [m, length, repeats] = str.match(marker)
      return length * repeats + decompress(str.substr(+length + m.length))
    } else {
      return 1 + decompress(str.substr(1))
    }
  }

  return decompress(input)
}

const part2 = (input) => {
  const decompress = str => {
    if (!str)
      return 0
    if (marker.test(str)) {
      const [m, length, repeats] = str.match(marker)
      const repeated = str.substr(m.length, +length)
      const rest = str.substr(+length + m.length)

      return repeats * decompress(repeated) + decompress(rest)
    } else {
      return 1 + decompress(str.substr(1))
    }
  }

  return decompress(input)
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
      { input: '(25x3)(3x3)ABC(2x3)XY(5x2)PQRSTX(18x9)(3x2)TWO(5x7)SEVEN', expected: 445 }
    ],
    solution: part2,
  },
})
