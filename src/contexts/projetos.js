import React, { createContext, useState, useCallback } from 'react'
import t from 'prop-types'
import api from 'services/api'

export const ProjetoContext = createContext()

function Projeto ({ children }) {
  const [projetos, setProjetos] = useState([])
  const [projetoAtual, setProjetoAtual] = useState(null)

  const listarProjetos = useCallback(() => {
    api.get('/projeto')
      .then((response) => {
        setProjetos(response.data.data)
      })
  }, [])

  return (
    <ProjetoContext.Provider value={{
      projetoAtual,
      setProjetoAtual,
      projetos,
      setProjetos,
      listarProjetos
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
