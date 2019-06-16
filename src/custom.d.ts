declare module 'astronomia/src/solstice' {
  export function march(year: number): number
  export function june(year: number): number
  export function september(year: number): number
  export function december(year: number): number
}

declare module 'astronomia/src/julian' {
  export function JDToCalendar(
    jde: number,
  ): {
    year: number
    month: number
    day: number
  }
}
