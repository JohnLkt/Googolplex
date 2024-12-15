import { useNavigate, useParams } from 'react-router'
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
  faTasks,
  faArrowLeft,
  faMinus,
} from '@fortawesome/free-solid-svg-icons'
import AuthTeacherWrapper from '../molecules/AuthTeacherWrapper'
import { useQueryClassByClassId } from '../../api/queries/Class'
import { useQueryFetchAssignmentById } from '../../api/queries/Assignment'
import { useGetTodoAnswersByAssignmentId } from '../../api/queries/UserTodoAnswer'
import { Form, Formik } from 'formik'
import { UserAssignmentTodoUpdate } from '../../interfaces/GrandInterface'
import { useUserAssignmentTodoUpdate } from '../../api/queries/UserAssignmentTodo'

library.add(
  faCheckSquare,
  faBars,
  faGraduationCap,
  faHome,
  faPeopleGroup,
  faPlus,
  faHomeAlt,
  faTasks,
  faArrowLeft,
  faMinus
)

export const GradeAssignment = () => {
  const { authState } = useAuthContext()
  const { classId, assignmentId } = useParams()
  const navigate = useNavigate()

  const { data: classData } = useQueryClassByClassId(
    authState.accessToken,
    classId,
    { enabled: !!authState.accessToken && !!classId }
  )
  const { data: assignment, isLoading } = useQueryFetchAssignmentById(
    authState.accessToken,
    assignmentId!
  )

  const { data: answersData, refetch } = useGetTodoAnswersByAssignmentId(
    authState.accessToken,
    assignmentId!
  )

  const { mutate: updateTodoAnswer } = useUserAssignmentTodoUpdate()

  const answers = answersData?.data

  console.log(answers, 'answers')

  return (
    <AuthTeacherWrapper>
      <div className="w-full min-h-screen bg-primary overflow-hidden">
        <div className="flex flex-col h-full space-y-3">
          <div className="flex gap-3 bg-primary p-6 border-b-2 border-accent sticky top-0 z-30">
            <div className="flex-1 flex flex-row space-x-4 items-center">
              <button onClick={() => navigate(`/class-detail/${classId}`)}>
                <FontAwesomeIcon
                  icon="arrow-left"
                  className="text-accent text-xl"
                />
              </button>
              <div
                onClick={() => navigate('/dashboard')}
                className="font-plusJakarta line-clamp-1 text-ellipsis max-mobile:text-lg font-bold text-2xl text-accent"
              >
                Googolplex
              </div>
              <FontAwesomeIcon
                className="text-2xl text-accent font-bold max-mobile:hidden max-tablet:hidden"
                icon="minus"
              />
              <div className="font-plusJakarta text-2xl text-accent font-medium max-mobile:hidden max-tablet:hidden">
                {classData?.data.subject}
              </div>
              <FontAwesomeIcon
                className="text-2xl text-accent font-bold max-mobile:hidden max-tablet:hidden"
                icon="minus"
              />
              <div className="font-plusJakarta text-2xl text-accent font-medium max-mobile:hidden max-tablet:hidden">
                {!isLoading && assignment?.data.title}
              </div>
            </div>
          </div>
          <div className="flex flex-col space-y-3 justify-center items-center font-plusJakarta px-3">
            <p className="text-2xl font-plusJakarta text-accent">
              Submissions to be graded:{' '}
            </p>
            {answers?.map((answer, index) => (
              <div
                className="w-1/2 max-mobile:w-full p-4 border-2 border-accent overflow-y-auto bg-primary z-10"
                key={index}
              >
                <div className="flex flex-col gap-4 font-plusJakarta text-accent">
                  <div>
                    <p className="font-bold">
                      {answer?.user_assignment_todo?.user?.name}
                    </p>
                    <p className="text-sm">{answer?.created_at}</p>
                  </div>
                  <hr></hr>
                  {answer?.answer ? (
                    <div
                      dangerouslySetInnerHTML={{ __html: answer?.answer }}
                    ></div>
                  ) : (
                    <div>No Text Answer</div>
                  )}
                  <hr></hr>

                  <div
                    className="border-2 border-accent p-4"
                    onClick={() => {
                      window.open(
                        `https://ecos.joheee.com/googolplex${answer.answer_file?.path}`
                      )
                    }}
                  >
                    {answer?.answer_file && answer?.answer_file.filename}
                  </div>

                  <div>
                    <Formik<UserAssignmentTodoUpdate>
                      initialValues={{
                        score: answer?.user_assignment_todo?.score || 0,
                        is_finish:
                          answer?.user_assignment_todo?.is_finish || true,
                        user_id: answer?.user_assignment_todo?.user_id,
                        assignment_id:
                          answer?.user_assignment_todo?.assignment_id,
                      }}
                      onSubmit={(values) => {
                        console.log(values)
                        if (authState.accessToken) {
                          updateTodoAnswer(
                            {
                              token: authState.accessToken,
                              userAssignmentTodoId:
                                answer?.user_assignment_todo?.id,
                              data: values,
                            },
                            {
                              onSuccess: (response) => {
                                console.log('graded', response)
                                refetch()
                              },
                            }
                          )
                        }
                      }}
                    >
                      {({ setFieldValue, values }) => (
                        <Form>
                          <label
                            htmlFor={`score-${index}`}
                            className="block text-sm font-medium mb-2"
                          >
                            Grade
                          </label>
                          <div className="flex gap-4">
                            <input
                              id={`score-${index}`}
                              type="number"
                              max={100}
                              min={0}
                              onChange={(e) => {
                                let value = Number(e.target.value)
                                if (value > 100) {
                                  value = 100
                                } else if (value < 0) {
                                  value = 0
                                }
                                setFieldValue('score', value)
                              }}
                              value={values.score}
                              className="w-full text-black p-3 bg-white rounded-md shadow-sm border"
                            />
                            <button className="w-fit p-3 rounded-md shadow-sm border">
                              Submit
                            </button>
                          </div>
                        </Form>
                      )}
                    </Formik>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </AuthTeacherWrapper>
  )
}

export default GradeAssignment
