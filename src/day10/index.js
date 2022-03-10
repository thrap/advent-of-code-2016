import run from "aocrunner"

const getChips = instructions => {
  const chips = {}
  const input = /value (\d+) goes to (bot \d+)/
  const give = /(bot \d+) gives low to (.+ \d+) and high to (.+ \d+)/
  const addVal = (name, val) => {
    if (chips[name]) {
      chips[name] = [Math.min(chips[name], val), Math.max(chips[name], val)]
    } else {
      chips[name] = val
    }
  }

  while(instructions.length) {
    var queue = []
    instructions.forEach(line => {
      if (input.test(line)) {
        const [, val, bot] = line.match(input)
        addVal(bot, +val)
      } else if (give.test(line)) {
        const [,bot, low, high] = line.match(give)
        if (chips[bot]?.length == 2) {
          addVal(low,  chips[bot][0])
          addVal(high, chips[bot][1])
        } else {
          queue.push(line)
        }
      }
    });
    instructions = queue
  }
  return chips
}
const part1 = (input) => {
  const chips = getChips(input.split('\n'))

  const name = Object.keys(chips).find(chip => chips[chip][1] == 61 && chips[chip][0] == 17)
  return +name.split(' ')[1]
}

const part2 = (input) => {
  const chips = getChips(input.split('\n'))

  return chips['output 0'] * chips['output 1'] * chips['output 2']
}

run({
  part1: {
    solution: part1,
  },
  part2: {
    solution: part2,
  },
})
