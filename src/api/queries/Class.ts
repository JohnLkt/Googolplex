import {
  useMutation,
  UseMutationResult,
  useQuery,
  UseQueryResult,
} from '@tanstack/react-query'
import { AxiosResponse } from 'axios'
import { classInstance, classInstanceByUserId } from '../axiosConfig'
import {
  Class,
  FormCreateClass,
  GenericResponse,
} from '../../interfaces/GrandInterface'
import { useAuthContext } from '../../contexts/AuthContext'
import { useEffect, useState } from 'react'

// reusable for all CRUD class
type ClassResponse = GenericResponse<Class>
type ClassFetchResponse = GenericResponse<Class[]>

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

const fetchClass = async (token: string, userId: string) => {
  const response = await classInstanceByUserId(token, userId).get('')
  return response.data
}

const useQueryFetchClass = (
  token: string | null,
  userId: string
): UseQueryResult<ClassFetchResponse> => {
  return useQuery<ClassFetchResponse>({
    queryKey: ['class', userId],
    queryFn: () => fetchClass(token!, userId),
    enabled: !!token,
  })
}

export const useFetchClass = () => {
  const { authState } = useAuthContext()
  const { data, isLoading, isError, refetch } = useQueryFetchClass(
    authState.accessToken,
    authState.userId!
  )
  const [classes, setClasses] = useState<ClassFetchResponse>()

  useEffect(() => {
    if (data) {
      setClasses(data)
    }
  }, [data])

  return { classes, isLoading, isError, refetch }
}
