import React, { createContext, useState, useCallback } from 'react'
import t from 'prop-types'
import api from 'services/api'

export const UsuarioContext = createContext()

const Usuario = ({ children }) => {
  const [usuarios, setUsuarios] = useState([])
  const [usuario, setUsuario] = useState({})

  const listarUsuarios = useCallback(() => {
    api.get('/usuarios')
      .then((response) => {
        setUsuarios(response.data)
      })
  }, [])

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
      usuarios,
      listarUsuarios,
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
