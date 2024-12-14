import { useMutation, UseMutationResult } from '@tanstack/react-query'
import {
  FormCreateUserTodoAnswer,
  GenericResponse,
  UserTodoAnswer,
} from '../../interfaces/GrandInterface'
import { AxiosResponse } from 'axios'
import { userTodoAnswerInterface } from '../axiosConfig'

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
