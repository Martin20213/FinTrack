import { useState } from 'react'
import { useAccounts, useCreateAccount, useUpdateAccount, useDeleteAccount } from '../hooks/useAccounts'
import AccountForm from '../components/AccountForm'
import type { Account } from '../types/account'

function formatHUF(amount: number): string {
  return new Intl.NumberFormat('hu-HU', {
    style: 'currency', currency: 'HUF', maximumFractionDigits: 0,
  }).format(amount)
}

const card: React.CSSProperties = {
  background: '#122124',
  border: '1px solid #1e3a3a',
  borderRadius: 10,
  padding: '1rem 1.25rem',
}

const btnPrimary: React.CSSProperties = {
  padding: '8px 18px', borderRadius: 6, border: 'none',
  background: '#5DD1E3', color: '#100F0F',
  fontWeight: 600, fontSize: 14, cursor: 'pointer',
}

const btnSecondary: React.CSSProperties = {
  padding: '6px 14px', borderRadius: 6,
  border: '1px solid #1e3a3a', background: 'transparent',
  color: '#A4B0C5', fontSize: 13, cursor: 'pointer',
}

const btnDanger: React.CSSProperties = {
  padding: '6px 14px', borderRadius: 6,
  border: '1px solid #7f1d1d', background: 'transparent',
  color: '#f87171', fontSize: 13, cursor: 'pointer',
}

export default function Accounts() {
  const { data, isLoading, isError } = useAccounts()
  const createMutation = useCreateAccount()
  const updateMutation = useUpdateAccount()
  const deleteMutation = useDeleteAccount()

  const [showForm, setShowForm] = useState(false)
  const [editing, setEditing]   = useState<Account | null>(null)

  if (isLoading) return <p style={{ padding: '2rem', color: '#A4B0C5' }}>Betöltés...</p>
  if (isError)   return <p style={{ padding: '2rem', color: '#f87171' }}>Hiba történt.</p>

  return (
    <div style={{ maxWidth: 800, margin: '0 auto', padding: '2rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
        <h1>Számlák</h1>
        <button style={btnPrimary} onClick={() => { setShowForm(true); setEditing(null) }}>
          + Új számla
        </button>
      </div>

      {(showForm && !editing) && (
        <div style={{ ...card, borderColor: '#5DD1E3', marginBottom: '1.5rem' }}>
          <h3 style={{ marginBottom: '1rem' }}>Új számla</h3>
          <AccountForm
            onSubmit={(d) => createMutation.mutate(d, { onSuccess: () => setShowForm(false) })}
            onCancel={() => setShowForm(false)}
            isLoading={createMutation.isPending}
          />
        </div>
      )}

      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
        {data!.accounts.map(account => (
          <div key={account.id}>
            {editing?.id === account.id ? (
              <div style={{ ...card, borderColor: '#5DD1E3' }}>
                <h3 style={{ marginBottom: '1rem' }}>Szerkesztés</h3>
                <AccountForm
                  initial={editing}
                  onSubmit={(d) => updateMutation.mutate(
                    { id: account.id, ...d },
                    { onSuccess: () => setEditing(null) }
                  )}
                  onCancel={() => setEditing(null)}
                  isLoading={updateMutation.isPending}
                />
              </div>
            ) : (
              <div style={{ ...card, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <div style={{ fontWeight: 500, color: '#F7FAFC' }}>{account.name}</div>
                  <div style={{ fontSize: 12, color: '#A4B0C5', marginTop: 2 }}>{account.type}</div>
                  {account.note && (
                    <div style={{ fontSize: 12, color: '#5DD1E3', marginTop: 2 }}>{account.note}</div>
                  )}
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                  <div style={{ fontWeight: 600, fontSize: 17, color: '#F7FAFC' }}>
                    {formatHUF(account.balance)}
                  </div>
                  <button style={btnSecondary} onClick={() => setEditing(account)}>Szerkesztés</button>
                  <button style={btnDanger} onClick={() => deleteMutation.mutate(account.id)}>Törlés</button>
                </div>
              </div>
            )}
          </div>
        ))}

        {data!.accounts.length === 0 && (
          <p style={{ color: '#A4B0C5', textAlign: 'center', padding: '3rem' }}>
            Még nincs számla felvéve.
          </p>
        )}
      </div>
    </div>
  )
}