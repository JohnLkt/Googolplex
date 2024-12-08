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
import { useEffect, useState } from 'react'
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
  const { data, isLoading, isError, refetch } = useQueryClassByClassCode(
    authState.accessToken,
    classCode
  )
  const { mutate: createUserClassMember } = useCreateUserClassMember(
    authState.accessToken
  )
  function handleClassCodeChange(classCode: string) {
    setClassCode(classCode)
  }
  const { refetch: refetchClass } = useFetchClass()

  function handleJoinClass() {
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
  }

  useEffect(() => {
    if (classCode.length > 0) {
      refetch()
      if (isLoading) {
        ReusableToast('Loading.. please wait')
      }
      if (isError) {
        ReusableToast('Class is not found')
      }
    }
  }, [classCode, isLoading, isError])

  return { handleJoinClass, handleClassCodeChange, isLoading, isError }
}
