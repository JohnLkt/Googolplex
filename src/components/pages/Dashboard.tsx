import { useAuthContext } from '../../contexts/AuthContext'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core'
import {
  faCheckSquare,
  faBars,
  faGraduationCap,
  faHome,
  faPeopleGroup,
  faPlus,
  faHomeAlt,
} from '@fortawesome/free-solid-svg-icons'
import ParticlesBackground from '../molecules/Particles'
import ClassGrid from '../organisms/ClassGrid'
import Sidebar from '../organisms/Sidebar'
import { useSidebar } from '../../hooks/useSidebar'
import { useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { FormCreateClass } from '../../interfaces/GrandInterface'
import { useCreateClass } from '../../api/queries/Class'

library.add(
  faCheckSquare,
  faBars,
  faGraduationCap,
  faHome,
  faPeopleGroup,
  faPlus,
  faHomeAlt
)

function Dashboard() {
  const { authState, LogOut } = useAuthContext()

  const { sidebarItemSelected, sidebarWiden, setSidebarWiden } = useSidebar()
  const [showProfileOptions, setShowProfileOptions] = useState(false)

  // add class, join class
  const [showClassOptions, setShowClassOptions] = useState(false)
  const [createClassModal, setCreateClassModal] = useState(false)

  // useform
  const { register, handleSubmit } = useForm<FormCreateClass>()
  const { mutate: createClass } = useCreateClass(authState.accessToken)
  const onSubmit: SubmitHandler<FormCreateClass> = (data) => {
    console.log('data class subject: ', data.classSubject)
    console.log('data class desc: ', data.classDesc)

    createClass(data, {
      onSuccess: (response) => {
        const msg = response.data.message
        console.log(msg)

        setCreateClassModal(false)
        setShowClassOptions(false)
      },
      onError: (err) => {
        console.error('error create class', err)
      },
    })
  }

  return (
    <div className="w-full h-screen overflow-hidden">
      <div className="flex flex-col bg-primary h-full">
        <div className="flex gap-3 bg-primary p-6 border-b-2 border-accent sticky top-0 z-30">
          <div className="flex-1 flex flex-row space-x-4 items-center">
            <button onClick={() => setSidebarWiden(!sidebarWiden)}>
              <FontAwesomeIcon icon="bars" className="text-accent text-xl" />
            </button>
            <div className="font-plusJakarta font-bold text-2xl text-accent">
              Googolplex
            </div>
          </div>
          <div className="flex flex-row space-x-4 items-center">
            <button
              onClick={() => {
                setShowClassOptions(!showClassOptions)
                if (showProfileOptions) setShowProfileOptions(false)
              }}
              className="w-8 h-8 rounded-full text-accent focus:text-primary border-2 border-transparent hover:border-accent focus:border-transparent focus:bg-accent hover:scale-120 transition ease-in-out"
            >
              <FontAwesomeIcon icon="plus" />
            </button>
            <button
              onClick={() => {
                setShowProfileOptions(!showProfileOptions)
                if (showClassOptions) setShowClassOptions(false)
              }}
            >
              <img
                src={authState.profilePicture || ''}
                alt={'Profile Picture'}
                width={'32px'}
                height={'32px'}
              />
            </button>
          </div>
        </div>

        <div className="h-full flex flex-row relative">
          {showProfileOptions && (
            <div className="animate-fadeIn font-plusJakarta absolute z-20 bg-white right-2 top-2 w-64 rounded-lg overflow-hidden">
              <button className="hover:bg-slate-300 p-4 text-sm font-bold w-full text-left">
                Edit Profile
              </button>
              <button
                className="hover:bg-slate-300 p-4 text-red-500 text-sm font-bold w-full text-left"
                onClick={() => {
                  LogOut()
                }}
              >
                Logout
              </button>
            </div>
          )}
          {showClassOptions && (
            <div className="animate-fadeIn font-plusJakarta absolute z-20 bg-accent right-20 top-2 w-64 rounded-lg overflow-hidden">
              <button
                onClick={() => setCreateClassModal(!createClassModal)}
                className="hover:bg-slate-300 p-4 text-sm font-bold w-full text-left"
              >
                Create class
              </button>
              <button className="hover:bg-slate-300 p-4 text-sm font-bold w-full text-left">
                Join class
              </button>
            </div>
          )}
          {createClassModal && (
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
                    className="p-3 text-sm font-medium bg-primary text-accent"
                  >
                    Create
                  </button>
                  <button
                    className="p-3 text-sm font-medium bg-secondary"
                    onClick={() => {
                      setCreateClassModal(false)
                      setShowClassOptions(false)
                    }}
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          )}
          <Sidebar />

          {/* Content Area */}
          <div
            className={`overflow-y-auto ${sidebarWiden ? 'w-4/5' : 'flex-1'} bg-primary p-6`}
          >
            <div className="flex flex-col">
              <div className="text-xl font-plusJakarta font-medium text-accent">
                Welcome, {authState!.username}
              </div>
              {sidebarItemSelected == 'Class Enrolled' ? (
                <ClassGrid classType="enrolled" />
              ) : sidebarItemSelected == 'Class Teaching' ? (
                <ClassGrid classType="teaching" />
              ) : (
                <ClassGrid classType="all" />
              )}
            </div>
          </div>
        </div>
      </div>
      <ParticlesBackground />
    </div>
  )
}

export default Dashboard
