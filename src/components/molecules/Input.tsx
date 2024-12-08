import React from 'react'
import { Field, FieldProps, useFormikContext } from 'formik'
// import HelperText from '../atoms/HelperText'
// import ErrorText from '../atoms/ErrorText'

interface InputProps {
  name: string
  type: string
  label?: string
  placeholder?: string
  helper?: string
  onBlur?: (e: React.FocusEvent<HTMLInputElement>, value: string) => void
}

const Input: React.FC<InputProps> = ({
  name,
  type,
  label,
  placeholder,
  // helper,
}) => {
  const { setFieldValue } = useFormikContext()

  return (
    <div className="mb-3">
      {label && (
        <label
          htmlFor={name}
          className="block text-sm font-medium text-primary"
        >
          {label}
        </label>
      )}

      <Field name={name} className="relative">
        {({ field, meta }: FieldProps) => (
          <>
            <input
              {...field}
              id={name}
              type={type}
              className="block w-full p-3 mt-1 rounded-md border-primary shadow-sm text-base max-mobile:text-sm"
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
            {/* {meta.touched && meta.error ? (
              <ErrorText className="absolute">{meta.error}</ErrorText>
            ) : (
              <HelperText className="absolute">{helper}</HelperText>
            )} */}
          </>
        )}
      </Field>
    </div>
  )
}

export default Input
