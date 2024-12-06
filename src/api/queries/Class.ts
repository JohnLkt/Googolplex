import { useMutation, UseMutationResult } from '@tanstack/react-query'
import { AxiosResponse } from 'axios'
import { classInstance } from '../axiosConfig'
import {
  Class,
  FormCreateClass,
  GenericResponse,
} from '../../interfaces/GrandInterface'

// reusable for all CRUD class
type ClassResponse = GenericResponse<Class>

export const useCreateClass = (
  token: string | null
): UseMutationResult<
  AxiosResponse<ClassResponse>,
  unknown,
  FormCreateClass
> => {
  return useMutation({
    mutationFn: ({ classSubject, classDesc }: FormCreateClass) => {
      return classInstance(token ?? '').post<ClassResponse>('', {
        subject: classSubject,
        description: classDesc,
      })
    },
  })
}
