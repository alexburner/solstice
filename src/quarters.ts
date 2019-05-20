import { differenceInCalendarDays } from 'date-fns'

import { getMonthDays } from './dates'

export const enum QuarterName {
  Q1 = 'Q1',
  Q2 = 'Q2',
  Q3 = 'Q3',
  Q4 = 'Q4',
}

export interface Quarter {
  name: QuarterName
  start: Date
  length: number
}

export const getQuarter = (year: number, month: number): Quarter => {
  if (month >= 0 && month <= 2) {
    const start = new Date(year, 0, 1)
    const end = new Date(year, 2, getMonthDays(year, 2))
    return {
      name: QuarterName.Q1,
      start,
      length: differenceInCalendarDays(end, start) + 1,
    }
  }
  if (month >= 3 && month <= 5) {
    const start = new Date(year, 3, 1)
    const end = new Date(year, 5, getMonthDays(year, 5))
    return {
      name: QuarterName.Q2,
      start,
      length: differenceInCalendarDays(end, start) + 1,
    }
  }
  if (month >= 6 && month <= 8) {
    const start = new Date(year, 6, 1)
    const end = new Date(year, 8, getMonthDays(year, 8))
    return {
      name: QuarterName.Q3,
      start,
      length: differenceInCalendarDays(end, start) + 1,
    }
  }
  if (month >= 9 && month <= 11) {
    const start = new Date(year, 9, 1)
    const end = new Date(year, 11, getMonthDays(year, 11))
    return {
      name: QuarterName.Q4,
      start,
      length: differenceInCalendarDays(end, start) + 1,
    }
  }
  throw new Error('Invalid date provided')
}

export const getQuarterDay = (date: Date, quarter: Quarter): number => {
  return differenceInCalendarDays(date, quarter.start) + 1
}
