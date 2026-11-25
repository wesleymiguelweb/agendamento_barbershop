import type { Appointment } from '../types/appointment'

const STORAGE_KEY = 'hairday:appointments'

export function loadAppointments(): Appointment[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return []
    const parsed = JSON.parse(raw)
    if (!Array.isArray(parsed)) return []
    return parsed.filter(
      (a): a is Appointment =>
        !!a &&
        typeof a.id === 'string' &&
        typeof a.client === 'string' &&
        typeof a.date === 'string' &&
        typeof a.time === 'string',
    )
  } catch {
    return []
  }
}

export function saveAppointments(appointments: Appointment[]): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(appointments))
  } catch {
    // ignore
  }
}