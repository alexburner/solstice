import { makeYearDates } from './dates'
import { makeDaysTable, makeMonthsTable } from './tables'

const root = document.getElementById('root')

if (!root) throw new Error('Failed to find root element')

const now = new Date()
const dates = makeYearDates(now)

root.appendChild(makeDaysTable(now, dates))
root.appendChild(makeMonthsTable(now, dates))
