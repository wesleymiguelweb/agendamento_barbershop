import { useRef } from 'react'
import { CalendarIcon, CaretDownIcon } from '@phosphor-icons/react'

interface Props {
  value: string
  onChange: (value: string) => void
  testId?: string
  inputId?: string
  label?: string
}

export function DatePicker({ value, onChange, testId, inputId, label }: Props) {
  const inputRef = useRef<HTMLInputElement>(null)

  function openPicker() {
    const input = inputRef.current
    if (!input) return
    if (typeof input.showPicker === 'function') {
      input.showPicker()
    } else {
      input.focus()
    }
  }

  return (
    <div className="date-picker" onClick={openPicker}>
      <CalendarIcon size={20} className="date-picker-icon" aria-hidden="true" />
      <input
        ref={inputRef}
        id={inputId}
        type="date"
        className="date-picker-input"
        aria-label={label}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onClick={(e) => e.stopPropagation()}
        data-testid={testId}
      />
      <CaretDownIcon size={16} className="date-picker-caret" aria-hidden="true" />
    </div>
  )
}
