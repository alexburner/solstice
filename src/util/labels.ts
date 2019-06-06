import { format } from 'date-fns'

import { getSeason } from './seasons'

type DateStr = (date: Date) => string

export const dayStr: DateStr = date => format(date, 'ddd')
export const monthStr: DateStr = date => format(date, 'MMM D')
export const quarterStr: DateStr = date => format(date, "[Q]Q'19")
export const seasonStr: DateStr = date => {
  const season = getSeason(date.getFullYear(), date.getMonth(), date.getDate())
  return season.name
}
