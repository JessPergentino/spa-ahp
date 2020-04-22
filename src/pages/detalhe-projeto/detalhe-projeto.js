import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

import {
  AppBar,
  Tabs,
  Tab
} from '@material-ui/core'

import { TabPanel } from 'ui'

import { AuthContext } from 'contexts/auth'
import { ProjetoContext } from 'contexts/projetos'

import InfoProjeto from 'pages/detalhe-projeto/info-projeto'
import TabelaMembro from 'pages/detalhe-projeto/tabela-membros'
import SelecionarCriterios from 'pages/detalhe-projeto/selecionar-criterios'

const DetalheProjeto = () => {
  const { userLogin } = useContext(AuthContext)
  const { projetoAtual, buscarProjeto } = useContext(ProjetoContext)
  const { idProjeto } = useParams()

  useEffect(() => {
    console.log('renderizou detalhe')
    buscarProjeto(idProjeto)
  }, [buscarProjeto, idProjeto])

  const [value, setValue] = useState(0)
  const admin = userLogin.user.permissao !== 'ADMIN'

  const handleChange = (event, newValue) => {
    setValue(newValue)
  }

  return (
    <>
      <AppBar position='static'>
        <Tabs value={value} onChange={handleChange} aria-label='simple tabs example'>
          <Tab label='Detalhes' {...a11yProps(0)} />
          <Tab label='Membros' {...a11yProps(1)} />
          <Tab disabled={admin} label='Critérios' {...a11yProps(2)} />
        </Tabs>
      </AppBar>

      <TabPanel value={value} index={0}>
        <InfoProjeto />
      </TabPanel>

      <TabPanel value={value} index={1}>
        <TabelaMembro
          projetoAtual={projetoAtual}
        />
      </TabPanel>

      <TabPanel value={value} index={2}>
        <SelecionarCriterios
          projetoAtual={projetoAtual}
        />
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

export default DetalheProjeto
