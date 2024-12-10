import { Formik, Form } from 'formik'
import * as Yup from 'yup'
import Input from '../molecules/Input'
import RichTextEditor from '../molecules/RichTextEditor'
import { useAuthContext } from '../../contexts/AuthContext'
import { useParams } from 'react-router'
import { useCreatePost } from '../../api/queries/Post'
import { useCreateAssignment } from '../../api/queries/Assignment'

const AssignmentSchema = Yup.object().shape({
  title: Yup.string().required('Title is required'),
  content: Yup.string().required('Content is required'),
  due_date: Yup.string().required('Due date is required'),
})

const AssignmentEditor: React.FC = () => {
  const { authState } = useAuthContext()
  const { classId } = useParams()

  const { mutate: createAssignment } = useCreateAssignment(
    authState.accessToken
  )
  const { mutate: createAssignmentPost } = useCreatePost(
    authState.accessToken,
    'assignment'
  )

  const handleSubmit = (data: {
    title: string
    content: string
    due_date: string
  }) => {
    createAssignment(data, {
      onSuccess: (response) => {
        console.log('success create assignment', response.data)

        createAssignmentPost(
          {
            class_id: classId!,
            assignment_id: response.data.data.id,
          },
          {
            onSuccess: (response) => {
              console.log('success create post', response.data)
              // redir to class detail
            },
            onError: (err) => {
              console.log('error create post', err)
            },
          }
        )
      },
      onError: (err) => {
        console.log('error create assignment', err)
      },
    })
  }

  return (
    <Formik
      initialValues={{
        title: '',
        content: '',
        due_date: '',
        assignment_file_upload: '',
      }}
      validationSchema={AssignmentSchema}
      onSubmit={(values, { setSubmitting }) => {
        handleSubmit({ ...values })
        setSubmitting(false)
      }}
    >
      {() => (
        <Form className="bg-primary z-10 w-[48rem] p-4">
          {/* Title Input */}
          <div>
            <Input
              name="title"
              type="text"
              placeholder="Enter assignment title"
            />
          </div>

          {/* Article Content */}
          <RichTextEditor
            name="content"
            className="w-full mb-4 min-h-64"
            label="Article Content"
          />

          {/* Due Date Input */}
          <div>
            <Input
              name="due_date"
              type="datetime-local"
              placeholder="Enter assignment due date"
            />
          </div>

          <div>
            <Input
              name="assignment_file_upload"
              type="file"
              placeholder="input file"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Save Assignment
          </button>
        </Form>
      )}
    </Formik>
  )
}

export default AssignmentEditor
