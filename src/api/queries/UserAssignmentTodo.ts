import { useQuery, UseQueryResult } from '@tanstack/react-query'
import {
  GenericResponse,
  UserAssignmentTodo,
} from '../../interfaces/GrandInterface'
import {
  userAssignmentTodoByUserId,
  userAssignmentTodoByUserIdAndAssignmentId,
} from '../axiosConfig'
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

// FETCH ALL TODO BY USER ID AND ASSIGNMENT ID
async function fetchManyTodoByUserIdAndAssignmentId(
  token: string,
  userId: string,
  assignmentId: string
) {
  const res = await userAssignmentTodoByUserIdAndAssignmentId(
    token,
    userId,
    assignmentId
  ).get('')
  return res.data
}
function useQueryFetchManyTodoByUserIdAndAssignmentId(
  token: string,
  userId: string,
  assignmentId: string
): UseQueryResult<OneUserAssignmentTodoResponse> {
  return useQuery<OneUserAssignmentTodoResponse>({
    queryKey: ['fetchManyTodoByUserIdAndAssignmentId', userId],
    queryFn: async () => {
      return fetchManyTodoByUserIdAndAssignmentId(token, userId, assignmentId)
    },
    enabled: !!token,
  })
}
export function useFetchManyTodoByUserIdAndAssignmentId(assignmentId: string) {
  const { authState } = useAuthContext()
  const { data, isLoading, isError, refetch } =
    useQueryFetchManyTodoByUserIdAndAssignmentId(
      authState!.accessToken!,
      authState!.userId!,
      assignmentId
    )
  const [todo, setTodo] = useState<OneUserAssignmentTodoResponse>()
  useEffect(() => {
    if (data) setTodo(data)
  }, [authState, data])
  return { todo, isLoading, isError, refetch }
}
