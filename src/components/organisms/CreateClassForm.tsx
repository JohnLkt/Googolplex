import { SubmitHandler, useForm } from 'react-hook-form'
import { useCreateClass, useFetchClass } from '../../api/queries/Class'
import { useAuthContext } from '../../contexts/AuthContext'
import { useCreateUserClassMember } from '../../api/queries/UserClassMember'
import { FormCreateClass } from '../../interfaces/GrandInterface'
import { ReusableToast } from './ReusableToast'

interface CreateClassFormProps {
  showClassOptions: boolean
  setShowClassOptions: (e: boolean) => void
  createClassModal: boolean
  setCreateClassModal: (e: boolean) => void
}

export const CreateClassForm = ({
  showClassOptions,
  setShowClassOptions,
  createClassModal,
  setCreateClassModal,
}: CreateClassFormProps) => {
  const { authState } = useAuthContext()
  const { refetch } = useFetchClass()

  // useform
  const { register, handleSubmit } = useForm<FormCreateClass>()
  const { mutate: createClass } = useCreateClass(authState.accessToken)
  const { mutate: createUserClassMember } = useCreateUserClassMember(
    authState.accessToken
  )
  const onSubmit: SubmitHandler<FormCreateClass> = (data) => {
    console.log('data class subject: ', data.classSubject)
    console.log('data class desc: ', data.classDesc)

    createClass(data, {
      onSuccess: (response) => {
        const data = response.data
        console.log(data)
        const classId = response.data.data.id
        const userId = authState.userId

        createUserClassMember(
          { classId: classId, isTeacher: true, userId: userId! },
          {
            onSuccess: (response) => {
              const msg = response.data.message
              console.log(msg)
              refetch()
              ReusableToast('Successfully created a class')
              setShowClassOptions(!showClassOptions)
              setCreateClassModal(!createClassModal)
            },
            onError: (err) => {
              console.error('error create user class member', err)
            },
          }
        )
      },
      onError: (err) => {
        console.error('error create class', err)
      },
    })
  }
  return (
    <div className="animate-fadeModal z-20 fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 p-3 bg-accent shadow-md rounded-lg overflow-hidden">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col space-y-3 justify-center items-center"
      >
        <div className="text-lg font-bold font-plusJakarta text-primary">
          Create class
        </div>
        <input
          {...register('classSubject')}
          className="p-3 text-sm"
          type="text"
          placeholder="Class subject"
        />
        <input
          {...register('classDesc')}
          className="p-3 text-sm"
          type="text"
          placeholder="Class description"
        />
        <div className="flex flex-row space-x-3 items-center font-plusJakarta">
          <button
            type="submit"
            className="p-3 text-sm font-medium bg-primary text-accent hover:bg-opacity-80 focus:bg-white focus:text-primary"
          >
            Create
          </button>
          <button
            className="p-3 text-sm font-medium bg-secondary"
            onClick={() => {
              setCreateClassModal(!createClassModal)
              setShowClassOptions(!showClassOptions)
            }}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  )
}
