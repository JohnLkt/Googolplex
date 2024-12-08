import { useFormikContext } from 'formik'
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css' // Import the Quill Snow theme styles

interface RichTextEditorProps {
  name: string
  className?: string
  label?: string
}

interface FormValues {
  [key: string]: string // You can replace this with a more specific type if needed
}

const RichTextEditor = ({ name, className = '' }: RichTextEditorProps) => {
  const { values, setFieldValue } = useFormikContext<FormValues>()

  const handleChange = (content: string) => {
    setFieldValue(name, content)
  }

  const modules = {
    toolbar: [
      ['bold', 'italic', 'underline', 'strike'],
      [{ align: [] }],
      [{ list: 'ordered' }, { list: 'bullet' }],
      [{ indent: '-1' }, { indent: '+1' }],
      [{ size: ['small', false, 'large', 'huge'] }],
      [{ header: [1, 2, 3, 4, 5, 6, false] }],
      ['link', 'image', 'video'],
      [{ color: [] }, { background: [] }],
      ['clean'],
    ],
    clipboard: {
      matchVisual: false,
    },
  }

  const formats = [
    'bold',
    'italic',
    'underline',
    'strike',
    'align',
    'list',
    'indent',
    'size',
    'header',
    'link',
    'image',
    'video',
    'color',
    'background',
  ]

  return (
    <div className="mb-4 bg-accent">
      <ReactQuill
        value={values[name] || ''}
        onChange={handleChange}
        theme="snow"
        modules={modules}
        formats={formats}
        className={`hover:cursor-text ${className}`}
      />
    </div>
  )
}

export default RichTextEditor
