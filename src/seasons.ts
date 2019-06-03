import { differenceInCalendarDays } from 'date-fns'

export const enum SeasonName {
  Spring = 'Spring',
  Summer = 'Summer',
  Autumn = 'Autumn',
  Winter = 'Winter',
}

export interface Season {
  name: SeasonName
  start: Date
  length: number
}

// TODO use real date/location math
// Current dates are for 2018/19
export const getSeason = (
  year: number,
  month: number,
  monthDay: number,
): Season => {
  if (month < 2 || (month === 2 && monthDay < 20)) {
    return {
      name: SeasonName.Winter,
      start: new Date(year - 1, 11, 21),
      length: 89,
    }
  }
  if (month < 5 || (month === 5 && monthDay < 21)) {
    return {
      name: SeasonName.Spring,
      start: new Date(year, 2, 20),
      length: 93,
    }
  }
  if (month < 8 || (month === 8 && monthDay < 22)) {
    return {
      name: SeasonName.Summer,
      start: new Date(year, 5, 21),
      length: 93,
    }
  }
  if (month < 11 || (month === 11 && monthDay < 21)) {
    return {
      name: SeasonName.Autumn,
      start: new Date(year, 8, 23),
      length: 90,
    }
  }

  // Winter wraps
  if (month === 11 && monthDay >= 21) {
    return {
      name: SeasonName.Winter,
      start: new Date(year, 11, 22),
      length: 89,
    }
  }

  throw new Error('Invalid date provided')
}

export const getSeasonDay = (
  season: Season,
  year: number,
  month: number,
  monthDay: number,
): number => {
  const date = new Date(year, month, monthDay)
  return differenceInCalendarDays(date, season.start) + 1
}

export const getNextSeasonName = (name: SeasonName): SeasonName => {
  switch (name) {
    case SeasonName.Spring:
      return SeasonName.Summer
    case SeasonName.Summer:
      return SeasonName.Autumn
    case SeasonName.Autumn:
      return SeasonName.Winter
    case SeasonName.Winter:
      return SeasonName.Spring
  }
}
