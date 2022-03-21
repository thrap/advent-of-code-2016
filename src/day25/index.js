import run from "aocrunner"

const parseInput = rawInput => rawInput.split('\n')

const execute = (reg, program) => {
  var outputString = ''

  var last = 1
  var i = 0
  var seen = {}
  while (i < program.length) {
    const str = i + " " + JSON.stringify(reg)
    if (seen[str]) {
      console.log(outputString);
      throw 1
    }
    seen[str] = true
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
    } else if (inst == 'out') {
      const output = xval
      outputString += output
      if ((last == 0 && output != 1) || (last == 1 && output != 0)) {
        return outputString
      }
      last = output
    }
    i++
  }
  return reg['a']
}

const solution = (rawInput) => {
  const program = parseInput(rawInput)

  for (var a = 0; true; a++) {
    const reg = { a, b: 0, c: 0, d: 0 }

    try {
      console.log(a, ':', execute(reg, program))
    } catch (e) {
      return a
    }
  }
}

run({
  part1: {
    solution
  },
})
