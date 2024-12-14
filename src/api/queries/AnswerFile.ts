import { useMutation, UseMutationResult } from '@tanstack/react-query'
import {
  GenericResponse,
  UserTodoAnswer,
} from '../../interfaces/GrandInterface'
import { AxiosResponse } from 'axios'
import { answerFileInstance } from '../axiosConfig'

type UploadAnswerFileResponse = GenericResponse<UserTodoAnswer>

// Define the mutation function
export const useUploadFileAnswer = (
  token: string | null
): UseMutationResult<
  AxiosResponse<UploadAnswerFileResponse>,
  unknown,
  { user_todo_answer_id: string; file: File }
> => {
  return useMutation({
    mutationFn: ({ user_todo_answer_id, file }) => {
      console.log(user_todo_answer_id, file, 'test data')
      const formData = new FormData()
      formData.append('user_todo_answer_id', user_todo_answer_id)
      formData.append('answer_file_upload', file)

      console.log(formData.entries(), 'formdata')

      return answerFileInstance(token ?? '').post<UploadAnswerFileResponse>(
        '',
        formData
      )
    },
  })
}
