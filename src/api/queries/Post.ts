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
import { useAuthContext } from '../../contexts/AuthContext'

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
    queryKey: ['post', postId],
    queryFn: () => postById(postId, token).get<getPostResponse>(''),
    ...options,
  })
}

const fetchPostByClassId = async (token: string, classId: string) => {
  return (await postByClassId(token, classId).get('')).data
}
const useQueryFetchPostByClassId = (
  token: string | null,
  classId: string
): UseQueryResult<getPostListResponse> => {
  return useQuery({
    queryKey: ['class', classId],
    queryFn: () => fetchPostByClassId(token!, classId),
    enabled: !!token,
  })
}
export const useFetchPostByClassId = (classId: string) => {
  const { authState } = useAuthContext()
  return useQueryFetchPostByClassId(authState.accessToken!, classId)
}
