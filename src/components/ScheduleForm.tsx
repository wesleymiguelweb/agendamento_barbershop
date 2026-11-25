import { useState } from 'react'
import { ALL_HOURS, getPeriodId } from '../utils/periods'
import { todayISO } from '../utils/date'
import type { Appointment } from '../types/appointment'

interface Props {
  appointments: Appointment[]
  onSchedule: (data: { client: string; date: string; time: string }) => void
}

export function ScheduleForm({ appointments, onSchedule }: Props) {
  const [client, setClient] = useState('')
  const [date, setDate] = useState(todayISO())
  const [time, setTime] = useState('')
  const [error, setError] = useState('')

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!client.trim()) {
      setError('Informe o nome do cliente.')
      return
    }
    if (!date) {
      setError('Selecione uma data.')
      return
    }
    if (!time) {
      setError('Selecione um horário.')
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
        <label htmlFor="client">Cliente</label>
        <input
          id="client"
          type="text"
          placeholder="Nome do cliente"
          value={client}
          onChange={(e) => setClient(e.target.value)}
          data-testid="client-input"
        />
      </div>

      <div className="form-group">
        <label htmlFor="date">Data</label>
        <input
          id="date"
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          data-testid="date-input"
        />
      </div>

      <div className="form-group">
        <label htmlFor="time">Horário</label>
        <select
          id="time"
          value={time}
          onChange={(e) => setTime(e.target.value)}
          data-testid="time-select"
        >
          <option value="">Selecione um horário</option>
          {ALL_HOURS.map((h) => (
            <option key={h} value={h} disabled={bookedForDate.has(h)}>
              {h} {bookedForDate.has(h) ? '(ocupado)' : ''}
            </option>
          ))}
        </select>
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