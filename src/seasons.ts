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

//
// TODO: real solar landmark calculations
//

const TODO_MONTH_DAYS = {
  PrevWinter: 21,
  Spring: 20,
  Summer: 23,
  Autumn: 22,
  Winter: 22,
  NextSpring: 20,
}

const TODO_DATES = {
  PrevWinter: new Date(2018, 12 - 1, TODO_MONTH_DAYS.PrevWinter),
  Spring: new Date(2019, 3 - 1, TODO_MONTH_DAYS.Spring),
  Summer: new Date(2019, 6 - 1, TODO_MONTH_DAYS.Summer),
  Autumn: new Date(2019, 9 - 1, TODO_MONTH_DAYS.Autumn),
  Winter: new Date(2019, 12 - 1, TODO_MONTH_DAYS.Winter),
  NextSpring: new Date(2020, 3 - 1, TODO_MONTH_DAYS.NextSpring),
}

const TODO_SEASONS = (() => ({
  PrevWinter: {
    name: SeasonName.Winter,
    start: TODO_DATES.PrevWinter,
    length: differenceInCalendarDays(TODO_DATES.Spring, TODO_DATES.PrevWinter),
  },
  Spring: {
    name: SeasonName.Spring,
    start: TODO_DATES.Spring,
    length: differenceInCalendarDays(TODO_DATES.Summer, TODO_DATES.Spring),
  },
  Summer: {
    name: SeasonName.Summer,
    start: TODO_DATES.Summer,
    length: differenceInCalendarDays(TODO_DATES.Autumn, TODO_DATES.Summer),
  },
  Autumn: {
    name: SeasonName.Autumn,
    start: TODO_DATES.Autumn,
    length: differenceInCalendarDays(TODO_DATES.Winter, TODO_DATES.Autumn),
  },
  Winter: {
    name: SeasonName.Winter,
    start: TODO_DATES.Winter,
    length: differenceInCalendarDays(TODO_DATES.NextSpring, TODO_DATES.Winter),
  },
}))()

export const getSeason = (
  _year: number,
  month: number,
  monthDay: number,
): Season => {
  if (month < 2 || (month === 2 && monthDay < TODO_MONTH_DAYS.Spring)) {
    return TODO_SEASONS.PrevWinter
  }
  if (month < 5 || (month === 5 && monthDay < TODO_MONTH_DAYS.Summer)) {
    return TODO_SEASONS.Spring
  }
  if (month < 8 || (month === 8 && monthDay < TODO_MONTH_DAYS.Autumn)) {
    return TODO_SEASONS.Summer
  }
  if (month < 11 || (month === 11 && monthDay < TODO_MONTH_DAYS.Winter)) {
    return TODO_SEASONS.Autumn
  }
  if (month === 11 && monthDay >= TODO_MONTH_DAYS.NextSpring) {
    return TODO_SEASONS.Winter
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
