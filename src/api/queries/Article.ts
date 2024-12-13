import {
  useMutation,
  UseMutationResult,
  useQuery,
  UseQueryResult,
} from '@tanstack/react-query'
import { AxiosResponse } from 'axios'
import { articleInstance, articleInstanceById } from '../axiosConfig'
import {
  Article,
  FormCreateArticle,
  GenericResponse,
} from '../../interfaces/GrandInterface'

// reusable for all CRUD article
type ArticleResponse = GenericResponse<Article>

export const useCreateArticle = (
  token: string | null
): UseMutationResult<
  AxiosResponse<ArticleResponse>,
  unknown,
  FormCreateArticle
> => {
  return useMutation({
    mutationFn: ({ title, content }: FormCreateArticle) => {
      return articleInstance(token ?? '').post<ArticleResponse>('', {
        title,
        content,
      })
    },
  })
}

// fetch article by id
const fetchArticleById = async (token: string, articleId: string) => {
  const response = await articleInstanceById(articleId, token).get('')
  return response.data
}

export const useQueryFetchArticleById = (
  token: string | null,
  articleId: string
): UseQueryResult<ArticleResponse> => {
  return useQuery<ArticleResponse>({
    queryKey: ['getArticle', articleId],
    queryFn: () => fetchArticleById(token!, articleId),
    enabled: !!token,
  })
}
