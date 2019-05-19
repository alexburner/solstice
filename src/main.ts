import { makeYearDates } from './dates'
import { makeDaysTable, makeMonthsTable } from './tables'

const root = document.getElementById('root')
if (!root) throw new Error('Failed to find root element')

const now = new Date()
const adjustedNow = new Date(
  now.getFullYear() + 4,
  now.getMonth() + 6,
  now.getDate() + 0,
)
const dates = makeYearDates(adjustedNow)

root.appendChild(makeDaysTable(adjustedNow, dates))
root.appendChild(makeMonthsTable(adjustedNow, dates))
