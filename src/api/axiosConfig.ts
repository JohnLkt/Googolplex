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

export const classInstanceById = (id: string) =>
  axios.create({
    baseURL: `${backendAPIUrl}/class/${id}`,
    headers: {
      accept: '*/*',
      'Content-Type': 'application/json',
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
