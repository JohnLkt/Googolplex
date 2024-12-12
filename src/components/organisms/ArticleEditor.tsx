import React from 'react'
import { Formik, Form } from 'formik'
import * as Yup from 'yup'
import Input from '../molecules/Input'
import RichTextEditor from '../molecules/RichTextEditor'
import { useCreateArticle } from '../../api/queries/Article'
import { useAuthContext } from '../../contexts/AuthContext'
import { useNavigate, useParams } from 'react-router'
import { useCreatePost } from '../../api/queries/Post'

const ArticleSchema = Yup.object().shape({
  title: Yup.string().required('Title is required'),
  content: Yup.string().required('Content is required'),
})

const ArticleEditor: React.FC = () => {
  const { authState } = useAuthContext()
  const { classId } = useParams()
  const navigate = useNavigate()
  const { mutate: createArticle } = useCreateArticle(authState.accessToken)
  const { mutate: createArticlePost } = useCreatePost(
    authState.accessToken,
    'article'
  )

  const handleSubmit = (data: { title: string; content: string }) => {
    createArticle(data, {
      onSuccess: (response) => {
        console.log('success create article', response.data)

        createArticlePost(
          {
            class_id: classId!,
            article_id: response.data.data.id,
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
        console.log('error create article', err)
      },
    })
  }

  return (
    <Formik
      initialValues={{
        title: '',
        content: '',
      }}
      validationSchema={ArticleSchema}
      onSubmit={(values, { setSubmitting }) => {
        handleSubmit({ ...values })
        setSubmitting(false)
      }}
    >
      {() => (
        <Form className="bg-primary z-10 w-[48rem] p-4">
          {/* Title Input */}
          <div>
            <Input name="title" type="text" placeholder="Enter article title" />
          </div>

          {/* Article Content */}
          <RichTextEditor
            name="content"
            className="w-full mb-4 min-h-64"
            label="Article Content"
          />

          {/* Submit Button */}
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Save Article
          </button>
        </Form>
      )}
    </Formik>
  )
}

export default ArticleEditor
