import { differenceInCalendarDays } from 'date-fns'
import { march, june, september, december } from 'astronomia/src/solstice'
import { JDToCalendar } from 'astronomia/src/julian'
import { memoize } from 'lodash-es'

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

export const getSeason = (
  year: number,
  month: number,
  monthDay: number,
): Season => {
  const { days, seasons } = getYearSeasons(year)

  if (month < 2 || (month === 2 && monthDay < days.Spring)) {
    return seasons.PrevWinter
  }
  if (month < 5 || (month === 5 && monthDay < days.Summer)) {
    return seasons.Spring
  }
  if (month < 8 || (month === 8 && monthDay < days.Autumn)) {
    return seasons.Summer
  }
  if (month < 11 || (month === 11 && monthDay < days.Winter)) {
    return seasons.Autumn
  }
  if (month === 11 && monthDay >= days.NextSpring) {
    return seasons.Winter
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

const getYearSeasons = memoize((year: number) => {
  const dates = {
    PrevWinter: getSeasonDate(year - 1, december),
    Spring: getSeasonDate(year, march),
    Summer: getSeasonDate(year, june),
    Autumn: getSeasonDate(year, september),
    Winter: getSeasonDate(year, december),
    NextSpring: getSeasonDate(year + 1, march),
  }

  const days = {
    PrevWinter: dates.PrevWinter.getDate(),
    Spring: dates.Spring.getDate(),
    Summer: dates.Summer.getDate(),
    Autumn: dates.Autumn.getDate(),
    Winter: dates.Winter.getDate(),
    NextSpring: dates.NextSpring.getDate(),
  }

  const seasons = {
    PrevWinter: {
      name: SeasonName.Winter,
      start: dates.PrevWinter,
      length: differenceInCalendarDays(dates.Spring, dates.PrevWinter),
    },
    Spring: {
      name: SeasonName.Spring,
      start: dates.Spring,
      length: differenceInCalendarDays(dates.Summer, dates.Spring),
    },
    Summer: {
      name: SeasonName.Summer,
      start: dates.Summer,
      length: differenceInCalendarDays(dates.Autumn, dates.Summer),
    },
    Autumn: {
      name: SeasonName.Autumn,
      start: dates.Autumn,
      length: differenceInCalendarDays(dates.Winter, dates.Autumn),
    },
    Winter: {
      name: SeasonName.Winter,
      start: dates.Winter,
      length: differenceInCalendarDays(dates.NextSpring, dates.Winter),
    },
  }

  return { days, seasons }
})

const getSeasonDate = (
  year: number,
  yearToJD: (year: number) => number,
): Date => {
  const jd = yearToJD(year)
  const { month, day } = JDToCalendar(jd)
  return new Date(year, month - 1, Math.floor(day))
}
