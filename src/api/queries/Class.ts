import { useMutation, UseMutationResult } from '@tanstack/react-query'
import { AxiosResponse } from 'axios'
import { classInstance } from '../axiosConfig'
import { FormCreateClass } from '../../interfaces/GrandInterface'

interface CreateClassResponse {
  status: number
  message: string
  data: {
    id: string
    class_code: string
    subject: string
    description: string
    created_at: string
    updated_at: string
  }
}

export const useCreateClass = (
  token: string | null
): UseMutationResult<
  AxiosResponse<CreateClassResponse>,
  unknown,
  FormCreateClass
> => {
  return useMutation({
    mutationFn: ({ classSubject, classDesc }: FormCreateClass) => {
      return classInstance(token ?? '').post<CreateClassResponse>('', {
        subject: classSubject,
        description: classDesc,
      })
    },
  })
}
