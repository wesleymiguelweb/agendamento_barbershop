import { useEffect, useState } from 'react'
import { Header } from './components/Header'
import { ScheduleForm } from './components/ScheduleForm'
import { Agenda } from './components/Agenda'
import { todayISO } from './utils/date'
import { loadAppointments, saveAppointments } from './utils/storage'
import type { Appointment } from './types/appointment'
import './App.css'

function App() {
  const [appointments, setAppointments] = useState<Appointment[]>(() =>
    loadAppointments(),
  )
  const [selectedDate, setSelectedDate] = useState<string>(todayISO())

  useEffect(() => {
    saveAppointments(appointments)
  }, [appointments])

  function handleSchedule(data: { client: string; date: string; time: string }) {
    const newAppointment: Appointment = {
      id: crypto.randomUUID(),
      client: data.client,
      date: data.date,
      time: data.time,
    }
    setAppointments((prev) => [...prev, newAppointment])
    setSelectedDate(data.date)
  }

  function handleDelete(id: string) {
    setAppointments((prev) => prev.filter((a) => a.id !== id))
  }

  return (
    <div className="app">
      <Header />
      <main className="app-main">
        <aside className="form-panel">
          <h2 className="panel-title">Novo agendamento</h2>
          <ScheduleForm
            appointments={appointments}
            onSchedule={handleSchedule}
          />
        </aside>
        <section className="agenda-panel">
          <Agenda
            selectedDate={selectedDate}
            onDateChange={setSelectedDate}
            appointments={appointments}
            onDelete={handleDelete}
          />
        </section>
      </main>
    </div>
  )
}

export default App
