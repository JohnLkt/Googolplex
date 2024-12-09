import {
  useMutation,
  UseMutationResult,
  useQuery,
  UseQueryResult,
} from '@tanstack/react-query'
import { AxiosResponse } from 'axios'
import {
  classInstance,
  classInstanceByClassCode,
  classInstanceByUserId,
} from '../axiosConfig'
import {
  Class,
  FormCreateClass,
  GenericResponse,
} from '../../interfaces/GrandInterface'
import { useAuthContext } from '../../contexts/AuthContext'
import { useCallback, useEffect, useState } from 'react'
import { ReusableToast } from '../../components/organisms/ReusableToast'
import { useCreateUserClassMember } from './UserClassMember'

type ClassResponse = GenericResponse<Class> // usable for create class, join class by code
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

// join class by class code

export const fetchClassByClassCode = async (
  token: string | null,
  classCode: string
) => {
  const response = await classInstanceByClassCode(token!, classCode).get('')
  return response.data
}

export const useQueryClassByClassCode = (
  token: string | null,
  classCode: string
): UseQueryResult<ClassResponse> => {
  return useQuery<ClassResponse>({
    queryKey: ['class', classCode],
    queryFn: () => fetchClassByClassCode(token!, classCode),
    enabled: !!token,
  })
}

export const findClassByClassCode = (
  token: string | null,
  classCode: string
) => {
  console.log('token: ', token)
  console.log('class code: ', classCode)
}

export function useHandleClassByClassCode() {
  const { authState } = useAuthContext()
  const [classCode, setClassCode] = useState('')
  const { data, isLoading, isError } = useQueryClassByClassCode(
    authState.accessToken,
    classCode
  )
  const { mutate: createUserClassMember } = useCreateUserClassMember(
    authState.accessToken
  )
  const { refetch: refetchClass } = useFetchClass()

  const handleJoinClass = useCallback(() => {
    createUserClassMember(
      { classId: data!.data.id, isTeacher: false, userId: authState.userId! },
      {
        onSuccess: (response) => {
          const msg = response.data.message
          console.log(msg)
          ReusableToast('You successfully joined a class')
          refetchClass()
        },
        onError: (err) => {
          console.error('error create user class member', err)
          ReusableToast('Error joining a class')
        },
      }
    )
  }, [createUserClassMember, data, authState.userId, refetchClass]) // Add all dependencies used in the function

  useEffect(() => {
    if (classCode.length > 0) {
      if (isLoading) {
        console.log('still loading')
        ReusableToast('Searching for class.. please wait')
      } else if (isError) {
        console.log('query not found error', data?.message)
        ReusableToast('Class is not found')
      } else {
        console.log('class code query found!', data?.message)
        handleJoinClass()
      }
    }
  }, [classCode, data, isLoading, isError, handleJoinClass])

  return {
    data,
    setClassCode,
    handleJoinClass,
  }
}
