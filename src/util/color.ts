import { interpolateHcl } from 'd3-interpolate'
import { ColorCommonInstance } from 'd3-color'
import { addDays } from 'date-fns'

import {
  SeasonName,
  Season,
  getNextSeasonName,
  getSeason,
  getSeasonDay,
} from './seasons'
import { getQuarter } from './quarters'
import { getMonthDays } from './dates'

export type InterpolateColor = (
  a: string | ColorCommonInstance,
  b: string | ColorCommonInstance,
) => (ratio: number) => string

export const getDayColor = (
  season: Season,
  dayInSeason: number,
  interpolateColor: InterpolateColor = interpolateHcl,
): string => {
  const ratio = dayInSeason / (season.length - 1) // 0-1 where day sits in season
  const thisSeasonStart = getSeasonStartColor(season.name)
  const nextSeasonStart = getSeasonStartColor(getNextSeasonName(season.name))
  const interpolater = interpolateColor(thisSeasonStart, nextSeasonStart)
  return interpolater(ratio)
}

export const getDayColorForDate = (
  year: number,
  month: number,
  monthDay: number,
  interpolateColor: InterpolateColor = interpolateHcl,
): string => {
  const season = getSeason(year, month, monthDay)
  const seasonDay = getSeasonDay(season, year, month, monthDay)
  const color = getDayColor(season, seasonDay, interpolateColor)
  return color
}

export const getMonthColor = (year: number, month: number): string => {
  const monthDays = getMonthDays(year, month)
  return getRangeColor(year, month, 0, year, month, monthDays)
}

export const getSeasonColor = (
  year: number,
  month: number,
  monthDay: number,
): string => {
  const season = getSeason(year, month, monthDay)
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
  const colorStart = getDayColorForDate(startYear, startMonth, startDay)
  const colorEnd = getDayColorForDate(endYear, endMonth, endDay)
  const interpolater = interpolateHcl(colorStart, colorEnd)
  return interpolater(0.5)
}

const getSeasonStartColor = (name: SeasonName): string => {
  let h = 0
  const s = 50
  const l = 58
  switch (name) {
    case SeasonName.Spring:
      h = 150
      break
    case SeasonName.Summer:
      h = 60
      break
    case SeasonName.Autumn:
      h = 330
      break
    case SeasonName.Winter:
      h = 240
      break
  }
  return `hsl(${h}, ${s}%, ${l}%)`
}
