export interface User {
  id?: string
  email: string
  password: string
  name: string
  picture: string
  created_at: string
  updated_at: string

  notifications: Notification[]
  user_class_member: UserClassMember[]
}

export interface Notification {
  id?: string
  title: string
  description: string
  created_at: string
  updated_at: string
  is_read: boolean
  user_id: string

  user: User
}

export interface Class {
  id?: string
  class_code: string
  subject: string
  description: string
  created_at: string
  updated_at: string
}

export interface UserClassMember {
  id?: string
  is_teacher: boolean
  created_at: string
  updated_at: string
  class_id: string
  user_id: string

  class: Class
  user: User
}

export interface Article {
  id?: string
  title: string
  content: string
  post: Post
}

export interface Assignment {
  id?: string
  title: string
  content: string
  due_date: string
  post: Post
}

export interface Post {
  id?: string
  created_at: string
  updated_at: string
  article: Article
  assignment?: Assignment
  class: Class
  article_id: string
  class_id: string
  assignment_id: string
}
