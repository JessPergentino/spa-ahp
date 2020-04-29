import React, { useState } from 'react'

import {
  AppBar,
  Tabs,
  Tab
} from '@material-ui/core'

import TabPanel from 'ui/tab-panel'

import PonderacaoCriterios from 'pages/priorizacao/ponderacao-criterio/ponderacao-criterio'
import PonderacaoRequisito from 'pages/priorizacao/ponderacao-requisito/ponderacao-requisito'
import PriorizacaoIndividual from 'pages/priorizacao/priorizacao-individual/priorizacao-individual'
import PriorizacaoGlobal from 'pages/priorizacao/priorizacao-global/priorizacao-global'

const Priorizacao = () => {
  const [value, setValue] = useState(0)

  const handleChangeTab = (event, newValue) => {
    setValue(newValue)
  }

  return (
    <>
      <AppBar position='static'>
        <Tabs value={value} onChange={handleChangeTab} aria-label='simple tabs example'>
          <Tab label='Critérios' {...a11yProps(0)} />
          <Tab label='Requisitos' {...a11yProps(1)} />
          <Tab label='Priorização Individual' {...a11yProps(2)} />
          <Tab label='Priorização Global' {...a11yProps(3)} />
        </Tabs>
      </AppBar>

      <TabPanel value={value} index={0}>
        <PonderacaoCriterios />
      </TabPanel>

      <TabPanel value={value} index={1}>
        <PonderacaoRequisito />
      </TabPanel>

      <TabPanel value={value} index={2}>
        <PriorizacaoIndividual />
      </TabPanel>

      <TabPanel value={value} index={3}>
        <PriorizacaoGlobal />
      </TabPanel>
    </>
  )
}

const a11yProps = (index) => {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`
  }
}

export default Priorizacao
