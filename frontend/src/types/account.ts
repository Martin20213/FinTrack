export type AccountType = 'folyószámla' | 'befektetés' | 'készpénz' | 'megtakarítás' | 'egyéb'

export interface Account {
  id: number
  name: string
  type: AccountType
  balance: number
  note: string | null
}

export interface TypeSummary {
  total: number
  count: number
  percentage: number
}

export interface AccountsResponse {
  accounts: Account[]
  summary: {
    total: number
    by_type: Record<AccountType, TypeSummary>
  }
}