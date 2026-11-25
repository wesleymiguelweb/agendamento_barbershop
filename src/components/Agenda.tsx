import { PERIODS } from '../utils/periods'
import { PeriodSection } from './PeriodSection'
import type { Appointment } from '../types/appointment'

interface Props {
  selectedDate: string
  onDateChange: (date: string) => void
  appointments: Appointment[]
  onDelete: (id: string) => void
}

export function Agenda({ selectedDate, onDateChange, appointments, onDelete }: Props) {
  const dayAppointments = appointments.filter((a) => a.date === selectedDate)

  return (
    <div className="agenda" data-testid="agenda">
      <div className="agenda-header">
        <h2>Agenda</h2>
        <input
          type="date"
          value={selectedDate}
          onChange={(e) => onDateChange(e.target.value)}
          data-testid="agenda-date"
        />
      </div>

      <div className="periods">
        {PERIODS.map((period) => (
          <PeriodSection
            key={period.id}
            period={period}
            appointments={dayAppointments.filter(
              (a) => period.hours.includes(a.time),
            )}
            onDelete={onDelete}
          />
        ))}
      </div>
    </div>
  )
}