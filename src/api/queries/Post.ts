import {
  useMutation,
  UseMutationResult,
  useQuery,
  UseQueryResult,
} from '@tanstack/react-query'
import { AxiosResponse } from 'axios'
import { postByClassId, postById, postInstance } from '../axiosConfig'
import {
  Post,
  CreatePost,
  GenericResponse,
} from '../../interfaces/GrandInterface'

// reusable for all CRUD class
type getPostResponse = GenericResponse<Post>
type getPostListResponse = GenericResponse<Post[]>

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
    queryKey: ['getPost', postId],
    queryFn: () => postById(postId, token).get<getPostResponse>(''),
    ...options,
  })
}

const fetchPostByClassId = async (token: string, classId: string) => {
  return (await postByClassId(token, classId).get('')).data
}
export const useQueryFetchPostByClassId = (
  token: string | null,
  classId: string | undefined,
  options?: object
): UseQueryResult<getPostListResponse> => {
  return useQuery<getPostListResponse>({
    queryKey: ['postByClassId', classId],
    queryFn: () => {
      if (!token || !classId) {
        throw new Error('Token and classId must be provided')
      }
      return fetchPostByClassId(token, classId)
    },
    ...options,
  })
}
