import { interpolateHcl } from 'd3-interpolate'

import { SeasonName, Season, getNextSeasonName } from './seasons'
import { ColorCommonInstance } from 'd3-color'

export type InterpolateColor = (
  a: string | ColorCommonInstance,
  b: string | ColorCommonInstance,
) => (t: number) => string

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

const getSeasonStartColor = (name: SeasonName): string => {
  let h = 0
  const s = 55
  const l = 60
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
