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
    const start = new Date(year, 0, 0)
    const end = new Date(year, 2, getMonthDays(year, 2))
    return {
      name: QuarterName.Q1,
      start,
      length: differenceInCalendarDays(end, start),
    }
  }
  if (month >= 3 && month <= 5) {
    const start = new Date(year, 3, 0)
    const end = new Date(year, 5, getMonthDays(year, 5))
    return {
      name: QuarterName.Q2,
      start,
      length: differenceInCalendarDays(end, start),
    }
  }
  if (month >= 6 && month <= 8) {
    const start = new Date(year, 6, 0)
    const end = new Date(year, 8, getMonthDays(year, 8))
    return {
      name: QuarterName.Q3,
      start,
      length: differenceInCalendarDays(end, start),
    }
  }
  if (month >= 9 && month <= 11) {
    const start = new Date(year, 9, 0)
    const end = new Date(year, 11, getMonthDays(year, 11))
    return {
      name: QuarterName.Q4,
      start,
      length: differenceInCalendarDays(end, start),
    }
  }
  throw new Error('Invalid date provided')
}
