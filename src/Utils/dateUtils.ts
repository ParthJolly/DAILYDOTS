/**
 * Format a date to a readable string
 */
export function formatDate(date: Date | string): string {
  const d = typeof date === 'string' ? new Date(date) : date
  return d.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}

/**
 * Get date string in YYYY-MM-DD format
 */
export function getDateString(date: Date = new Date()): string {
  return date.toISOString().split('T')[0]
}

/**
 * Calculate days between two dates
 */
export function daysBetween(date1: Date | string, date2: Date | string): number {
  const d1 = typeof date1 === 'string' ? new Date(date1) : date1
  const d2 = typeof date2 === 'string' ? new Date(date2) : date2
  const msPerDay = 24 * 60 * 60 * 1000
  return Math.round((d2.getTime() - d1.getTime()) / msPerDay)
}

/**
 * Check if two dates are the same day
 */
export function isSameDay(date1: Date | string, date2: Date | string): boolean {
  return getDateString(date1) === getDateString(date2)
}

/**
 * Get the start of a month
 */
export function getMonthStart(date: Date = new Date()): string {
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-01`
}

/**
 * Get the end of a month
 */
export function getMonthEnd(date: Date = new Date()): string {
  const nextMonth = new Date(date.getFullYear(), date.getMonth() + 1, 0)
  return getDateString(nextMonth)
}
