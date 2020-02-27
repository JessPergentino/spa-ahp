import React, { createContext, useCallback, useState } from 'react'
import ajax from '@fdaciuk/ajax'
import t from 'prop-types'

export const AuthContext = createContext()

function Auth ({ children }) {
  const [userInfo, setUserInfo] = useState({
    isUserLoggedIn: false,
    user: null,
    token: null
  })

  const handleLogin = useCallback(() => {
    ajax().post('http://localhost:8080/token', {
      email: 'usuario3@email.com',
      senha: '123456'
    })
      .then((result) => {
        if (result.data) {
          setUserInfo({
            isUserLoggedIn: true,
            user: result.data,
            token: result.token
          })
        }
      })
  }, [])

  const handleLogout = useCallback(() => {
    ajax().get('http://localhost:8080/logout')
      .then((result) => {
        if (result.status) {
          setUserInfo({
            isUserLoggedIn: false,
            user: null,
            token: null
          })
        }
      })
  }, [])

  return (
    <AuthContext.Provider value={{
      handleLogin,
      handleLogout,
      userInfo,
      setUserInfo
    }}
    >
      {children}
    </AuthContext.Provider>
  )
}

Auth.propTypes = {
  children: t.node.isRequired
}

export default Auth
