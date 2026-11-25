import type { Period, PeriodId } from '../types/appointment'

export const PERIODS: Period[] = [
  {
    id: 'morning',
    label: 'Manhã',
    range: '09h-12h',
    hours: ['09:00', '10:00', '11:00', '12:00'],
  },
  {
    id: 'afternoon',
    label: 'Tarde',
    range: '13h-18h',
    hours: ['13:00', '14:00', '15:00', '16:00', '17:00', '18:00'],
  },
  {
    id: 'night',
    label: 'Noite',
    range: '19h-21h',
    hours: ['19:00', '20:00', '21:00'],
  },
]

export const ALL_HOURS: string[] = PERIODS.flatMap((p) => p.hours)

export function getPeriodId(time: string): PeriodId | null {
  for (const period of PERIODS) {
    if (period.hours.includes(time)) return period.id
  }
  return null
}

export function formatHour(time: string): string {
  return time.replace(':', 'h')
}