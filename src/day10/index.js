import run from "aocrunner"

const parseInput = rawInput => rawInput.split('\n')

const part1 = (rawInput) => {
  var instructions = parseInput(rawInput)

  const chips = {}
  const input = /value (\d+) goes to (bot \d+)/
  const give = /(bot \d+) gives low to (.+ \d+) and high to (.+ \d+)/
  const addVal = (name, val) => {
    if (chips[name]) {
      chips[name].push(val)
    } else {
      chips[name] = [val]
    }
  }

  for (var i = 0; i < 100 && instructions.length; i++) {
    var queue = []
    instructions.forEach(line => {
      if (input.test(line)) {
        const [, val, bot] = line.match(input)
        addVal(bot, +val)
      } else if (give.test(line)) {
        const [,bot, low, high] = line.match(give)
        if (chips[bot]?.length == 2) {
          addVal(low, Math.min(...chips[bot]))
          addVal(high, Math.max(...chips[bot]))
        } else {
          queue.push(line)
        }
      }
    });
    instructions = queue
  }
  return +Object.keys(chips).find(chip => Math.max(...chips[chip]) == 61 && Math.min(...chips[chip]) == 17).split(' ')[1]
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
