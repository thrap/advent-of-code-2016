import run from "aocrunner"

const parseInput = rawInput => rawInput.replace(/,/g, '').split('\n')

const execute = (reg, program) => {
  var i = 0
  while (i < program.length) {
    if (reg['b'] == 0 && reg['d'] > 1) {
      if (i == 13) {
        reg = { a: reg['a'] + reg['c'], b: 0, c : reg['a'], d: reg['d'] - 1 }
        i--
        continue
      }
    }
    const [inst, x, y] = program[i].split(' ')
    if (inst == 'cpy') {
      reg[y] = /[a-z]/.test(x) ? reg[x] : +x
    } else if (inst == 'inc') {
      reg[x] = reg[x] + 1
    } else if (inst == 'dec') {
      reg[x] = reg[x] - 1
    } else if (inst == 'jnz') {
      if (reg[x] != 0) {
        i += +y
        continue
      }
    }
    i++
  }
  return reg['a']
}

const part1 = (rawInput) => {
  const program = parseInput(rawInput)

  const reg = { a: 0, b: 0, c: 0, d: 0 }
  return execute(reg, program)
}

const part2 = (rawInput) => {
  const program = parseInput(rawInput)

  const reg = { a: 0, b: 0, c: 1, d: 0 }
  return execute(reg, program)
}

run({
  part1: {
    solution: part1,
  },
  part2: {
    solution: part2,
  },
})
