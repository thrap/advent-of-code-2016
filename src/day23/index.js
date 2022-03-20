import run from "aocrunner"

const parse = input => input.replace(/,/g, '').split('\n')

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
  var i = 0
  while (i < program.length) {
    if (reg['d'] == 0 && reg['c'] == 0 && i == 9) {
      var ans = reg['a']
      for (var counter = reg['b'] - 1; counter > 1; counter--) {
        ans *= counter
      }
      return ans + 7290
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
      if (i+xval >= program.length-1 || i+xval < 0) {
        i++
        continue
      }
      program[i+xval] = tgl(program[i+xval])
    } else {
      throw 1
    }
    i++
  }
  return reg['a']
}

const part1 = (input) => execute({ a: 7, b: 0, c: 0, d: 0 }, parse(input))

const part2 = (input) => execute({ a: 12, b: 0, c: 0, d: 0 }, parse(input))

run({
  part1: {
    solution: part1,
  },
  part2: {
    solution: part2,
  },
})
