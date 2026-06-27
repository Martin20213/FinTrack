import axios from 'axios'
import type { AccountsResponse, Account } from '../types/account'

const api = axios.create({
  baseURL: 'http://localhost:8000/api',
})

export const fetchAccounts = async (): Promise<AccountsResponse> => {
  const { data } = await api.get('/accounts')
  return data
}

export const createAccount = async (payload: Omit<Account, 'id'>): Promise<Account> => {
  const { data } = await api.post('/accounts', payload)
  return data
}

export const updateAccount = async ({ id, ...payload }: Account): Promise<Account> => {
  const { data } = await api.put(`/accounts/${id}`, payload)
  return data
}

export const deleteAccount = async (id: number): Promise<void> => {
  await api.delete(`/accounts/${id}`)
}