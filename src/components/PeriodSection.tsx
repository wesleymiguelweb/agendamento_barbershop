import {
  CloudSunIcon,
  MoonStarsIcon,
  SunHorizonIcon,
} from '@phosphor-icons/react'
import type { Appointment, Period, PeriodId } from '../types/appointment'
import { AppointmentItem } from './AppointmentItem'
import { EmptyState } from './EmptyState'

interface Props {
  period: Period
  appointments: Appointment[]
  onDelete: (id: string) => void
}

const PERIOD_ICONS = {
  morning: SunHorizonIcon,
  afternoon: CloudSunIcon,
  night: MoonStarsIcon,
} satisfies Record<PeriodId, typeof SunHorizonIcon>

export function PeriodSection({ period, appointments, onDelete }: Props) {
  const sorted = [...appointments].sort((a, b) =>
    a.time.localeCompare(b.time),
  )
  const PeriodIcon = PERIOD_ICONS[period.id]

  return (
    <section className="period" data-testid={`period-${period.id}`}>
      <header className="period-header">
        <h3 className="period-title">
          <PeriodIcon size={20} className="period-icon" aria-hidden="true" />
          {period.label}
        </h3>
        <span className="period-range">{period.range}</span>
      </header>
      <div className="period-body">
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
      </div>
    </section>
  )
}
