import {
  useMutation,
  UseMutationResult,
  useQuery,
  UseQueryResult,
} from '@tanstack/react-query'
import { AxiosResponse } from 'axios'
import {
  assignmentFileInstance,
  assignmentInstance,
  assignmentInstanceById,
} from '../axiosConfig'
import {
  Assignment,
  FormCreateAssignment,
  GenericResponse,
} from '../../interfaces/GrandInterface'

// reusable for all CRUD class
type AssignmentResponse = GenericResponse<Assignment>

export const useCreateAssignment = (
  token: string | null
): UseMutationResult<
  AxiosResponse<AssignmentResponse>,
  unknown,
  FormCreateAssignment
> => {
  return useMutation({
    mutationFn: ({ title, content, due_date }: FormCreateAssignment) => {
      return assignmentInstance(token ?? '').post<AssignmentResponse>('', {
        title,
        content,
        due_date,
      })
    },
  })
}

// Define the response interface
export interface ArticleResponse {
  id: string
  fieldname: string
  originalname: string
  encoding: string
  mimetype: string
  destinaiton: string
  filename: string
  path: string
  size: number
  assignment_id: string
}

type UploadAssignmentFileResponse = GenericResponse<Assignment>

// Define the mutation function
export const useUploadFileAssignment = (
  token: string | null
): UseMutationResult<
  AxiosResponse<UploadAssignmentFileResponse>,
  unknown,
  { assignment_id: string; file: File }
> => {
  return useMutation({
    mutationFn: ({ assignment_id, file }) => {
      console.log(assignment_id, file, 'test data')
      const formData = new FormData()
      formData.append('assignment_id', assignment_id)
      formData.append('assignment_file_upload', file)

      console.log(formData.entries(), 'formdata')

      return assignmentFileInstance(token ?? '').post<AssignmentResponse>(
        '',
        formData
      )
    },
  })
}

// fetch assignment by id
const fetchAssignmentById = async (token: string, assignmentId: string) => {
  const response = await assignmentInstanceById(assignmentId, token).get('')
  return response.data
}

export const useQueryFetchAssignmentById = (
  token: string | null,
  assignmentId: string
): UseQueryResult<AssignmentResponse> => {
  return useQuery<AssignmentResponse>({
    queryKey: ['getAssignment', assignmentId],
    queryFn: () => fetchAssignmentById(token!, assignmentId),
    enabled: !!token,
  })
}
