import React from 'react'
import { Field, FieldProps, useFormikContext } from 'formik'

interface InputProps {
  name: string
  type: string // Input type: text, password, file, etc.
  label?: string
  placeholder?: string
  helper?: string
  onBlur?: (e: React.FocusEvent<HTMLInputElement>, value: string) => void
}

const Input: React.FC<InputProps> = ({ name, type, label, placeholder }) => {
  const { setFieldValue } = useFormikContext()

  return (
    <div className="mb-4">
      {/* Label */}
      {label && (
        <label
          htmlFor={name}
          className="block text-sm font-medium text-white mb-1" // Change label text color to white
        >
          {label}
        </label>
      )}

      {/* Input Field */}
      <Field name={name}>
        {({ field, meta }: FieldProps) => (
          <>
            {type === 'file' ? (
              // File Input
              <input
                id={name}
                type="file"
                className={`block w-full p-3 bg-white rounded-md shadow-sm border ${
                  meta.touched && meta.error
                    ? 'border-red-500 text-red-600 placeholder-red-400'
                    : 'border-gray-300 text-gray-900'
                } focus:ring-2 focus:ring-primary`}
                onChange={(e) => {
                  const file = e.target.files?.[0]
                  setFieldValue(name, file) // Set file object to Formik state
                }}
              />
            ) : (
              // Standard Input
              <input
                {...field}
                id={name}
                type={type}
                className={`block w-full p-3 rounded-md shadow-sm border ${
                  meta.touched && meta.error
                    ? 'border-red-500 text-red-600 placeholder-red-400'
                    : 'border-gray-300 text-gray-900'
                } focus:ring-2 focus:ring-primary`}
                placeholder={
                  meta.touched && meta.error
                    ? 'This is a required field'
                    : placeholder
                }
                onBlur={(e) => {
                  const finalValue = e.target.value.trim()
                  setFieldValue(name, finalValue)
                }}
              />
            )}
            {/* Validation Error or Helper Text */}
            {meta.touched && meta.error ? (
              <p className="text-red-500 text-xs mt-1">{meta.error}</p>
            ) : (
              <p className="text-gray-500 text-xs mt-1">{/* {helper} */}</p>
            )}
          </>
        )}
      </Field>
    </div>
  )
}

export default Input
