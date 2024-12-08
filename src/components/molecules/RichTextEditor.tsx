import { useFormikContext } from 'formik'
import { useEffect } from 'react'
import { useQuill } from 'react-quilljs'

interface RichTextEditorProps {
  name: string
  className: string
  label: string
}

const RichTextEditor = ({ name, className }: RichTextEditorProps) => {
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
      <div className="hover:cursor-text bg-accent rounded-md" id={name}>
        <div ref={quillRef} className={className}></div>
      </div>
    </div>
  )
}

export default RichTextEditor
