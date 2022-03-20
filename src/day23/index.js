import run from "aocrunner"

const re = /(.*)/
const parseLine = l => l.match(re).slice(1).map(x => +x ? +x : x)
const parseInput = rawInput => rawInput.replace(/,/g, '').split('\n')

const tgl = line => {
  const split = line.split(' ')
  if (split.length == 2) {
    const [inst, x] = split
    if (inst == 'inc') {
      return 'dec '+ x
    } else if (inst == 'dec' || inst == 'tgl') {
      return 'inc ' + x
    }
    throw 1
  } else {
    const [inst, x, y] = split
    console.log(split);

    if (inst == 'jnz') {
      return 'cpy ' + x + ' ' + y
    } else if (inst == 'cpy') {
      return 'jnz ' + x + ' ' + y
    }
    throw 1
  }
}

const execute = (reg, program) => {
  var j = 0
  var i = 0
  while (i < program.length) {
    if (++j % 1000000 == 0) {

      console.log(j, reg)
      return
    }
    const [inst, x, y] = program[i].split(' ')
    const xval = /[a-z]/.test(x) ? reg[x] : +x
    const yval = /[a-z]/.test(y) ? reg[y] : +y
    if (inst == 'cpy') {
      if (/[a-z]/.test(y))
        reg[y] = xval
    } else if (inst == 'inc') {
      if (/[a-z]/.test(x))
        reg[x] = xval + 1
    } else if (inst == 'dec') {
      if (/[a-z]/.test(x))
        reg[x] = xval - 1
    } else if (inst == 'jnz') {
      if (xval != 0) {
        i += yval
        continue
      }
    } else if (inst == 'tgl') {
      console.log(program[i]);
      console.log(i+xval);
      if (i+xval >= program.length-1 || i+xval < 0) {
        i++
        continue
      }
      program[i+xval] = tgl(program[i+xval])
    } else {
      console.log(inst);
      console.log(program[i]);
      throw 1
    }
    i++
  }
  return reg['a']
}

const part1 = (rawInput) => {
  const program = parseInput(rawInput)

  const reg = { a: 7, b: 0, c: 0, d: 0 }
  return execute(reg, program)
}

const part2 = (rawInput) => {
  const input = parseInput(rawInput)

  return
}

const part1Input = `cpy 2 a
tgl a
tgl a
tgl a
cpy 1 a
dec a
dec a`
const part2Input = part1Input
run({
  part1: {
    tests: [
      { input: part1Input, expected: 3 },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      { input: part2Input, expected: '' },
    ],
    solution: part2,
  },
  onlyTests: false,
})
