import { useFormikContext } from 'formik'
import { useEffect } from 'react'
import { useQuill } from 'react-quilljs'

interface RichTextEditorProps {
  name: string
  className: string
  label: string
}

const RichTextEditor = ({ name, className, label }: RichTextEditorProps) => {
  const { quill, quillRef } = useQuill()
  const formik = useFormikContext()

  useEffect(() => {
    if (quill) {
      quill.on('text-change', () => {
        formik.setFieldValue(name, quillRef.current.firstChild.innerHTML)
      })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [quill])

  return (
    <div className="mb-4">
      <div className="block text-sm font-medium text-primary mb-2">{label}</div>
      <div
        onClick={() => {
          quill?.focus()
        }}
        className="hover:cursor-text"
        id={name}
      >
        <div ref={quillRef} className={className}></div>
      </div>
    </div>
  )
}

export default RichTextEditor
