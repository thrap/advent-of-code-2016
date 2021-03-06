import run from "aocrunner"

const screen = input => {
  const width = 50
  const height = 6
  const screen = Array(height).fill(0).map(_ => Array(width).fill(false))

  const rect = /^rect (\d+)x(\d+)$/
  const rotate = /^rotate .* (x|y)=(\d+) by (\d+)$/

  input.split('\n').forEach(op => {
    if (rect.test(op)) {
      const [wide, tall] = op.match(rect).slice(1).map(x => +x)
      for (var i = 0; i < wide; i++) {
        for (var j = 0; j < tall; j++) {
          screen[j][i] = true
        }
      }
    } else if (rotate.test(op)) {
      const [,dir, index, count] = op.match(rotate)
      if (dir == 'y') {
        const row = screen[index]
        screen[index] = row.map((_, i) => row[(width + (i - count)) % width])
      } else {
        const col = screen.map(r => r[index])
        col.forEach((x, i) => screen[(height + i + (+count)) % height][index] = x)
      }
    }
  })

  return screen
}
const part1 = (input) => screen(input).flat().filter(x => x).length

const part2 = (input) => {
  console.log(screen(input).map(l => l.map(x => x ? '█' : ' ').join('')).join('\n'))
  // By output from console.log.
  return "AFBUPZBJPS"
}

run({
  part1: {
    solution: part1,
  },
  part2: {
    solution: part2,
  },
})
