import run from "aocrunner"

const parseInput = rawInput => rawInput.replace(/,/g, '').split('\n')

const execute = (register, program) => {
  var i = 0
  var j = 0
  while (i < program.length) {
    if (++j % 100000 == 0) {
      console.log(register);
    }
    const [inst, x, y] = program[i].split(' ')
    if (inst == 'cpy') {
      register[y] = /[a-z]/.test(x) ? register[x] : +x
    } else if (inst == 'inc') {
      register[x] = register[x] + 1
    } else if (inst == 'dec') {
      register[x] = register[x] - 1
    } else if (inst == 'jnz') {
      if (register[x] != 0) {
        i += +y
        continue
      }
    }
    i++
  }
  return register['a']
}

const part1 = (rawInput) => {
  const program = parseInput(rawInput)

  const register = { a: 0, b: 0, c: 0, d: 0 }
  return execute(register, program)
}

const part2 = (rawInput) => {
  const input = parseInput(rawInput)

  return
}

run({
  part1: {
    tests: [
{ input: `cpy 41 a
inc a
inc a
dec a
jnz a 2
dec a`, expected: 42}
    ],
    solution: part1,
  },
  part2: {
    solution: part2,
  },
})
