import { SubmitHandler, useForm } from 'react-hook-form'
import {
  useFetchClass,
  useHandleClassByClassCode,
} from '../../api/queries/Class'
import { JoinClassByCode } from '../../interfaces/GrandInterface'

interface JoinClassFormProps {
  showClassOptions: boolean
  setShowClassOptions: (e: boolean) => void
  joinClassModal: boolean
  setJoinClassModal: (e: boolean) => void
}

export default function JoinClassForm({
  setShowClassOptions,
  setJoinClassModal,
}: JoinClassFormProps) {
  const { register, handleSubmit } = useForm<JoinClassByCode>()
  const submit = useHandleClassByClassCode()
  const { refetch } = useFetchClass()

  const onSubmit: SubmitHandler<JoinClassByCode> = (data) => {
    // console.log('data class code: ', data.classCode)
    console.log(data)

    if (data && data.classCode.length > 0) {
      submit.handleClassCodeChange(data.classCode)
      submit.handleJoinClass()
      setShowClassOptions(false)
      setJoinClassModal(false)
      refetch()
    }
  }

  return (
    <div className="animate-fadeModal z-20 fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 p-3 bg-accent shadow-md rounded-lg overflow-hidden">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col space-y-3 justify-center items-center"
      >
        <div className="text-lg font-bold font-plusJakarta text-primary">
          Join class
        </div>
        <input
          {...register('classCode')}
          className="p-3 text-sm"
          type="text"
          placeholder="Class code"
        />
        <div className="flex flex-row space-x-3 items-center font-plusJakarta">
          <button
            type="submit"
            className="p-3 text-sm font-medium bg-primary text-accent"
          >
            Join class
          </button>
          <button
            onClick={() => {
              setJoinClassModal(false)
              setShowClassOptions(false)
            }}
            className="p-3 text-sm font-medium bg-secondary"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  )
}
