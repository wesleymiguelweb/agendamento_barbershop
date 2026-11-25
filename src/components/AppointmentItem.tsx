import { TrashIcon } from '@phosphor-icons/react'
import type { Appointment } from '../types/appointment'

interface Props {
  appointment: Appointment
  onDelete: (id: string) => void
}

export function AppointmentItem({ appointment, onDelete }: Props) {
  return (
    <li className="appointment-item" data-testid="appointment-item">
      <span className="appointment-time">{appointment.time}</span>
      <span className="appointment-client">{appointment.client}</span>
      <button
        type="button"
        className="delete-btn"
        aria-label={`Excluir agendamento de ${appointment.client}`}
        onClick={() => onDelete(appointment.id)}
        data-testid="delete-appointment"
      >
        <TrashIcon size={16} aria-hidden="true" />
      </button>
    </li>
  )
}
