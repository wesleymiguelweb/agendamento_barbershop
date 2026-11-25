export function Header() {
  return (
    <header className="app-header">
      <div className="logo">
        <svg
          width="28"
          height="28"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <circle cx="6" cy="6" r="3" />
          <circle cx="18" cy="6" r="3" />
          <path d="M8.5 8.5 6 21M15.5 8.5 18 21M6 21h12" />
        </svg>
        <span>HairDay</span>
      </div>
      <p className="header-subtitle">Agendamentos do salão</p>
    </header>
  )
}