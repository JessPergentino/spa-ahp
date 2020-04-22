import React, { createContext, useState, useCallback } from 'react'
import t from 'prop-types'
import api from 'services/api'

export const CriterioContext = createContext()

const Criterio = ({ children }) => {
  const [criterios, setCriterios] = useState([])
  const [ponderacaoCriterio, setPonderacaoCriterio] = useState([])
  const [criterio, setCriterio] = useState([])

  const listarPonderacaoCriterio = useCallback((usuarioId, projetoId) => {
    api.get(`/priorizacoes_criterio/${usuarioId}&&${projetoId}`)
      .then((response) => {
        setPonderacaoCriterio(response.data.vetor)
      })
  }, [])

  const listarCriteriosPorCategoria = useCallback((categoria) => {
    switch (categoria) {
      case 'BENEFICIO':
        api.get(`/criterios_categoria/${categoria}`)
          .then((response) => {
            setCriterios(response.data)
          })
        break
      case 'CUSTO':
        api.get(`/criterios_categoria/${categoria}`)
          .then((response) => {
            setCriterios(response.data)
          })
        break
      case 'RISCO':
        api.get(`/criterios_categoria/${categoria}`)
          .then((response) => {
            setCriterios(response.data)
          })
        break
      case 'PENALIDADE':
        api.get(`/criterios_categoria/${categoria}`)
          .then((response) => {
            setCriterios(response.data)
          })
        break
      case 'EMPRESARIAL':
        api.get(`/criterios_categoria/${categoria}`)
          .then((response) => {
            setCriterios(response.data)
          })
        break
      case 'TECNICO':
        api.get(`/criterios_categoria/${categoria}`)
          .then((response) => {
            setCriterios(response.data)
          })
        break

      default:
        break
    }
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
      listarCriteriosPorCategoria,
      listarTodosCriterios,
      ponderacaoCriterio,
      setPonderacaoCriterio,
      listarPonderacaoCriterio,
      buscarCriterio
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
