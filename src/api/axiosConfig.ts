import axios from 'axios'

const backendAPIUrl = import.meta.env.VITE_BACKEND_URL

export const authInstance = axios.create({
  baseURL: `${backendAPIUrl}/auth`,
  headers: {
    accept: '*/*',
    'Content-Type': 'application/json',
  },
})

export const authInstanceById = (id: string) =>
  axios.create({
    baseURL: `${backendAPIUrl}/auth/${id}`,
    headers: {
      accept: '*/*',
      'Content-Type': 'application/json',
    },
  })

export const classInstance = (token: string) =>
  axios.create({
    baseURL: `${backendAPIUrl}/class`,
    headers: {
      accept: '*/*',
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  })

export const classInstanceByUserId = (token: string, userId: string) =>
  axios.create({
    baseURL: `${backendAPIUrl}/class/user/${userId}`,
    headers: {
      accept: '*/*',
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  })

export const classInstanceByClassCode = (token: string, classCode: string) =>
  axios.create({
    baseURL: `${backendAPIUrl}/class/code/${classCode}`,
    headers: {
      accept: '*/*',
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  })

export const classInstanceByClassId = (token: string, classId: string) =>
  axios.create({
    baseURL: `${backendAPIUrl}/class/${classId}`,
    headers: {
      accept: '*/*',
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  })

export const notifInstance = (token: string) =>
  axios.create({
    baseURL: `${backendAPIUrl}/notification`,
    headers: {
      accept: '*/*',
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  })

export const notifInstanceById = (id: string, token: string) =>
  axios.create({
    baseURL: `${backendAPIUrl}/notification/${id}`,
    headers: {
      accept: '*/*',
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  })

export const userClassMemberInstance = (token: string) =>
  axios.create({
    baseURL: `${backendAPIUrl}/user_class_member`,
    headers: {
      accept: '*/*',
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  })

export const userClassMemberInstanceById = (id: string, token: string) =>
  axios.create({
    baseURL: `${backendAPIUrl}/user_class_member/${id}`,
    headers: {
      accept: '*/*',
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  })

export const userClassMemberByClassIdInstance = (
  classId: string,
  token: string
) =>
  axios.create({
    baseURL: `${backendAPIUrl}/user_class_member/class/${classId}`,
    headers: {
      accept: '*/*',
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  })

export const userClassMemberInstanceByClassCode = (token: string) =>
  axios.create({
    baseURL: `${backendAPIUrl}/user_class_member/join_class`,
    headers: {
      accept: '*/*',
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  })

export const articleInstance = (token: string) =>
  axios.create({
    baseURL: `${backendAPIUrl}/article`,
    headers: {
      accept: '*/*',
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  })

export const articleInstanceById = (id: string, token: string) =>
  axios.create({
    baseURL: `${backendAPIUrl}/article/${id}`,
    headers: {
      accept: '*/*',
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  })

export const assignmentInstance = (token: string) =>
  axios.create({
    baseURL: `${backendAPIUrl}/assignment`,
    headers: {
      accept: '*/*',
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  })

export const assignmentFileInstance = (token: string) =>
  axios.create({
    baseURL: `${backendAPIUrl}/assignment_file`,
    headers: {
      accept: '*/*',
      Authorization: `Bearer ${token}`,
    },
  })
export const postInstance = (token: string) =>
  axios.create({
    baseURL: `${backendAPIUrl}/post`,
    headers: {
      accept: '*/*',
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  })

export const postById = (postId: string, token: string) =>
  axios.create({
    baseURL: `${backendAPIUrl}/post/${postId}`,
    headers: {
      accept: '*/*',
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  })

export const postByClassId = (token: string, classId: string) =>
  axios.create({
    baseURL: `${backendAPIUrl}/post/class/${classId}`,
    headers: {
      accept: '*/*',
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  })
