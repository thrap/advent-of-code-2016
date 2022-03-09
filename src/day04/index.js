import run from "aocrunner"

const parseLine = l => l.match(/([^\d]+)-(\d+)\[(.+)\]/).slice(1)
const parseInput = rawInput => rawInput.split('\n').map(parseLine)

const isValid = ([name, , checksum]) => {
  const count = {}
  name.replace(/-/g,'').split('').forEach(c =>
    count[c] = (count[c] || 0) + 1
  )
  const compare = (a,b) => count[a] != count[b] ? count[b] - count[a] : a.localeCompare(b)

  return checksum == Object.keys(count).sort(compare).slice(0,5).join('')
}

const part1 = (rawInput) => {
  const input = parseInput(rawInput)

  return input.filter(isValid).reduce((acc, [,id]) => +id + acc, 0)
}

const part2 = (rawInput) => {
  const input = parseInput(rawInput)

}

run({
  part1: {
    solution: part1,
  },
  part2: {
    solution: part2,
  },
})
