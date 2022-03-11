import run from "aocrunner"
import MD5 from "crypto-js/md5.js"

const dirs = [['U',[0,-1]], ['D',[0,1]], ['L',[-1,0]], ['R',[1,0]]]

const part1 = (code) => {
  var min = Number.MAX_VALUE
  var shortest
  const rec = (x, y, path) => {
    if (x > 3 || x < 0 || y > 3 || y < 0 || path.length >= min) return
    if (x == 3 && y == 3) {
      min = path.length
      shortest = path
    }
    const hash = MD5(code + path).toString().slice(0,4).split('')
    for (var i = 0; i < 4; i++) {
      if (/[b-f]/.test(hash[i])) {
        const [dx, dy] = dirs[i][1]
        const dir = dirs[i][0]
        rec(x + dx, y + dy, path + dir)
      }
    }
  }
  rec(0,0, '')

  return shortest
}

const part2 = (code) => {
  var max = 0
  const rec = (x, y, path) => {
    if (x > 3 || x < 0 || y > 3 || y < 0) return
    if (x == 3 && y == 3) {
      max = Math.max(path.length, max)
      return
    }
    const hash = MD5(code + path).toString().slice(0,4).split('')
    for (var i = 0; i < 4; i++) {
      if (/[b-f]/.test(hash[i])) {
        const [dx, dy] = dirs[i][1]
        const dir = dirs[i][0]
        rec(x + dx, y + dy, path + dir)
      }
    }
  }
  rec(0,0, '')

  return max
}

run({
  part1: {
    solution: part1,
  },
  part2: {
    solution: part2,
  },
})
