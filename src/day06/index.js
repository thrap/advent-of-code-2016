import run from "aocrunner"

const count = (rawInput, compare) => {
  const messages = rawInput.split('\n')
  const count = Array(messages[0].length).fill(0).map(_ => ({}))
  messages.forEach(message => {
    message.split('').forEach((c, i) =>
      count[i][c] = (count[i]?.[c] || 0) + 1
    )
  })
  const first = map => Object.keys(map).sort((a, b) => compare(map[a], map[b]))[0]

  return count.map(first).join('')
}

const part1 = (input) => count(input, (a, b) => b-a)

const part2 = (input) => count(input, (a, b) => a-b)

run({
  part1: {
    solution: part1,
  },
  part2: {
    solution: part2,
  },
})
