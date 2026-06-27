import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { fetchAccounts, createAccount, updateAccount, deleteAccount } from '../api/accounts'

export function useAccounts() {
  return useQuery({
    queryKey: ['accounts'],
    queryFn: fetchAccounts,
  })
}

export function useCreateAccount() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: createAccount,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['accounts'] }),
  })
}

export function useUpdateAccount() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: updateAccount,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['accounts'] }),
  })
}

export function useDeleteAccount() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: deleteAccount,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['accounts'] }),
  })
}

export function useAccountSummary() {
  const { data, isLoading, isError } = useAccounts()

  if (!data) return { data: undefined, isLoading, isError }

  return { data: data.summary, isLoading, isError }
}