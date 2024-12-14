import RichTextEditor from '../molecules/RichTextEditor'
import { Form, Formik } from 'formik'
import * as Yup from 'yup'
import Input from '../molecules/Input'
import { useAuthContext } from '../../contexts/AuthContext'
import { useParams } from 'react-router'
import { useCreateUserTodoAnswer } from '../../api/queries/UserTodoAnswer'
import { useUploadFileAnswer } from '../../api/queries/AnswerFile'
import { useFetchManyTodoByUserIdAndAssignmentId } from '../../api/queries/UserAssignmentTodo'
import { ReusableToast } from './ReusableToast'

const UserTodoAnswerSchema = Yup.object().shape({
  answer: Yup.string().required('Answer is required'),
  answer_file_upload: Yup.mixed().required('File is required'),
})

export default function CreateUserTodoAnswer() {
  const { authState } = useAuthContext()
  const { assignmentId } = useParams()
  const { mutate: createUserTodoAnswer } = useCreateUserTodoAnswer(
    authState.accessToken
  )

  const { mutate: uploadFileAnswer } = useUploadFileAnswer(
    authState.accessToken
  )

  const { todo } = useFetchManyTodoByUserIdAndAssignmentId(assignmentId!)

  const handleSubmit = (data: {
    answer: string
    answer_file_upload: File | null
  }) => {
    createUserTodoAnswer(
      { ...data, userAssignmentTodoId: todo!.data.id },
      {
        onSuccess: (response) => {
          uploadFileAnswer(
            {
              file: data.answer_file_upload!,
              user_todo_answer_id: response.data.data.id,
            },
            {
              onSuccess: (response) => {
                ReusableToast('success upload answer!')
                console.log(response)
              },
              onError: (err) => {
                console.log('error upload answer_file', err)
              },
            }
          )
        },
        onError: (err) => {
          console.log('error create user todo answer', err)
        },
      }
    )
  }

  return (
    <Formik
      initialValues={{
        answer: '',
        answer_file_upload: null,
      }}
      validationSchema={UserTodoAnswerSchema}
      onSubmit={(values, { setSubmitting }) => {
        handleSubmit(values)
        setSubmitting(false)
      }}
    >
      <Form className="bg-primary z-10 w-[48rem] p-4">
        <RichTextEditor
          name="answer"
          className="w-full mb-4 min-h-64"
          label="Article Content"
        />
        <Input name="answer_file_upload" type="file" placeholder="input file" />
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Upload Answer
        </button>
      </Form>
    </Formik>
  )
}
