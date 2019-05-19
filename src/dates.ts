const HOURS_24_MS = 24 * 60 * 60 * 1000

/**
 * Get numbers of day in a month
 * @param month 0-11
 * @param year XXXX
 */
export const getMonthDays = (month: number, year: number): number =>
  new Date(year, month + 1, 0).getDate()

/**
 * Make an array of 365 dates
 * Note: padded with null to keep length divisible by 7
 * @param now unix time stamp of current moment
 */
export const makeYearDates = (now: Date): (Date | null)[] => {
  const year = now.getFullYear()
  const month = now.getMonth()

  // Where does current day sit within current month?
  const monthDay = now.getDate()
  const monthDays = getMonthDays(month, year)
  const ratio = monthDay / monthDays

  // Find start date for our year
  let startMonth = ratio < 0.5 ? month - 6 : month - 5
  let startYear = year
  if (startMonth < 0) {
    startMonth += 12
    startYear -= 1
  }
  const startDate = new Date(startYear, startMonth, 1, 12)
  const startTime = startDate.getTime()

  // Generate array of 365 dates
  const dates = new Array(365)
    .fill(null)
    .map((_, i) => new Date(startTime + i * HOURS_24_MS))

  // Pad array to align days with weeks
  const firstWeekDay = dates[0].getDay()
  const lastWeekDay = dates[dates.length - 1].getDay()
  dates.unshift(...new Array(firstWeekDay).fill(null))
  dates.push(...new Array(6 - lastWeekDay).fill(null))

  return dates
}
