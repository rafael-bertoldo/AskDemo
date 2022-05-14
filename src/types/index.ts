import { ReactNode } from "react"
import { IconType } from "react-icons"

export interface NavBarProps {
  userName: string
  isLogged?: boolean
  student?: boolean
  adm?: boolean
  icon?: IconType
  iconText?: string
  onclick?: () => void
}

export interface Profile {
  profile_code: string
  profile_id: string
  profile_name: string
}

export interface Classroom {
  classroom_id: string
  classroom_name: string
}

export interface User {
  user_id: string;
  user_name: string;
  user_email: string;
  user_password: string;
  user_gender: string;
  user_avatar: string;
  user_mentor: string;
  user_instructor: string;
  user_profile: Profile
  user_profile_id: string;
  user_classroom: Classroom
  user_classroom_id: string;
}

export interface Ask {
  ask_id: string
  ask_body: string
  ask_theme: string
  ask_sub_theme: string
  ask_status: string
  ask_createdAt: Date
  user_id: string
  userId: User
}

export interface ListClassroomAsk {
  ask: {
    ask_id: string
    ask_body: string
    ask_theme: string
    ask_sub_theme: string
    ask_status: string
    ask_createdAt: Date
    user_id: string
    userId: User
  }
  user: {
    user_id: string;
    user_name: string;
    user_email: string;
    user_password: string;
    user_gender: string;
    user_avatar: string;
    user_mentor: string;
    user_instructor: string;
    user_profile: Profile
    user_profile_id: string;
    user_classroom: Classroom
    user_classroom_id: string;
  }
}

export interface AppProviderProps {
  children: ReactNode
}

export interface ProvidersProps {
  children: ReactNode;
}

export interface AuthState {
  user: User;
  token: string;
}

export interface SignInCredentials {
  email: string;
  password: string;
}

export interface AuthContextData {
  user: User;
  token: String;
  signIn: (credentials: SignInCredentials) => void;
}

export interface SignInData {
  email: string;
  password: string;
}

export interface CreateAskData {
  ask_theme: string
  ask_sub_theme: string
  ask_body: string
}

export interface UpdateAskData {
  ask_theme?: string
  ask_sub_theme?: string
  ask_body?: string
}

export interface AskContextData {
  asks: ListClassroomAsk[]
  loadAsks: (user: User) => void
  createAsk: (data: CreateAskData, user: User) => void
  checkAsk: (ask_id: string, user: User) => void
  redflagAsk: (ask_id: string, user: User) => void
  deleteAsks: (ask_id: string, user: User) => void
  editAsk: (ask_id: string, data: UpdateAskData, user: User) => void
  setAsks: React.Dispatch<React.SetStateAction<Ask[]>> | any
}

export interface UserContextData {
  editUserName: (data: EditData, setLocalUser: React.Dispatch<any>) => void
  editUserEmail: (data: EditData, setLocalUser: React.Dispatch<any>) => void
  editUserGender: (data: EditData, setLocalUser: React.Dispatch<any>) => void
  editUserPassword: (data: EditData, setLocalUser: React.Dispatch<any>) => void
}

export interface EditData {
  user_name?: string,
  user_email?: string,
  user_gender?: string,
  old_password?: string,
  user_password?: string
}