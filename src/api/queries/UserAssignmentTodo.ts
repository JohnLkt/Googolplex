import { useQuery, UseQueryResult } from '@tanstack/react-query'
import {
  GenericResponse,
  UserAssignmentTodo,
} from '../../interfaces/GrandInterface'
import { userAssignmentTodoByUserId } from '../axiosConfig'
import { useAuthContext } from '../../contexts/AuthContext'
import { useEffect, useState } from 'react'

type OneUserAssignmentTodoResponse = GenericResponse<UserAssignmentTodo>
type ManyUserAssignmentTodoResponse = GenericResponse<UserAssignmentTodo[]>

// FETCH ALL TODO BY USER ID
async function fetchManyTodoByUserId(token: string, userId: string) {
  const res = await userAssignmentTodoByUserId(token, userId).get('')
  return res.data
}
function useQueryFetchManyTodoByUserId(
  token: string,
  userId: string
): UseQueryResult<ManyUserAssignmentTodoResponse> {
  return useQuery<ManyUserAssignmentTodoResponse>({
    queryKey: ['fetchManyTodoByUserId', userId],
    queryFn: async () => {
      return fetchManyTodoByUserId(token, userId)
    },
    enabled: !!token,
  })
}
export function useFetchManyTodoByUserId() {
  const { authState } = useAuthContext()
  const { data, isLoading, isError, refetch } = useQueryFetchManyTodoByUserId(
    authState!.accessToken!,
    authState!.userId!
  )
  const [todo, setTodo] = useState<ManyUserAssignmentTodoResponse>()
  useEffect(() => {
    if (data) setTodo(data)
  }, [authState, data])
  return { todo, isLoading, isError, refetch }
}
