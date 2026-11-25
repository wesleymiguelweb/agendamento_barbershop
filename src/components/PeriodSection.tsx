import type { Appointment, Period } from '../types/appointment'
import { AppointmentItem } from './AppointmentItem'
import { EmptyState } from './EmptyState'

interface Props {
  period: Period
  appointments: Appointment[]
  onDelete: (id: string) => void
}

export function PeriodSection({ period, appointments, onDelete }: Props) {
  const sorted = [...appointments].sort((a, b) =>
    a.time.localeCompare(b.time),
  )

  return (
    <section className="period" data-testid={`period-${period.id}`}>
      <header className="period-header">
        <h3>{period.label}</h3>
        <span className="period-range">{period.range}</span>
      </header>
      {sorted.length === 0 ? (
        <EmptyState />
      ) : (
        <ul className="appointment-list">
          {sorted.map((appt) => (
            <AppointmentItem
              key={appt.id}
              appointment={appt}
              onDelete={onDelete}
            />
          ))}
        </ul>
      )}
    </section>
  )
}