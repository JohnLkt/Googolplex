import { useMutation, UseMutationResult } from '@tanstack/react-query'
import { AxiosResponse } from 'axios'
import { authInstance } from '../axiosConfig'
import {
  LoginCredentials,
  LoginResponse,
  RegisterCredentials,
  RegisterResponse,
} from '../../interfaces/GrandInterface'

export const useRegister = (): UseMutationResult<
  AxiosResponse<RegisterResponse>,
  unknown,
  RegisterCredentials
> => {
  return useMutation({
    mutationFn: ({ userName, email, password }: RegisterCredentials) => {
      return authInstance.patch<RegisterResponse>('', {
        name: userName,
        email,
        password,
      })
    },
  })
}

export const useLogin = (): UseMutationResult<
  AxiosResponse<LoginResponse>,
  unknown,
  LoginCredentials
> => {
  return useMutation({
    mutationFn: ({ email, password }: LoginCredentials) => {
      return authInstance.post<LoginResponse>('', {
        email,
        password,
      })
    },
  })
}
