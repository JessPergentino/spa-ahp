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
        set('usuario', response.data.usuario)
        set('token', response.data.token)
        setUserLogin({
          isUserLoggedIn: true,
          user: response.data.usuario,
          token: response.data.token,
          primeiroNome: response.data.usuario.nome.split(' ')[0]
        })
      }).catch(function (error) {
        if (error.response) {
          console.log(error.response.data.message)
        }
      })
  }, [])

  const logout = useCallback(() => {
    api.get(LOGOUT)
      .then((response) => {
        del('usuario')
        setUserLogin({
          isUserLoggedIn: false,
          user: null,
          token: null
        })
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
