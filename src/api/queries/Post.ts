import { useMutation, UseMutationResult } from '@tanstack/react-query'
import { AxiosResponse } from 'axios'
import { postInstance } from '../axiosConfig'
import {
  Post,
  CreatePost,
  GenericResponse,
} from '../../interfaces/GrandInterface'

// reusable for all CRUD class
type CreatePostResponse = GenericResponse<Post>

export const useCreatePost = (
  token: string | null,
  type: string
): UseMutationResult<
  AxiosResponse<CreatePostResponse>,
  unknown,
  CreatePost
> => {
  return useMutation({
    mutationFn: ({ class_id, article_id, assignment_id }: CreatePost) => {
      if (type === 'article') {
        return postInstance(token ?? '').post<CreatePostResponse>('', {
          class_id,
          article_id,
        })
      }
      return postInstance(token ?? '').post<CreatePostResponse>('', {
        class_id,
        assignment_id,
      })
    },
  })
}
