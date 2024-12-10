import { useMutation, UseMutationResult } from '@tanstack/react-query'
import { AxiosResponse } from 'axios'
import { assignmentInstance } from '../axiosConfig'
import {
  Assignment,
  FormCreateAssignment,
  GenericResponse,
} from '../../interfaces/GrandInterface'

// reusable for all CRUD class
type AssignmentResponse = GenericResponse<Assignment>

export const useCreateAssignment = (
  token: string | null
): UseMutationResult<
  AxiosResponse<AssignmentResponse>,
  unknown,
  FormCreateAssignment
> => {
  return useMutation({
    mutationFn: ({ title, content, due_date }: FormCreateAssignment) => {
      return assignmentInstance(token ?? '').post<AssignmentResponse>('', {
        title,
        content,
        due_date,
      })
    },
  })
}
