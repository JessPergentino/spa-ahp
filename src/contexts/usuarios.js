import React, { createContext, useState, useCallback } from 'react'
import t from 'prop-types'
import api from 'services/api'

export const UsuarioContext = createContext()

function Usuario ({ children }) {
  const [usuario, setUsuario] = useState({})

  const buscarUsuario = useCallback((id) => {
    api.get(`/usuarios/${id}`)
      .then((response) => {
        setUsuario(response.data)
      })
  }, [])

  return (
    <UsuarioContext.Provider value={{
      usuario,
      setUsuario,
      buscarUsuario
    }}
    >
      {children}
    </UsuarioContext.Provider>
  )
}

Usuario.propTypes = {
  children: t.node.isRequired
}

export default Usuario
