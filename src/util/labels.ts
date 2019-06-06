import { format } from 'date-fns'

import { getSeason } from './seasons'

type DateStr = (date: Date) => string

export const dayStr: DateStr = date => format(date, 'Do')
export const monthStr: DateStr = date => format(date, 'M|MMM')
export const quarterStr: DateStr = date => format(date, 'YY-[Q]Q')
export const seasonStr: DateStr = date => {
  const season = getSeason(date.getFullYear(), date.getMonth(), date.getDate())
  return season.name
}
