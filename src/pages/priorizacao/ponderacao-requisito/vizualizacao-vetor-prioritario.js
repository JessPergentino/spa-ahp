import React, { useState, useContext, useEffect } from 'react'
import t from 'prop-types'

import {
  AppBar,
  Tabs,
  Tab
} from '@material-ui/core'

import TabPanel from 'ui/tab-panel'
import TabelaVetorPrioritarioRequisito from 'pages/priorizacao/ponderacao-requisito/tabela-vetor-prioritario-requisito'
import { CriterioContext } from 'contexts/criterios'

const VizualizacaoVetorPrioritario = ({ vetor, projeto }) => {
  const { criterios, listarTodosCriterios } = useContext(CriterioContext)

  useEffect(() => {
    listarTodosCriterios()
  }, [listarTodosCriterios])

  const [value, setValue] = useState(0)

  const handleChangeTab = (event, newValue) => {
    setValue(newValue)
  }

  const resultado = projeto.criterios.map((c) => {
    return vetor.filter((i) => i.criterioId === c.id)
  })

  const handleRequisito = (linha) => {
    const requisito = projeto.requisitos.filter((r) => r.id === linha)
    return requisito[0].titulo
  }

  const carregarCriteriosPonderados = () => {
    const lista = resultado.map((r, index) => {
      return r[index]
    })

    const listaCriterios = lista.map((lista) => {
      return criterios.filter((criterio) => lista.criterioId === criterio.id)
    })
    return listaCriterios
  }

  return (
    <>
      <AppBar position='static'>
        <Tabs value={value} onChange={handleChangeTab} aria-label='simple tabs example'>
          {carregarCriteriosPonderados().map((c, index) => {
            return (<Tab key={index} label={c[0].nome} {...a11yProps(index)} />)
          })}
        </Tabs>
      </AppBar>

      {carregarCriteriosPonderados().map((c, index) => {
        return (
          <TabPanel key={index} value={value} index={index}>
            <TabelaVetorPrioritarioRequisito
              vetor={resultado[index]}
              handleRequisito={handleRequisito}
            />
          </TabPanel>
        )
      })}
    </>
  )
}

const a11yProps = (index) => {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`
  }
}

VizualizacaoVetorPrioritario.propTypes = {
  vetor: t.array,
  projeto: t.object
}

export default VizualizacaoVetorPrioritario
