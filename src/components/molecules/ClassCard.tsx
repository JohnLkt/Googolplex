import { useNavigate } from 'react-router'
import ClassTeacher from '../atoms/ClassTeacher'
import ClassTitle from '../atoms/ClassTitle'
import { Class } from '../../interfaces/GrandInterface'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheck, faCopy } from '@fortawesome/free-solid-svg-icons'
import useClipboard from 'react-use-clipboard'
import { ReusableToast } from '../organisms/ReusableToast'
import { useState } from 'react'

export default function ClassCard({ ...classProp }: Class) {
  const navigate = useNavigate()
  const [isCopied, setCopied] = useClipboard(classProp.class_code)
  const [showCheck, setShowCheck] = useState(false)

  function handleNavClassDetail(classId: string) {
    navigate(`/class-detail/${classId}`, { state: classProp })
  }

  function handleCopy(e: React.MouseEvent) {
    e.stopPropagation()
    setCopied()
    ReusableToast(isCopied ? 'Copied to clipboard!' : 'Copied to clipboard!')
    setShowCheck(true)
    setTimeout(() => setShowCheck(false), 2000)
  }

  return (
    <div
      onClick={() => handleNavClassDetail(classProp.id)}
      className="z-10 cursor-pointer w-64 max-mobile:w-full h-64 rounded-xl p-4 hover:scale-105 bg-gradient-to-br from-primary from-40% to-secondary hover:shadow-secondary hover:shadow-lg transition ease-in-out"
    >
      <div className="flex flex-col h-full">
        <div className="flex flex-col space-y-2 mb-3">
          <ClassTitle subject={classProp.subject} />
          <div className="text-sm font-plusJakarta font-light text-accent line-clamp-2">
            {classProp.description}
          </div>
        </div>

        <div
          className="flex mt-6 py-5 w-fit px-2 gap-3 items-center"
          onClick={handleCopy}
        >
          <ClassTeacher teacherName={classProp.class_code} />
          <div className="relative w-6 h-6">
            <FontAwesomeIcon
              icon={faCopy}
              className={`text-secondary text-xl animate-bounce absolute transition-opacity duration-300 ${
                showCheck ? 'opacity-0' : 'opacity-100'
              }`}
            />
            <FontAwesomeIcon
              icon={faCheck}
              className={`text-secondary text-xl animate-bounce absolute transition-opacity duration-300 ${
                showCheck ? 'opacity-100' : 'opacity-0'
              }`}
            />
          </div>
        </div>
      </div>
    </div>
  )
}
