import { PERIODS } from '../utils/periods'
import { PeriodSection } from './PeriodSection'
import { DatePicker } from './DatePicker'
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
      <header className="agenda-header">
        <div className="agenda-heading">
          <h2>Sua agenda</h2>
          <p className="agenda-subtitle">
            Consulte os seus cortes de cabelo agendados por dia
          </p>
        </div>
        <DatePicker
          value={selectedDate}
          onChange={onDateChange}
          testId="agenda-date"
          label="Data da agenda"
        />
      </header>

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
