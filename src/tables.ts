import {
  getDayColor,
  getMonthColor,
  getSeasonColor,
  getQuarterColor,
} from './colors'
import { getSeason, getIndexInSeason } from './seasons'
import { isSameDay } from 'date-fns'

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
    const div = document.createElement('div')
    div.className = 'fill'
    div.style.backgroundColor = getDayColor(
      date.getFullYear(),
      date.getMonth(),
      date.getDate(),
    )

    if (
      getIndexInSeason(
        date,
        getSeason(date.getFullYear(), date.getMonth(), date.getDate()),
      ) === 0
    ) {
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
    const div = document.createElement('div')
    div.className = 'fill'
    div.style.backgroundColor = getMonthColor(
      date.getFullYear(),
      date.getMonth(),
    )

    if (
      getIndexInSeason(
        date,
        getSeason(date.getFullYear(), date.getMonth(), date.getDate()),
      ) === 0
    ) {
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

export const makeSeasonsTable: TableMaker = (now, dates) => {
  const { table, cells } = makeElements(dates.length)
  cells.forEach((cell, i) => {
    const date = dates[i]
    if (date === null) return
    const div = document.createElement('div')
    div.className = 'fill'
    div.style.backgroundColor = getSeasonColor(
      date.getFullYear(),
      date.getMonth(),
      date.getDate(),
    )

    if (
      getIndexInSeason(
        date,
        getSeason(date.getFullYear(), date.getMonth(), date.getDate()),
      ) === 0
    ) {
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

export const makeQuartersTable: TableMaker = (now, dates) => {
  const { table, cells } = makeElements(dates.length)
  cells.forEach((cell, i) => {
    const date = dates[i]
    if (date === null) return
    const div = document.createElement('div')
    div.className = 'fill'
    div.style.backgroundColor = getQuarterColor(
      date.getFullYear(),
      date.getMonth(),
    )

    if (
      getIndexInSeason(
        date,
        getSeason(date.getFullYear(), date.getMonth(), date.getDate()),
      ) === 0
    ) {
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
