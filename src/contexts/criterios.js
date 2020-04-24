import React, { createContext, useState, useCallback } from 'react'
import t from 'prop-types'
import api from 'services/api'

export const CriterioContext = createContext()

const Criterio = ({ children }) => {
  const [criterios, setCriterios] = useState([])
  const [vetorPrioritarioCriterio, setVetorPrioritarioCriterio] = useState([])
  const [vetorPrioritarioRequisito, setVetorPrioritarioRequisito] = useState([])
  const [criterio, setCriterio] = useState([])

  const buscarPonderacaoCriterio = useCallback((usuarioId, projetoId) => {
    api.get(`/priorizacoes_criterio/${usuarioId}&&${projetoId}`)
      .then((response) => {
        setVetorPrioritarioCriterio(response.data.vetor)
      })
  }, [])

  const buscarPonderacaoRequisito = useCallback((usuarioId, projetoId) => {
    api.get(`/priorizacoes_requisito/${usuarioId}&&${projetoId}`)
      .then((response) => {
        setVetorPrioritarioRequisito(response.data.vetor)
      })
  }, [])

  const listarTodosCriterios = useCallback(() => {
    api.get('/criterios')
      .then((response) => {
        setCriterios(response.data)
      })
  }, [])

  const buscarCriterio = useCallback((criterioId) => {
    api.get(`/criterios/${criterioId}`)
      .then((response) => {
        setCriterio(response.data.nome)
      })
  }, [])

  return (
    <CriterioContext.Provider value={{
      criterio,
      setCriterio,
      criterios,
      listarTodosCriterios,
      vetorPrioritarioCriterio,
      setVetorPrioritarioCriterio,
      buscarPonderacaoCriterio,
      buscarCriterio,
      vetorPrioritarioRequisito,
      buscarPonderacaoRequisito
    }}
    >
      {children}
    </CriterioContext.Provider>
  )
}

Criterio.propTypes = {
  children: t.node.isRequired
}

export default Criterio
