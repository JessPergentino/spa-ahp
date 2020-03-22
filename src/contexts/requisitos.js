import React, { createContext, useState, useCallback } from 'react'
import t from 'prop-types'
import api from 'services/api'

export const RequisitoContext = createContext()

function Requisito ({ children }) {
  const [requisitos, setRequisitos] = useState([])
  const [requisitoAtual, setRequisitoAtual] = useState([])

  const listarRequisitos = useCallback(() => {
    api.get('/requisito')
      .then((response) => {
        setRequisitos(response.data.data)
      })
  }, [])

  return (
    <RequisitoContext.Provider value={{
      requisitos,
      setRequisitos,
      listarRequisitos,
      requisitoAtual,
      setRequisitoAtual
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
