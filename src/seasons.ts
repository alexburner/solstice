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
export const getSeason = (date: Date): Season => {
  const month = date.getMonth()
  const day = date.getDate()
  if (month < 2 || (month === 2 && day < 20)) {
    return {
      name: SeasonName.Winter,
      start: new Date(date.getFullYear() - 1, 11, 21),
      length: 89,
    }
  }
  if (month < 5 || (month === 5 && day < 21)) {
    return {
      name: SeasonName.Spring,
      start: new Date(date.getFullYear(), 2, 20),
      length: 93,
    }
  }
  if (month < 8 || (month === 8 && day < 22)) {
    return {
      name: SeasonName.Summer,
      start: new Date(date.getFullYear(), 5, 21),
      length: 93,
    }
  }
  if (month < 11 || (month === 11 && day < 21)) {
    return {
      name: SeasonName.Autumn,
      start: new Date(date.getFullYear(), 8, 22),
      length: 90,
    }
  }

  // Winter wraps
  return {
    name: SeasonName.Winter,
    start: new Date(date.getFullYear(), 11, 21),
    length: 89,
  }
}

export const getIndexInSeason = (date: Date, season: Season): number => {
  return differenceInCalendarDays(date, season.start)
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

export const getSeasonStartColor = (name: SeasonName): string => {
  let h = 0
  const s = 60
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
