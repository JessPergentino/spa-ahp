import React, { createContext, useState, useCallback } from 'react'
import t from 'prop-types'
import api from 'services/api'

export const CriterioContext = createContext()

const Criterio = ({ children }) => {
  const [criterios, setCriterios] = useState([])
  const [vetorPrioritarioCriterio, setVetorPrioritarioCriterio] = useState([])
  const [vetorPrioritarioRequisito, setVetorPrioritarioRequisito] = useState([])
  const [criterio, setCriterio] = useState([])
  const [priorizacaoIndividual, setPriorizacaoIndividual] = useState([])
  const [priorizacaoGlobal, setPriorizacaoGlobal] = useState([])

  const limparStateVetorPrioritarioRequisito = useCallback(() => {
    setVetorPrioritarioRequisito([])
  }, [])

  const limparStateVetorPriorizacaoIndividual = useCallback(() => {
    setPriorizacaoIndividual([])
  }, [])

  const limparStateVetorPriorizacaoGlobal = useCallback(() => {
    setPriorizacaoGlobal([])
  }, [])

  const buscarPonderacaoCriterio = useCallback((usuarioId, projetoId) => {
    api.get(`/priorizacoes_criterio/${usuarioId}&&${projetoId}`)
      .then((response) => {
        setVetorPrioritarioCriterio(response.data.itemPonderacaoCriterio)
      })
  }, [])

  const buscarPonderacaoRequisito = useCallback((usuarioId, projetoId) => {
    api.get(`/priorizacoes_requisito/${usuarioId}&&${projetoId}`)
      .then((response) => {
        setVetorPrioritarioRequisito(response.data.itemPonderacaoRequisito)
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

  const buscarPriorizacaoIndividual = useCallback((usuarioId, projetoId) => {
    api.get(`/priorizacoes_individual/${usuarioId}&&${projetoId}`)
      .then((response) => {
        setPriorizacaoIndividual(response.data.priorizacao)
      })
  }, [])

  const buscarPriorizacaoGlobal = useCallback((projetoId) => {
    api.get(`/priorizacoes_global/${projetoId}`)
      .then((response) => {
        setPriorizacaoGlobal(response.data.priorizacaoGlobal)
      })
  }, [])

  return (
    <CriterioContext.Provider value={{
      criterio,
      criterios,
      listarTodosCriterios,
      vetorPrioritarioCriterio,
      buscarPonderacaoCriterio,
      buscarCriterio,
      vetorPrioritarioRequisito,
      limparStateVetorPrioritarioRequisito,
      buscarPonderacaoRequisito,
      buscarPriorizacaoIndividual,
      priorizacaoIndividual,
      priorizacaoGlobal,
      buscarPriorizacaoGlobal,
      limparStateVetorPriorizacaoIndividual,
      limparStateVetorPriorizacaoGlobal
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
