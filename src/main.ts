import { makeYearDates } from './dates'
import {
  makeDaysTable,
  makeMonthsTable,
  makeSeasonsTable,
  makeQuartersTable,
} from './tables'
import { InterpolateColor } from './color'
import { interpolateHcl } from 'd3-interpolate'

const root = document.getElementById('root')

if (!root) throw new Error('Failed to find root element')

const now = new Date()
const dates = makeYearDates(now.getFullYear())

function makeTableSet(interpolateColor: InterpolateColor): HTMLElement {
  if (true) {
    function inner() {
      console.log('inner')
    }
    inner()
  }
  const el = document.createElement('div')
  el.appendChild(makeDaysTable(now, dates, interpolateColor))
  el.appendChild(makeMonthsTable(now, dates, interpolateColor))
  el.appendChild(makeQuartersTable(now, dates, interpolateColor))
  el.appendChild(makeSeasonsTable(now, dates, interpolateColor))
  return el
}

// root.appendChild(makeTableSet(interpolateCubehelix))
// root.appendChild(document.createElement('hr'))
root.appendChild(makeTableSet(interpolateHcl))
// root.appendChild(document.createElement('hr'))
// root.appendChild(makeTableSet(interpolateHsl))
// root.appendChild(document.createElement('hr'))
// root.appendChild(makeTableSet(interpolateRgb))

setTimeout(async () => {
  const foo = await import('./lazy')
  foo.test()
}, 1000)

const test = new Set(['test!'])
console.log(test)
