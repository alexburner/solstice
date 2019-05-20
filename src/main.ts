import { makeYearDates } from './dates'
import {
  makeDaysTable,
  makeMonthsTable,
  makeSeasonsTable,
  makeQuartersTable,
} from './tables'

const root = document.getElementById('root')

if (!root) throw new Error('Failed to find root element')

const now = new Date()
const dates = makeYearDates(now)

root.appendChild(makeDaysTable(now, dates))
root.appendChild(makeMonthsTable(now, dates))
root.appendChild(makeSeasonsTable(now, dates))
root.appendChild(makeQuartersTable(now, dates))
