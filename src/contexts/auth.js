import React, { createContext, useState, useCallback } from 'react'
import t from 'prop-types'
import api from 'services/api'
import { set, del } from 'idb-keyval'

import { AUTENTICAR, LOGOUT } from 'routes'

export const AuthContext = createContext()

function Auth ({ children }) {
  const [userLogin, setUserLogin] = useState({
    user: null,
    isUserLoggedIn: false,
    token: null
  })

  const login = useCallback((email, senha) => {
    api.post(AUTENTICAR, { email, senha })
      .then((response) => {
        set('usuario', response.data.data)
        set('token', response.data.token)
        setUserLogin({
          isUserLoggedIn: true,
          user: response.data.data,
          token: response.data.token,
          primeiroNome: response.data.data.nome.split(' ')[0]
        })
      })
  }, [])

  const logout = useCallback(() => {
    api.get(LOGOUT)
      .then((response) => {
        if (response.status === 200) {
          del('usuario')
          setUserLogin({
            isUserLoggedIn: false,
            user: null,
            token: null
          })
        }
      })
  }, [])

  return (
    <AuthContext.Provider value={{
      login,
      logout,
      userLogin,
      setUserLogin
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
