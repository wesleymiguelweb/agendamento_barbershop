import { useState } from 'react'
import { PERIODS, getPeriodId } from '../utils/periods'
import { todayISO } from '../utils/date'
import type { Appointment } from '../types/appointment'

interface Props {
  appointments: Appointment[]
  onSchedule: (data: { client: string; date: string; time: string }) => void
}

function UserIcon() {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 256 256"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M208,208a8,8,0,0,1-8,8H56a8,8,0,0,1-8-8,80,80,0,0,1,45.07-72.18,48,48,0,1,1,69.86,0A80,80,0,0,1,208,208Z" />
    </svg>
  )
}

export function ScheduleForm({ appointments, onSchedule }: Props) {
  const [client, setClient] = useState('')
  const [date, setDate] = useState(todayISO())
  const [time, setTime] = useState('')
  const [error, setError] = useState('')

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!date) {
      setError('Selecione uma data.')
      return
    }
    if (!time) {
      setError('Selecione um horário.')
      return
    }
    if (!client.trim()) {
      setError('Informe o nome do cliente.')
      return
    }
    if (!getPeriodId(time)) {
      setError('Horário inválido.')
      return
    }
    const duplicate = appointments.some(
      (a) => a.date === date && a.time === time,
    )
    if (duplicate) {
      setError('Este horário já está agendado para esta data.')
      return
    }
    onSchedule({ client: client.trim(), date, time })
    setClient('')
    setTime('')
    setError('')
  }

  const bookedForDate = new Set(
    appointments.filter((a) => a.date === date).map((a) => a.time),
  )

  return (
    <form className="schedule-form" onSubmit={handleSubmit} data-testid="schedule-form">
      <div className="form-group">
        <label className="form-label">Data</label>
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          data-testid="date-input"
          className="date-input"
        />
      </div>

      <div className="form-group">
        <span className="form-label">Horários</span>
        {!date && (
          <p className="form-hint">Selecione uma data para ver os horários.</p>
        )}
        {PERIODS.map((period) => (
          <div key={period.id} className="time-period">
            <span className="time-period-label">{period.label}</span>
            <div className="time-slots">
              {period.hours.map((h) => {
                const disabled = !date || bookedForDate.has(h)
                const selected = time === h
                return (
                  <button
                    key={h}
                    type="button"
                    disabled={disabled}
                    onClick={() => setTime(h)}
                    className={`time-slot${selected ? ' time-slot--selected' : ''}${
                      disabled ? ' time-slot--disabled' : ''
                    }`}
                    data-testid="time-slot"
                    aria-pressed={selected}
                  >
                    {h}
                  </button>
                )
              })}
            </div>
          </div>
        ))}

        <select
          value={time}
          onChange={(e) => setTime(e.target.value)}
          data-testid="time-select"
          className="sr-only"
          aria-hidden="true"
          tabIndex={-1}
        >
          <option value="">Selecione um horário</option>
          {PERIODS.flatMap((p) => p.hours).map((h) => (
            <option key={h} value={h} disabled={!date || bookedForDate.has(h)}>
              {h}
            </option>
          ))}
        </select>
      </div>

      <div className="form-group">
        <label className="form-label">Cliente</label>
        <div className="client-input">
          <span className="client-input-icon">
            <UserIcon />
          </span>
          <input
            type="text"
            placeholder="Nome do cliente"
            value={client}
            onChange={(e) => setClient(e.target.value)}
            data-testid="client-input"
          />
        </div>
      </div>

      {error && (
        <p className="form-error" role="alert" data-testid="form-error">
          {error}
        </p>
      )}

      <button type="submit" className="schedule-btn" data-testid="schedule-btn">
        Agendar
      </button>
    </form>
  )
}