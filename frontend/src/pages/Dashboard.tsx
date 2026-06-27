import { useAccounts } from '../hooks/useAccounts'
import type { AccountType } from '../types/account'

function formatHUF(amount: number): string {
  return new Intl.NumberFormat('hu-HU', {
    style: 'currency', currency: 'HUF', maximumFractionDigits: 0,
  }).format(amount)
}

const TYPE_CONFIG: Record<AccountType, { label: string; color: string; bg: string }> = {
  'folyószámla':  { label: 'Folyószámlák',   color: '#5DD1E3', bg: '#122124' },
  'befektetés':   { label: 'Befektetések',   color: '#6ee7b7', bg: '#0d2420' },
  'megtakarítás': { label: 'Megtakarítások', color: '#a78bfa', bg: '#1a1230' },
  'készpénz':     { label: 'Készpénz',       color: '#fbbf24', bg: '#1f1a0e' },
  'egyéb':        { label: 'Egyéb',          color: '#A4B0C5', bg: '#1a1a1a' },
}

const card: React.CSSProperties = {
  background: '#122124',
  border: '1px solid #1e3a3a',
  borderRadius: 10,
  padding: '1rem 1.25rem',
}

export default function Dashboard() {
  const { data, isLoading, isError } = useAccounts()

  if (isLoading) return <p style={{ padding: '2rem', color: '#A4B0C5' }}>Betöltés...</p>
  if (isError)   return <p style={{ padding: '2rem', color: '#f87171' }}>Hiba történt.</p>

  const { accounts, summary } = data!
  const byType = summary.by_type

  return (
    <div style={{ maxWidth: 860, margin: '0 auto', padding: '2rem' }}>
      <h1 style={{ marginBottom: '0.25rem' }}>Vagyonösszesítő</h1>
      <p style={{ color: '#A4B0C5', marginTop: 0, marginBottom: '2rem', fontSize: 14 }}>
        {accounts.length} számla
      </p>

      {/* Teljes vagyon */}
      <div style={{ ...card, borderColor: '#5DD1E3', marginBottom: '2rem', padding: '1.5rem 2rem' }}>
        <div style={{ fontSize: 12, color: '#A4B0C5', marginBottom: 6, letterSpacing: 1, textTransform: 'uppercase' }}>
          Teljes vagyon
        </div>
        <div style={{ fontSize: 38, fontWeight: 700, color: '#5DD1E3' }}>
          {formatHUF(summary.total)}
        </div>
      </div>

      {/* Típus szerinti kártyák */}
      <h2 style={{ marginBottom: '1rem' }}>Típus szerinti bontás</h2>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))',
        gap: '0.75rem', marginBottom: '2rem' }}>
        {(Object.keys(TYPE_CONFIG) as AccountType[]).map(type => {
          const cfg  = TYPE_CONFIG[type]
          const stat = byType[type]
          if (!stat) return null
          return (
            <div key={type} style={{ ...card, background: cfg.bg, borderColor: cfg.color + '44' }}>
              <div style={{ fontSize: 11, color: cfg.color, fontWeight: 600,
                marginBottom: 8, textTransform: 'uppercase', letterSpacing: 0.8 }}>
                {cfg.label}
              </div>
              <div style={{ fontSize: 18, fontWeight: 700, color: cfg.color }}>
                {formatHUF(stat.total)}
              </div>
              <div style={{ fontSize: 12, color: '#A4B0C5', marginTop: 4 }}>
                {stat.percentage}% · {stat.count} db
              </div>
            </div>
          )
        })}
      </div>

      {/* Arány sáv */}
      <h2 style={{ marginBottom: '1rem' }}>Portfólió arányok</h2>
      <div style={{ borderRadius: 6, overflow: 'hidden', display: 'flex',
        height: 28, marginBottom: '0.75rem', background: '#1a1a1a' }}>
        {(Object.keys(TYPE_CONFIG) as AccountType[]).map(type => {
          const stat = byType[type]
          if (!stat || stat.percentage === 0) return null
          return (
            <div key={type} title={`${TYPE_CONFIG[type].label} ${stat.percentage}%`}
              style={{ width: `${stat.percentage}%`, background: TYPE_CONFIG[type].color,
                transition: 'width 0.3s ease' }} />
          )
        })}
      </div>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', marginBottom: '2.5rem' }}>
        {(Object.keys(TYPE_CONFIG) as AccountType[]).map(type => {
          const stat = byType[type]
          if (!stat) return null
          return (
            <div key={type} style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
              <div style={{ width: 8, height: 8, borderRadius: 2, background: TYPE_CONFIG[type].color }} />
              <span style={{ fontSize: 13, color: '#A4B0C5' }}>
                {TYPE_CONFIG[type].label} <span style={{ color: '#F7FAFC' }}>{stat.percentage}%</span>
              </span>
            </div>
          )
        })}
      </div>

      {/* Számlák listája */}
      <h2 style={{ marginBottom: '1rem' }}>Számlák</h2>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
        {accounts.map(account => {
          const cfg = TYPE_CONFIG[account.type]
          const pct = ((account.balance / summary.total) * 100).toFixed(1)
          return (
            <div key={account.id} style={{ ...card, display: 'flex',
              justifyContent: 'space-between', alignItems: 'center' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.875rem' }}>
                <div style={{ width: 6, height: 32, borderRadius: 3, background: cfg.color, flexShrink: 0 }} />
                <div>
                  <div style={{ fontWeight: 500, color: '#F7FAFC' }}>{account.name}</div>
                  <div style={{ fontSize: 12, color: '#A4B0C5', marginTop: 2 }}>{cfg.label}</div>
                </div>
              </div>
              <div style={{ textAlign: 'right' }}>
                <div style={{ fontWeight: 600, color: '#F7FAFC' }}>{formatHUF(account.balance)}</div>
                <div style={{ fontSize: 12, color: '#A4B0C5', marginTop: 2 }}>{pct}%</div>
              </div>
            </div>
          )
        })}
        {accounts.length === 0 && (
          <p style={{ color: '#A4B0C5', textAlign: 'center', padding: '2rem' }}>
            Még nincs számla felvéve.
          </p>
        )}
      </div>
    </div>
  )
}