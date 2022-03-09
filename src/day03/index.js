import run from "aocrunner"

const parse = input => input.split('\n').map(l => l.trim().split(/ +/).map(x => +x))

const isTriangle = arr => {
  const [a, b, c] = arr.sort((a,b) => a-b)

  return a + b > c
}

const part1 = (input) => parse(input).filter(isTriangle).length

const part2 = (input) => {
  const arr = parse(input).flat()

  var count = 0
  for (var i = 0; i < arr.length; i+=9) {
    for (var j = 0; j < 3; j++) {
      count = count + isTriangle([arr[i+j],arr[i+j+3],arr[i+j+6]])
    }
  }

  return count
}

run({
  part1: {
    solution: part1,
  },
  part2: {
    solution: part2,
  },
})
