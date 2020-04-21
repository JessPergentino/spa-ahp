import React, { createContext, useState, useCallback } from 'react'
import t from 'prop-types'
import api from 'services/api'

export const ProjetoContext = createContext()

const Projeto = ({ children }) => {
  const [projetos, setProjetos] = useState([])
  const [projetoAtual, setProjetoAtual] = useState(null)
  const [owner, setOwner] = useState(null)

  const listarProjetos = useCallback((idUsuario) => {
    api.get(`/projetos_usuario/${idUsuario}`)
      .then((response) => {
        setProjetos(response.data)
      })
  }, [])

  const buscarOwner = useCallback((idUsuario) => {
    api.get(`/usuarios/${idUsuario}`)
      .then((response) => {
        setOwner(response.data.nome)
      })
  }, [])

  const buscarProjeto = useCallback((idProjeto) => {
    api.get(`/projetos/${idProjeto}`)
      .then((response) => {
        setProjetoAtual(response.data)
      })
  }, [])

  const setAddProjeto = useCallback((projeto) => {
    setProjetos(projetos.concat(projeto))
  }, [projetos])

  return (
    <ProjetoContext.Provider value={{
      projetoAtual,
      setProjetoAtual,
      projetos,
      setProjetos,
      listarProjetos,
      buscarProjeto,
      buscarOwner,
      owner,
      setOwner,
      setAddProjeto
    }}
    >
      {children}
    </ProjetoContext.Provider>
  )
}

Projeto.propTypes = {
  children: t.node.isRequired
}

export default Projeto
