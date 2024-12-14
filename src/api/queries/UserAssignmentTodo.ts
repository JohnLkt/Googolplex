import { useQuery } from '@tanstack/react-query'
import {
  GenericResponse,
  UserAssignmentTodo,
} from '../../interfaces/GrandInterface'
import { userAssignmentTodoByUserId } from '../axiosConfig'

type OneUserAssignmentTodoResponse = GenericResponse<UserAssignmentTodo>
type ManyUserAssignmentTodoResponse = GenericResponse<UserAssignmentTodo[]>

async function fetchManyTodoByUserId(token: string, userId: string) {
  const res = await userAssignmentTodoByUserId(token, userId).get('')
  return res.data
}
function useQueryFetchManyTodoByUserId(token: string, userId: string) {
  return useQuery<ManyUserAssignmentTodoResponse>({
    queryKey: ['fetchManyTodoByUserId', userId],
  })
}
