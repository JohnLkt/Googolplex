import { SubmitHandler, useForm } from 'react-hook-form'
import { JoinClassByCode } from '../../interfaces/GrandInterface'
import { ReusableToast } from './ReusableToast'
import { useCreateUserClassMemberByClassCode } from '../../api/queries/UserClassMember'
import { useAuthContext } from '../../contexts/AuthContext'
import { useFetchClass } from '../../api/queries/Class'

interface JoinClassFormProps {
  showClassOptions: boolean
  setShowClassOptions: (e: boolean) => void
  joinClassModal: boolean
  setJoinClassModal: (e: boolean) => void
}

export default function JoinClassForm({
  joinClassModal,
  showClassOptions,
  setShowClassOptions,
  setJoinClassModal,
}: JoinClassFormProps) {
  const { authState } = useAuthContext()
  const { register, handleSubmit } = useForm<JoinClassByCode>()
  const { mutate: joinByCode } = useCreateUserClassMemberByClassCode(
    authState.accessToken
  )
  const { refetch } = useFetchClass()

  const onSubmit: SubmitHandler<JoinClassByCode> = (data) => {
    console.log('data class code: ', data.classCode)

    joinByCode(
      { classCode: data.classCode, isTeacher: false, userId: authState.userId },
      {
        onSuccess: (response) => {
          const msg = response.data
          ReusableToast(`success join class ${msg.data.class.subject}`)
          setShowClassOptions(!showClassOptions)
          setJoinClassModal(!joinClassModal)
          refetch()
        },
        onError: () => {
          ReusableToast('Error while joining class')
        },
      }
    )
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
