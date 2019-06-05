import { getSeason, getSeasonDay, SeasonName } from './seasons'
import { getDayColor, InterpolateColor } from './color'
import { isSameDay } from 'date-fns'
import { getMonthDays } from './dates'
import { getQuarter, getQuarterDay } from './quarters'

type TableMaker = (
  now: Date,
  dates: (Date | null)[],
  interpolateColor: InterpolateColor,
) => HTMLTableElement

const seasonMark = {
  [SeasonName.Winter]: /*'◓'*/ '○',
  [SeasonName.Spring]: /*'◐'*/ '○',
  [SeasonName.Summer]: /*'◒'*/ '○',
  [SeasonName.Autumn]: /*'◑'*/ '○',
}

const TODAY_MARK = '✕'
const TODAY_SIZE = '9px'
const EVENT_SIZE = '16px'
const MARK_COLOR = '#222222BB'
const BORDER_COLOR = '#33333399'
const BORDER_STYLE = `1px solid ${BORDER_COLOR}`

export const makeDaysTable: TableMaker = (now, dates, interpolateColor) => {
  const { table, cells } = makeElements(dates.length)
  cells.forEach((cell, i) => {
    const date = dates[i]
    if (date === null) return
    const year = date.getFullYear()
    const month = date.getMonth()
    const monthDay = date.getDate()
    const season = getSeason(year, month, monthDay)
    const seasonDay = getSeasonDay(season, year, month, monthDay)
    const color = getDayColor(season, seasonDay, interpolateColor)

    const div = document.createElement('div')
    div.className = 'fill'
    div.style.backgroundColor = color

    if (seasonDay === 1) {
      div.appendChild(document.createTextNode(seasonMark[season.name]))
      div.style.color = MARK_COLOR
      div.style.fontSize = EVENT_SIZE
    }

    if (isSameDay(now, date)) {
      div.appendChild(document.createTextNode(TODAY_MARK))
      div.style.color = MARK_COLOR
      div.style.fontSize = TODAY_SIZE
    }

    div.style.borderLeft = BORDER_STYLE
    div.style.borderTop = BORDER_STYLE

    cell.appendChild(div)
  })
  return table
}

export const makeMonthsTable: TableMaker = (now, dates, interpolateColor) => {
  const { table, cells } = makeElements(dates.length)
  cells.forEach((cell, i) => {
    const date = dates[i]
    if (date === null) return
    const year = date.getFullYear()
    const month = date.getMonth()
    const monthDay = date.getDate()
    const season = getSeason(year, month, monthDay)
    const seasonDay = getSeasonDay(season, year, month, monthDay)
    const color = getDayColor(season, seasonDay, interpolateColor)

    const monthDays = getMonthDays(year, month)
    const weekDay = date.getDay()

    const div = document.createElement('div')
    div.className = 'fill'
    div.style.backgroundColor = color

    if (seasonDay === 1) {
      div.appendChild(document.createTextNode(seasonMark[season.name]))
      div.style.color = MARK_COLOR
      div.style.fontSize = EVENT_SIZE
    }

    if (isSameDay(now, date)) {
      div.appendChild(document.createTextNode(TODAY_MARK))
      div.style.color = MARK_COLOR
      div.style.fontSize = TODAY_SIZE
    }

    if (monthDays - monthDay < 7) {
      div.style.borderBottom = BORDER_STYLE
    }
    if (monthDay === 1 && weekDay !== 0) {
      div.style.borderLeft = BORDER_STYLE
    }

    cell.appendChild(div)
  })
  return table
}

export const makeQuartersTable: TableMaker = (now, dates, interpolateColor) => {
  const { table, cells } = makeElements(dates.length)
  cells.forEach((cell, i) => {
    const date = dates[i]
    if (date === null) return
    const year = date.getFullYear()
    const month = date.getMonth()
    const monthDay = date.getDate()
    const season = getSeason(year, month, monthDay)
    const seasonDay = getSeasonDay(season, year, month, monthDay)
    const color = getDayColor(season, seasonDay, interpolateColor)

    const weekDay = date.getDay()
    const quarter = getQuarter(year, month)
    const quarterDay = getQuarterDay(date, quarter)

    const div = document.createElement('div')
    div.className = 'fill'
    div.style.backgroundColor = color

    if (seasonDay === 1) {
      div.appendChild(document.createTextNode(seasonMark[season.name]))
      div.style.color = MARK_COLOR
      div.style.fontSize = EVENT_SIZE
    }

    if (isSameDay(now, date)) {
      div.appendChild(document.createTextNode(TODAY_MARK))
      div.style.color = MARK_COLOR
      div.style.fontSize = TODAY_SIZE
    }

    if (quarter.length - quarterDay < 7) {
      div.style.borderBottom = BORDER_STYLE
    }
    if (quarterDay === 1 && weekDay !== 0) {
      div.style.borderLeft = BORDER_STYLE
    }

    cell.appendChild(div)
  })
  return table
}

export const makeSeasonsTable: TableMaker = (now, dates, interpolateColor) => {
  const { table, cells } = makeElements(dates.length)
  cells.forEach((cell, i) => {
    const date = dates[i]
    if (date === null) return
    const year = date.getFullYear()
    const month = date.getMonth()
    const monthDay = date.getDate()
    const season = getSeason(year, month, monthDay)
    const seasonDay = getSeasonDay(season, year, month, monthDay)
    const color = getDayColor(season, seasonDay, interpolateColor)

    const weekDay = date.getDay()

    const div = document.createElement('div')
    div.className = 'fill'
    div.style.backgroundColor = color

    if (seasonDay === 1) {
      div.appendChild(document.createTextNode(seasonMark[season.name]))
      div.style.color = MARK_COLOR
      div.style.fontSize = EVENT_SIZE
    }

    if (isSameDay(now, date)) {
      div.appendChild(document.createTextNode(TODAY_MARK))
      div.style.color = MARK_COLOR
      div.style.fontSize = TODAY_SIZE
    }

    if (season.length - seasonDay < 7) {
      div.style.borderBottom = BORDER_STYLE
    }
    if (seasonDay === 1 && weekDay !== 0) {
      div.style.borderLeft = BORDER_STYLE
    }

    cell.appendChild(div)
  })
  return table
}

export const makeYearTable: TableMaker = (now, dates, interpolateColor) => {
  const { table, cells } = makeElements(dates.length)
  cells.forEach((cell, i) => {
    const date = dates[i]
    if (date === null) return
    const year = date.getFullYear()
    const month = date.getMonth()
    const monthDay = date.getDate()
    const season = getSeason(year, month, monthDay)
    const seasonDay = getSeasonDay(season, year, month, monthDay)
    const color = getDayColor(season, seasonDay, interpolateColor)

    const div = document.createElement('div')
    div.className = 'fill'
    div.style.backgroundColor = color

    if (seasonDay === 1) {
      div.appendChild(document.createTextNode(seasonMark[season.name]))
      div.style.color = MARK_COLOR
      div.style.fontSize = EVENT_SIZE
    }

    if (isSameDay(now, date)) {
      div.appendChild(document.createTextNode(TODAY_MARK))
      div.style.color = MARK_COLOR
      div.style.fontSize = TODAY_SIZE
    }

    cell.appendChild(div)
  })
  return table
}

const makeElements = (
  dayCount: number,
): {
  table: HTMLTableElement
  cells: HTMLTableDataCellElement[]
} => {
  if (dayCount % 7) throw new Error(`${dayCount} % 7 has remainder`)
  const table = document.createElement('table')
  const rows = new Array(dayCount / 7)
    .fill(null)
    .map(() => document.createElement('tr'))
  const cells = new Array(dayCount)
    .fill(null)
    .map(() => document.createElement('td'))
  cells.forEach((cell, i) => rows[Math.floor(i / 7)].appendChild(cell))
  rows.forEach(row => table.appendChild(row))
  return { table, cells }
}
