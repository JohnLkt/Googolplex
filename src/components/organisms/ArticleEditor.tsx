import React from 'react'
import { Formik, Form } from 'formik'
import * as Yup from 'yup'
import Input from '../molecules/Input'
import RichTextEditor from '../molecules/RichTextEditor'

const ArticleSchema = Yup.object().shape({
  title: Yup.string().required('Title is required'),
  content: Yup.string().required('Content is required'),
})

const ArticleEditor: React.FC = () => {
  const handleSubmit = (values: { title: string; content: string }) => {
    console.log({ ...values })
    alert('Article saved!')
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
        <Form className=" p-4 bg-white">
          {/* Title Input */}
          <div>
            <Input
              name="title"
              type="text"
              label="Title"
              placeholder="Enter article title"
            />
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
