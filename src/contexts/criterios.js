import React, { createContext, useState, useCallback } from 'react'
import t from 'prop-types'
import api from 'services/api'

export const CriterioContext = createContext()

function Criterio ({ children }) {
  const [criteriosBeneficio, setCriteriosBeneficio] = useState([])
  const [criteriosCusto, setCriteriosCusto] = useState([])
  const [criteriosRisco, setCriteriosRisco] = useState([])
  const [criteriosPenalidade, setCriteriosPenalidade] = useState([])
  const [criteriosEmpresarial, setCriteriosEmpresarial] = useState([])
  const [criteriosTecnico, setCriteriosTecnico] = useState([])
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
            setCriteriosBeneficio(response.data)
          })
        break
      case 'CUSTO':
        api.get(`/criterios_categoria/${categoria}`)
          .then((response) => {
            setCriteriosCusto(response.data)
          })
        break
      case 'RISCO':
        api.get(`/criterios_categoria/${categoria}`)
          .then((response) => {
            setCriteriosRisco(response.data)
          })
        break
      case 'PENALIDADE':
        api.get(`/criterios_categoria/${categoria}`)
          .then((response) => {
            setCriteriosPenalidade(response.data)
          })
        break
      case 'EMPRESARIAL':
        api.get(`/criterios_categoria/${categoria}`)
          .then((response) => {
            setCriteriosEmpresarial(response.data)
          })
        break
      case 'TECNICO':
        api.get(`/criterios_categoria/${categoria}`)
          .then((response) => {
            setCriteriosTecnico(response.data)
          })
        break

      default:
        break
    }
  }, [])

  const listarTodosCriteriosPorCategoria = useCallback(() => {
    api.get('/criterios_categoria/BENEFICIO')
      .then((response) => {
        setCriteriosBeneficio(response.data)
      })

    api.get('/criterios_categoria/CUSTO')
      .then((response) => {
        setCriteriosCusto(response.data)
      })

    api.get('/criterios_categoria/RISCO')
      .then((response) => {
        setCriteriosRisco(response.data)
      })

    api.get('/criterios_categoria/PENALIDADE')
      .then((response) => {
        setCriteriosPenalidade(response.data)
      })

    api.get('/criterios_categoria/EMPRESARIAL')
      .then((response) => {
        setCriteriosEmpresarial(response.data)
      })

    api.get('/criterios_categoria/TECNICO')
      .then((response) => {
        setCriteriosTecnico(response.data)
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
      criteriosBeneficio,
      setCriteriosBeneficio,
      criteriosCusto,
      setCriteriosCusto,
      criteriosRisco,
      setCriteriosRisco,
      criteriosPenalidade,
      setCriteriosPenalidade,
      criteriosEmpresarial,
      setCriteriosEmpresarial,
      criteriosTecnico,
      setCriteriosTecnico,
      listarCriteriosPorCategoria,
      listarTodosCriteriosPorCategoria,
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
