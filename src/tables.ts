import { getSeason, getSeasonDay } from './seasons'
import { getDayColor } from './color'
import { isSameDay } from 'date-fns'
import { getMonthDays } from './dates'
import { getQuarter, getQuarterDay } from './quarters'

type TableMaker = (now: Date, dates: (Date | null)[]) => HTMLTableElement

const EVENT_MARK = '○'
const TODAY_MARK = '✕'
const EVENT_SIZE = '19px'
const TODAY_SIZE = '12px'
const MARK_COLOR = '#444'
const BORDER_STYLE = `1px solid ${MARK_COLOR}`

export const makeDaysTable: TableMaker = (now, dates) => {
  const { table, cells } = makeElements(dates.length)
  cells.forEach((cell, i) => {
    const date = dates[i]
    if (date === null) return
    const year = date.getFullYear()
    const month = date.getMonth()
    const monthDay = date.getDate()
    const season = getSeason(year, month, monthDay)
    const seasonDay = getSeasonDay(season, year, month, monthDay)
    const color = getDayColor(season, seasonDay)

    const weekDay = date.getDay()

    const div = document.createElement('div')
    div.className = 'fill'
    div.style.backgroundColor = color

    if (seasonDay === 1) {
      div.appendChild(document.createTextNode(EVENT_MARK))
      div.style.color = MARK_COLOR
      div.style.fontSize = EVENT_SIZE
    }

    if (isSameDay(now, date)) {
      div.appendChild(document.createTextNode(TODAY_MARK))
      div.style.color = MARK_COLOR
      div.style.fontSize = TODAY_SIZE
    }

    div.style.borderLeft = BORDER_STYLE
    if (weekDay !== 6) {
      div.style.borderTop = BORDER_STYLE
    }

    cell.appendChild(div)
  })
  return table
}

export const makeMonthsTable: TableMaker = (now, dates) => {
  const { table, cells } = makeElements(dates.length)
  cells.forEach((cell, i) => {
    const date = dates[i]
    if (date === null) return
    const year = date.getFullYear()
    const month = date.getMonth()
    const monthDay = date.getDate()
    const season = getSeason(year, month, monthDay)
    const seasonDay = getSeasonDay(season, year, month, monthDay)
    const color = getDayColor(season, seasonDay)

    const monthDays = getMonthDays(year, month)
    const weekDay = date.getDay()

    const div = document.createElement('div')
    div.className = 'fill'
    div.style.backgroundColor = color

    if (seasonDay === 1) {
      div.appendChild(document.createTextNode(EVENT_MARK))
      div.style.color = MARK_COLOR
      div.style.fontSize = EVENT_SIZE
    }

    if (isSameDay(now, date)) {
      div.appendChild(document.createTextNode(TODAY_MARK))
      div.style.color = MARK_COLOR
      div.style.fontSize = TODAY_SIZE
    }

    if (monthDay < 8) {
      div.style.borderLeft = BORDER_STYLE
    }
    if (monthDay === monthDays && weekDay !== 6) {
      div.style.borderTop = BORDER_STYLE
    }

    cell.appendChild(div)
  })
  return table
}

export const makeSeasonsTable: TableMaker = (now, dates) => {
  const { table, cells } = makeElements(dates.length)
  cells.forEach((cell, i) => {
    const date = dates[i]
    if (date === null) return
    const year = date.getFullYear()
    const month = date.getMonth()
    const monthDay = date.getDate()
    const season = getSeason(year, month, monthDay)
    const seasonDay = getSeasonDay(season, year, month, monthDay)
    const color = getDayColor(season, seasonDay)

    const weekDay = date.getDay()

    const div = document.createElement('div')
    div.className = 'fill'
    div.style.backgroundColor = color

    if (seasonDay === 1) {
      div.appendChild(document.createTextNode(EVENT_MARK))
      div.style.color = MARK_COLOR
      div.style.fontSize = EVENT_SIZE
    }

    if (isSameDay(now, date)) {
      div.appendChild(document.createTextNode(TODAY_MARK))
      div.style.color = MARK_COLOR
      div.style.fontSize = TODAY_SIZE
    }

    if (seasonDay < 8) {
      div.style.borderLeft = BORDER_STYLE
    }
    if (seasonDay === season.length && weekDay !== 6) {
      div.style.borderTop = BORDER_STYLE
    }

    cell.appendChild(div)
  })
  return table
}

export const makeQuartersTable: TableMaker = (now, dates) => {
  const { table, cells } = makeElements(dates.length)
  cells.forEach((cell, i) => {
    const date = dates[i]
    if (date === null) return
    const year = date.getFullYear()
    const month = date.getMonth()
    const monthDay = date.getDate()
    const season = getSeason(year, month, monthDay)
    const seasonDay = getSeasonDay(season, year, month, monthDay)
    const color = getDayColor(season, seasonDay)

    const weekDay = date.getDay()
    const quarter = getQuarter(year, month)
    const quarterDay = getQuarterDay(date, quarter)

    const div = document.createElement('div')
    div.className = 'fill'
    div.style.backgroundColor = color

    if (seasonDay === 1) {
      div.appendChild(document.createTextNode(EVENT_MARK))
      div.style.color = MARK_COLOR
      div.style.fontSize = EVENT_SIZE
    }

    if (isSameDay(now, date)) {
      div.appendChild(document.createTextNode(TODAY_MARK))
      div.style.color = MARK_COLOR
      div.style.fontSize = TODAY_SIZE
    }

    if (quarterDay < 8) {
      div.style.borderLeft = BORDER_STYLE
    }
    if (quarterDay === quarter.length && weekDay !== 6) {
      div.style.borderTop = BORDER_STYLE
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
  const rows = new Array(7).fill(null).map(() => document.createElement('tr'))
  const cells = new Array(dayCount)
    .fill(null)
    .map(() => document.createElement('td'))
  cells.forEach((cell, i) => rows[6 - (i % 7)].appendChild(cell))
  rows.forEach(row => table.appendChild(row))
  return { table, cells }
}
