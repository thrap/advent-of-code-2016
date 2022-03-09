import run from "aocrunner"

const parseInput = rawInput => rawInput.split('\n')

const part1 = (rawInput) => {
  const input = parseInput(rawInput)
  const count = Array(input[0].length).fill(0).map(_ => ({}))
  input.forEach(message => {
    message.split('').forEach((c, i) =>
      count[i][c] = (count[i]?.[c] || 0) + 1
    )
  })
  const findMax = map => Object.keys(map).sort((a, b) => map[b] - map[a])[0]

  return count.map(findMax).join('')
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
    solution: part2,
  },
})
