import { useMutation, UseMutationResult } from '@tanstack/react-query'
import { AxiosResponse } from 'axios'
import { classInstance } from '../axiosConfig'
import {
  Class,
  FormCreateClass,
  GenericResponse,
} from '../../interfaces/GrandInterface'

type CreateClassResponse = GenericResponse<Class>

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
