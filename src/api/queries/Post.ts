import { useMutation, UseMutationResult, useQuery } from '@tanstack/react-query'
import { AxiosResponse } from 'axios'
import { postById, postInstance } from '../axiosConfig'
import {
  Post,
  CreatePost,
  GenericResponse,
} from '../../interfaces/GrandInterface'

// reusable for all CRUD class
type getPostResponse = GenericResponse<Post>

export const useCreatePost = (
  token: string | null,
  type: string
): UseMutationResult<AxiosResponse<getPostResponse>, unknown, CreatePost> => {
  return useMutation({
    mutationFn: ({ class_id, article_id, assignment_id }: CreatePost) => {
      if (type === 'article') {
        return postInstance(token ?? '').post<getPostResponse>('', {
          class_id,
          article_id,
        })
      }
      return postInstance(token ?? '').post<getPostResponse>('', {
        class_id,
        assignment_id,
      })
    },
  })
}

export const useGetPost = (postId: string, token: string, options?: object) => {
  return useQuery({
    queryKey: ['post', postId],
    queryFn: () => postById(postId, token).get<getPostResponse>(''),
    ...options,
  })
}
