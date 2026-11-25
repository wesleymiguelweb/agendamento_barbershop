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
        <svg
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <polyline points="3 6 5 6 21 6" />
          <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6" />
          <path d="M10 11v6M14 11v6" />
          <path d="M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2" />
        </svg>
      </button>
    </li>
  )
}