import {
  useMutation,
  UseMutationResult,
  useQuery,
  UseQueryResult,
} from '@tanstack/react-query'
import {
  FormCreateUserClassMember,
  FormCreateUserClassMemberByCode,
  GenericResponse,
  UserClassMember,
} from '../../interfaces/GrandInterface'
import { AxiosResponse } from 'axios'
import {
  userClassMemberByClassIdInstance,
  userClassMemberByUserIdAndClassIdInstance,
  userClassMemberInstance,
  userClassMemberInstanceByClassCode,
} from '../axiosConfig'
import { useAuthContext } from '../../contexts/AuthContext'
import { useEffect, useState } from 'react'

type UserClassMemberResponse = GenericResponse<UserClassMember>
type UserClassMemberFetchResponse = GenericResponse<UserClassMember[]>

export const useCreateUserClassMember = (
  token: string | null
): UseMutationResult<
  AxiosResponse<UserClassMemberResponse>,
  unknown,
  FormCreateUserClassMember
> => {
  return useMutation({
    mutationFn: ({ userId, classId, isTeacher }: FormCreateUserClassMember) => {
      return userClassMemberInstance(token ?? '').post<UserClassMemberResponse>(
        '',
        {
          user_id: userId,
          class_id: classId,
          is_teacher: isTeacher,
        }
      )
    },
  })
}

export const useCreateUserClassMemberByClassCode = (
  token: string | null
): UseMutationResult<
  AxiosResponse<UserClassMemberResponse>,
  unknown,
  FormCreateUserClassMemberByCode
> => {
  return useMutation({
    mutationFn: ({
      userId,
      classCode,
      isTeacher,
    }: FormCreateUserClassMemberByCode) => {
      return userClassMemberInstanceByClassCode(
        token ?? ''
      ).post<UserClassMemberResponse>('', {
        user_id: userId,
        class_code: classCode,
        is_teacher: isTeacher,
      })
    },
  })
}

// fetch all students and teachers
const fetchClassMemberByClassId = async (token: string, classId: string) => {
  const response = await userClassMemberByClassIdInstance(token, classId).get(
    ''
  )
  return response.data
}

const useQueryFetchClassMemberByClassId = (
  token: string | null,
  classId: string
): UseQueryResult<UserClassMemberFetchResponse> => {
  return useQuery<UserClassMemberFetchResponse>({
    queryKey: ['userClassMember', classId],
    queryFn: async () => {
      if (!token) {
        // throw new Error('No token provided')
        console.log('token not provided')
      }
      return fetchClassMemberByClassId(classId, token!)
    },
    enabled: !!token,
  })
}

export const useFetchClassMemberByClassId = (classId: string) => {
  const { authState } = useAuthContext()
  // console.log('access token: ', authState.accessToken)
  const { data, isLoading, isError, refetch } =
    useQueryFetchClassMemberByClassId(authState.accessToken, classId)

  const [members, setMembers] = useState<UserClassMemberFetchResponse>()

  useEffect(() => {
    if (data) {
      setMembers(data)
    }
  }, [data, authState])

  return { members, isLoading, isError, refetch }
}

// fetch all students and teachers
const fetchClassMemberByUserIdAndClassId = async (
  token: string,
  userId: string,
  classId: string
) => {
  const response = await userClassMemberByUserIdAndClassIdInstance(
    token,
    userId,
    classId
  ).get('')
  return response.data
}

const useQueryFetchClassMemberByUserIdAndClassId = (
  token: string | null,
  userId: string | null,
  classId: string
): UseQueryResult<UserClassMemberResponse> => {
  return useQuery<UserClassMemberResponse>({
    queryKey: ['UserClassMemberByUserIdAndClassId', classId, userId],
    queryFn: async () => {
      return fetchClassMemberByUserIdAndClassId(token!, userId!, classId)
    },
    enabled: !!token,
  })
}

export const useFetchClassMemberByTokenAndClassId = (classId: string) => {
  const { authState } = useAuthContext()
  const { data, isLoading, isError, refetch } =
    useQueryFetchClassMemberByUserIdAndClassId(
      authState.accessToken,
      authState.userId,
      classId
    )

  return { data: data?.data, isLoading, isError, refetch }
}
