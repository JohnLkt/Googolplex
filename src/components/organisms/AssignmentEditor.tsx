import { Formik, Form } from 'formik'
import * as Yup from 'yup'
import Input from '../molecules/Input'
import RichTextEditor from '../molecules/RichTextEditor'
import { useAuthContext } from '../../contexts/AuthContext'
import { useNavigate, useParams } from 'react-router'
import { useCreatePost } from '../../api/queries/Post'
import {
  useCreateAssignment,
  useUploadFileAssignment,
} from '../../api/queries/Assignment'

const AssignmentSchema = Yup.object().shape({
  title: Yup.string().required('Title is required'),
  content: Yup.string().required('Content is required'),
  due_date: Yup.string().required('Due date is required'),
  assignment_file_upload: Yup.mixed().required('File is required'),
})

const AssignmentEditor: React.FC = () => {
  const { authState } = useAuthContext()
  const { classId } = useParams()
  const navigate = useNavigate()

  const { mutate: createAssignment } = useCreateAssignment(
    authState.accessToken
  )
  const { mutate: createAssignmentPost } = useCreatePost(
    authState.accessToken,
    'assignment'
  )
  const { mutate: uploadFileAssignment } = useUploadFileAssignment(
    authState.accessToken
  )

  const handleSubmit = (data: {
    title: string
    content: string
    due_date: string
    assignment_file_upload: File | null
  }) => {
    console.log(data)
    createAssignment(data, {
      onSuccess: (response) => {
        console.log('success create assignment', response.data)
        console.log(response.data.data.id!, 'test')

        const assignmentId = response.data.data.id!

        uploadFileAssignment(
          {
            assignment_id: response.data.data.id!,
            file: data.assignment_file_upload!,
          },
          {
            onSuccess: (response) => {
              console.log('success upload file', response.data)

              createAssignmentPost(
                {
                  class_id: classId!,
                  assignment_id: assignmentId,
                },
                {
                  onSuccess: (response) => {
                    console.log('success create post', response.data)
                    // redir to class detail
                    navigate(`/class-detail/${classId}`)
                  },
                  onError: (err) => {
                    console.log('error create post', err)
                  },
                }
              )
            },
            onError: (err) => {
              console.log('error upload file', err)
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
        assignment_file_upload: null,
      }}
      validationSchema={AssignmentSchema}
      onSubmit={(values, { setSubmitting }) => {
        handleSubmit({
          due_date: new Date(values.due_date).toISOString(),
          assignment_file_upload: values.assignment_file_upload,
          content: values.content,
          title: values.title,
        })
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
