import {
  useMutation,
  UseMutationResult,
  useQuery,
  UseQueryResult,
} from '@tanstack/react-query'
import {
  FormCreateUserTodoAnswer,
  GenericResponse,
  UserTodoAnswer,
} from '../../interfaces/GrandInterface'
import { AxiosResponse } from 'axios'
import {
  assignmentAnswersInstance,
  userTodoAnswerInterface,
} from '../axiosConfig'

type OneUserTodoAnswerResponse = GenericResponse<UserTodoAnswer>
// type ManyUserTodoAnswerResponse = GenericResponse<UserTodoAnswer[]>

export const useCreateUserTodoAnswer = (
  token: string | null
): UseMutationResult<
  AxiosResponse<OneUserTodoAnswerResponse>,
  unknown,
  FormCreateUserTodoAnswer
> => {
  return useMutation({
    mutationFn: ({
      answer,
      userAssignmentTodoId,
    }: FormCreateUserTodoAnswer) => {
      return userTodoAnswerInterface(
        token ?? ''
      ).post<OneUserTodoAnswerResponse>('', {
        answer,
        user_assignment_todo_id: userAssignmentTodoId,
      })
    },
  })
}

type getTodoAnswersByAssignmentId = GenericResponse<UserTodoAnswer[]>

const fetchTodoAsnwersByAssignmentId = async (
  token: string,
  assignmentId: string
) => {
  return (await assignmentAnswersInstance(token, assignmentId).get('')).data
}

export const useGetTodoAnswersByAssignmentId = (
  token: string | null,
  assignmentId: string
): UseQueryResult<getTodoAnswersByAssignmentId> => {
  return useQuery<getTodoAnswersByAssignmentId>({
    queryKey: ['getTodoAnswersByAssignmentId', assignmentId],
    queryFn: () => {
      if (!token || !assignmentId) {
        throw new Error('Token and assignmentId must be provided')
      }
      return fetchTodoAsnwersByAssignmentId(token, assignmentId)
    },
  })
}
