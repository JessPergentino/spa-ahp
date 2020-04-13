import React, { createContext, useState, useCallback } from 'react'
import t from 'prop-types'
import api from 'services/api'

export const RequisitoContext = createContext()

function Requisito ({ children }) {
  const [requisitos, setRequisitos] = useState([])
  const [requisitoAtual, setRequisitoAtual] = useState(null)

  const listarRequisitos = useCallback((id) => {
    api.get(`/requisitos_projeto/${id}`)
      .then((response) => {
        setRequisitos(response.data)
      })
  }, [])

  const buscarRequisito = useCallback((id) => {
    console.log('implementar Buscar Requisito')
  }, [])

  return (
    <RequisitoContext.Provider value={{
      requisitos,
      setRequisitos,
      listarRequisitos,
      requisitoAtual,
      setRequisitoAtual,
      buscarRequisito
    }}
    >
      {children}
    </RequisitoContext.Provider>
  )
}

Requisito.propTypes = {
  children: t.node.isRequired
}

export default Requisito
