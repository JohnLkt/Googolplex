import { useMutation, UseMutationResult } from '@tanstack/react-query'
import { AxiosResponse } from 'axios'
import { articleInstance } from '../axiosConfig'
import {
  Article,
  FormCreateArticle,
  GenericResponse,
} from '../../interfaces/GrandInterface'

// reusable for all CRUD class
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
