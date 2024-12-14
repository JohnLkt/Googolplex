import {
  useMutation,
  UseMutationResult,
  useQuery,
  UseQueryResult,
} from '@tanstack/react-query'
import { AxiosResponse } from 'axios'
import {
  userGetCommentByPostIdInterface,
  userPostCommentInterface,
} from '../axiosConfig'
import {
  CommentResponse,
  GenericResponse,
} from '../../interfaces/GrandInterface'
import { FormSubmitComment } from '../../components/pages/ArticleDetail'

type AddCommentResponse = GenericResponse<CommentResponse>
type ListCommentResponse = GenericResponse<CommentResponse[]>

export const useSubmitComment = (
  token: string | null
): UseMutationResult<
  AxiosResponse<AddCommentResponse>,
  unknown,
  FormSubmitComment
> => {
  return useMutation({
    mutationFn: ({ userId, postId, comment }: FormSubmitComment) => {
      return userPostCommentInterface(token ?? '').post<AddCommentResponse>(
        '',
        {
          user_id: userId,
          post_id: postId,
          comment: comment,
        }
      )
    },
  })
}

// fetch comments by post id
const fetchCommentsByPostId = async (
  token: string,
  postId: string | undefined
) => {
  if (token && postId) {
    const response = await userGetCommentByPostIdInterface(token, postId).get(
      ''
    )
    return response.data
  }
}

export const useQueryFetchCommentsByPostId = (
  token: string | null,
  postId: string | undefined
): UseQueryResult<ListCommentResponse> => {
  return useQuery<ListCommentResponse>({
    queryKey: ['getComment', postId],
    queryFn: () => fetchCommentsByPostId(token!, postId),
    enabled: !!token,
  })
}
