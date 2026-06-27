import { useState } from 'react'
import type { Account, AccountType } from '../types/account'

const TYPES: AccountType[] = ['folyószámla', 'befektetés', 'készpénz', 'megtakarítás', 'egyéb']

interface Props {
  initial?: Account
  onSubmit: (data: Omit<Account, 'id'>) => void
  onCancel?: () => void
  isLoading?: boolean
}

export default function AccountForm({ initial, onSubmit, onCancel, isLoading }: Props) {
  const [name, setName]       = useState(initial?.name ?? '')
  const [type, setType]       = useState<AccountType>(initial?.type ?? 'folyószámla')
  const [balance, setBalance] = useState(initial?.balance?.toString() ?? '')
  const [note, setNote]       = useState(initial?.note ?? '')

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    onSubmit({ name, type, balance: parseFloat(balance), note: note || null })
  }

  const label: React.CSSProperties = { fontSize: 12, color: '#A4B0C5',
    marginBottom: 4, display: 'block', textTransform: 'uppercase', letterSpacing: 0.5 }

  return (
    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      <div>
        <label style={label}>Számla neve</label>
        <input value={name} onChange={e => setName(e.target.value)}
          placeholder="pl. OTP folyószámla" required />
      </div>
      <div>
        <label style={label}>Típus</label>
        <select value={type} onChange={e => setType(e.target.value as AccountType)}>
          {TYPES.map(t => <option key={t} value={t}>{t}</option>)}
        </select>
      </div>
      <div>
        <label style={label}>Aktuális egyenleg (HUF)</label>
        <input type="number" value={balance} onChange={e => setBalance(e.target.value)}
          placeholder="0" required min="0" />
      </div>
      <div>
        <label style={label}>Megjegyzés</label>
        <textarea value={note} onChange={e => setNote(e.target.value)}
          placeholder="Opcionális..." rows={2} style={{ resize: 'vertical' }} />
      </div>
      <div style={{ display: 'flex', gap: '0.5rem', justifyContent: 'flex-end' }}>
        {onCancel && (
          <button type="button" onClick={onCancel} style={{
            padding: '8px 16px', borderRadius: 6, border: '1px solid #1e3a3a',
            background: 'transparent', color: '#A4B0C5', fontSize: 14 }}>
            Mégse
          </button>
        )}
        <button type="submit" disabled={isLoading} style={{
          padding: '8px 18px', borderRadius: 6, border: 'none',
          background: '#5DD1E3', color: '#100F0F', fontWeight: 600, fontSize: 14 }}>
          {isLoading ? 'Mentés...' : initial ? 'Mentés' : 'Hozzáadás'}
        </button>
      </div>
    </form>
  )
}