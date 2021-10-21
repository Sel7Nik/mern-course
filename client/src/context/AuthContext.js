import { createContext } from 'react'

function fun() {}

export const AuthContext = createContext({
  token: null,
  userId: null,
  login: fun,
  logout: fun,
  isAuth: false,
})
