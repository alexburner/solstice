import { interpolateHcl } from 'd3-interpolate'

import {
  getSeason,
  getIndexInSeason,
  getSeasonStartColor,
  getNextSeasonName,
} from './seasons'

export const getDayColor = (date: Date): string => {
  const season = getSeason(date)
  const index = getIndexInSeason(date, season)
  const percentage = index / (season.length - 1)
  const colorStart = getSeasonStartColor(season.name)
  const colorEnd = getSeasonStartColor(getNextSeasonName(season.name))
  const interpolater = interpolateHcl(colorStart, colorEnd)
  return interpolater(percentage)
}

export const getRangeColor = (start: Date, end: Date): string => {
  const colorStart = getDayColor(start)
  const colorEnd = getDayColor(end)
  const interpolater = interpolateHcl(colorStart, colorEnd)
  return interpolater(0.5)
}
