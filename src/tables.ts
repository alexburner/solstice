type TableMaker = (now: Date, dates: (Date | null)[]) => HTMLTableElement

const seasonMonths = new Set([3 - 1, 6 - 1, 9 - 1, 12 - 1])

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

export const makeDaysTable: TableMaker = (_now, dates) => {
  const SHIFT = 228
  const { table, cells } = makeElements(dates.length)
  let count = 0
  cells.forEach((cell, i) => {
    const date = dates[i]
    if (date === null) return
    const div = document.createElement('div')
    div.className = 'fill'
    div.style.backgroundColor = `hsl(${-360 * (count / 365) + SHIFT}, 40%, 60%)`
    cell.appendChild(div)
    count++
  })
  return table
}

export const makeMonthsTable: TableMaker = (now, dates) => {
  const nowMonth = now.getMonth()
  const nowDay = now.getDate()
  const { table, cells } = makeElements(dates.length)
  cells.forEach((cell, i) => {
    const date = dates[i]
    if (date === null) return
    // const year = date.getFullYear()
    const month = date.getMonth()
    // const monthDays = getMonthDays(month, year)
    const monthDay = date.getDate()
    // const weekDay = date.getDay()
    const div = document.createElement('div')
    div.className = 'fill'
    div.style.backgroundColor = `hsl(${-360 * (month / 12)}, 40%, 60%)`

    if (seasonMonths.has(month) && monthDay === 21) {
      div.appendChild(document.createTextNode('⦵'))
      div.style.color = '#FFFFFF99'
      div.style.fontSize = '19px'
    }

    if (month === nowMonth && monthDay === nowDay) {
      div.appendChild(document.createTextNode('⟐'))
      div.style.color = '#00000099'
      div.style.fontSize = '19px'
    }

    cell.appendChild(div)
  })
  return table
}
