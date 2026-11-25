export interface Appointment {
  id: string
  client: string
  date: string // YYYY-MM-DD
  time: string // HH:mm
}

export type PeriodId = 'morning' | 'afternoon' | 'night'

export interface Period {
  id: PeriodId
  label: string
  range: string
  hours: string[]
}