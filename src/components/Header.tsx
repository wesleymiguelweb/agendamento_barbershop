import logo from '../assets/logo.svg'

export function Header() {
  return (
    <header className="app-header">
      <img src={logo} alt="HairDay" className="logo" width={139} height={56} />
    </header>
  )
}
