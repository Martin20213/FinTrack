import { NavLink } from 'react-router-dom'

const links = [
  { to: '/',         label: 'Kezdőlap' },
  { to: '/accounts', label: 'Számlák'   },
]

export default function Navbar() {
  return (
    <nav style={{
      background: '#122124',
      borderBottom: '1px solid #5DD1E3',
      padding: '0 2rem',
      display: 'flex',
      alignItems: 'center',
      height: 56,
      gap: '2rem',
    }}>
      <span style={{
        color: '#5DD1E3',
        fontWeight: 700,
        fontSize: 18,
        letterSpacing: '-0.5px',
        marginRight: '1rem',
      }}>
        FinTrack.
      </span>
      {links.map(link => (
        <NavLink key={link.to} to={link.to} style={({ isActive }) => ({
          color: isActive ? '#5DD1E3' : '#A4B0C5',
          textDecoration: 'none',
          fontSize: 14,
          fontWeight: isActive ? 500 : 400,
          borderBottom: isActive ? '2px solid #5DD1E3' : '2px solid transparent',
          paddingBottom: 4,
        })}>
          {link.label}
        </NavLink>
      ))}
    </nav>
  )
}