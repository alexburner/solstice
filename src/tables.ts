import { getSeason, getSeasonDay, getDayColor } from './seasons'
import { isSameDay } from 'date-fns'
import { getMonthDays } from './dates'
import { getQuarter, getQuarterDay } from './quarters'

type TableMaker = (now: Date, dates: (Date | null)[]) => HTMLTableElement

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

export const makeDaysTable: TableMaker = (now, dates) => {
  const { table, cells } = makeElements(dates.length)
  cells.forEach((cell, i) => {
    const date = dates[i]
    if (date === null) return
    const year = date.getFullYear()
    const month = date.getMonth()
    const monthDay = date.getDate()
    const season = getSeason(year, month, monthDay)
    const seasonDay = getSeasonDay(new Date(year, month, monthDay), season)
    const color = getDayColor(season, seasonDay)

    const div = document.createElement('div')
    div.className = 'fill'
    div.style.backgroundColor = color

    if (seasonDay === 1) {
      div.appendChild(document.createTextNode('○'))
      div.style.color = '#FFFFFF99'
      div.style.fontSize = '19px'
    }

    if (isSameDay(now, date)) {
      div.appendChild(document.createTextNode('●'))
      div.style.color = '#FFFFFF99'
      div.style.fontSize = '19px'
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
    const seasonDay = getSeasonDay(new Date(year, month, monthDay), season)
    const color = getDayColor(season, seasonDay)

    const monthDays = getMonthDays(year, month)
    const weekDay = date.getDay()

    const div = document.createElement('div')
    div.className = 'fill'
    div.style.backgroundColor = color

    if (seasonDay === 1) {
      div.appendChild(document.createTextNode('○'))
      div.style.color = '#FFFFFF99'
      div.style.fontSize = '19px'
    }

    if (isSameDay(now, date)) {
      div.appendChild(document.createTextNode('●'))
      div.style.color = '#FFFFFF99'
      div.style.fontSize = '19px'
    }

    if (monthDay < 8 && i > 14) div.style.left = '1px'
    if (monthDay === monthDays && weekDay !== 6) div.style.top = '1px'

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
    const seasonDay = getSeasonDay(new Date(year, month, monthDay), season)
    const color = getDayColor(season, seasonDay)

    const weekDay = date.getDay()
    const quarter = getQuarter(year, month)
    const quarterDay = getQuarterDay(date, quarter)

    const div = document.createElement('div')
    div.className = 'fill'
    div.style.backgroundColor = color

    if (seasonDay === 1) {
      div.appendChild(document.createTextNode('○'))
      div.style.color = '#FFFFFF99'
      div.style.fontSize = '19px'
    }

    if (isSameDay(now, date)) {
      div.appendChild(document.createTextNode('●'))
      div.style.color = '#FFFFFF99'
      div.style.fontSize = '19px'
    }

    if (quarterDay < 8 && i > 14) div.style.left = '1px'
    if (quarterDay === quarter.length && weekDay !== 6) div.style.top = '1px'

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
    const seasonDay = getSeasonDay(new Date(year, month, monthDay), season)
    const color = getDayColor(season, seasonDay)

    const weekDay = date.getDay()

    const div = document.createElement('div')
    div.className = 'fill'
    div.style.backgroundColor = color

    if (seasonDay === 1) {
      div.appendChild(document.createTextNode('○'))
      div.style.color = '#FFFFFF99'
      div.style.fontSize = '19px'
    }

    if (isSameDay(now, date)) {
      div.appendChild(document.createTextNode('●'))
      div.style.color = '#FFFFFF99'
      div.style.fontSize = '19px'
    }

    if (seasonDay < 8 && i > 14) div.style.left = '1px'
    if (seasonDay === season.length && weekDay !== 6) div.style.top = '1px'

    cell.appendChild(div)
  })
  return table
}
