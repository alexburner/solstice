import { interpolateHcl } from 'd3-interpolate'
import { addDays } from 'date-fns'

import {
  getSeason,
  getIndexInSeason,
  getSeasonStartColor,
  getNextSeasonName,
} from './seasons'
import { getMonthDays } from './dates'
import { getQuarter } from './quarters'

export const getDayColor = (
  year: number,
  month: number,
  day: number,
): string => {
  const season = getSeason(year, month, day)
  const index = getIndexInSeason(new Date(year, month, day), season)
  const percentage = index / (season.length - 1)
  const colorStart = getSeasonStartColor(season.name)
  const colorEnd = getSeasonStartColor(getNextSeasonName(season.name))
  const interpolater = interpolateHcl(colorStart, colorEnd)
  return interpolater(percentage)
}

export const getMonthColor = (year: number, month: number): string => {
  const monthDays = getMonthDays(year, month)
  return getRangeColor(year, month, 0, year, month, monthDays)
}

export const getSeasonColor = (
  year: number,
  month: number,
  day: number,
): string => {
  const season = getSeason(year, month, day)
  const start = season.start
  const end = addDays(season.start, season.length)
  return getRangeColor(
    start.getFullYear(),
    start.getMonth(),
    start.getDate(),
    end.getFullYear(),
    end.getMonth(),
    end.getDate(),
  )
}

export const getQuarterColor = (year: number, month: number): string => {
  const quarter = getQuarter(year, month)
  const start = quarter.start
  const end = addDays(quarter.start, quarter.length)
  return getRangeColor(
    start.getFullYear(),
    start.getMonth(),
    start.getDate(),
    end.getFullYear(),
    end.getMonth(),
    end.getDate(),
  )
}

const getRangeColor = (
  startYear: number,
  startMonth: number,
  startDay: number,
  endYear: number,
  endMonth: number,
  endDay: number,
): string => {
  const colorStart = getDayColor(startYear, startMonth, startDay)
  const colorEnd = getDayColor(endYear, endMonth, endDay)
  const interpolater = interpolateHcl(colorStart, colorEnd)
  return interpolater(0.5)
}
