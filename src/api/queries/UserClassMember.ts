import { useMutation, UseMutationResult } from '@tanstack/react-query'
import {
  GenericResponse,
  UserClassMember,
} from '../../interfaces/GrandInterface'
import { AxiosResponse } from 'axios'
import { userClassMemberInstance } from '../axiosConfig'

interface FormCreateUserClassMember {
  userId: string
  classId: string
  isTeacher: boolean
}

type UserClassMemberResponse = GenericResponse<UserClassMember>

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
