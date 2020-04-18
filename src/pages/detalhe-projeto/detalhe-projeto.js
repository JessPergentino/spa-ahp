import React, { useState, useContext } from 'react'

import {
  AppBar,
  Tabs,
  Tab
} from '@material-ui/core'

import TabPanel from 'pages/detalhe-projeto/tab-panel'
import { SnackBar } from 'ui'

import { AuthContext } from 'contexts/auth'
import { CriterioContext } from 'contexts/criterios'

import InfoProjeto from 'pages/detalhe-projeto/info-projeto'
import TabelaMembro from 'pages/detalhe-projeto/tabela-membros'
import SelecionarCriterios from 'pages/detalhe-projeto/selecionar-criterios'
import ModalAddMembro from 'pages/detalhe-projeto/add-membro-projeto'

const DetalheProjeto = () => {
  const { userLogin } = useContext(AuthContext)
  const {
    criteriosBeneficio,
    criteriosCusto,
    criteriosRisco,
    criteriosPenalidade,
    criteriosEmpresarial,
    criteriosTecnico
  } = useContext(CriterioContext)

  const [abrirModalAdd, setAbrirModalAdd] = useState(false)
  const [value, setValue] = useState(0)
  const [openSnackbar, setOpenSnackbar] = useState(false)
  const admin = userLogin.user.permissao !== 'ADMIN'

  const handleChange = (event, newValue) => {
    setValue(newValue)
  }

  const handleClickSnackbar = () => {
    setOpenSnackbar(true)
  }

  const handleCloseSnackbar = (event, reason) => {
    if (reason === 'clickaway') {
      return
    }
    setOpenSnackbar(false)
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
          handleAbrirModal={() => setAbrirModalAdd(true)}
        />
      </TabPanel>

      <TabPanel value={value} index={2}>
        <SelecionarCriterios
          criteriosBeneficio={criteriosBeneficio}
          criteriosCusto={criteriosCusto}
          criteriosEmpresarial={criteriosEmpresarial}
          criteriosPenalidade={criteriosPenalidade}
          criteriosRisco={criteriosRisco}
          criteriosTecnico={criteriosTecnico}
          handleClickSnackbar={handleClickSnackbar}
        />
      </TabPanel>

      <SnackBar
        openSnackbar={openSnackbar}
        duracao={4000}
        handleClose={handleCloseSnackbar}
        tipo='success'
        mensagem='Critérios de Priorização Salvos com Sucesso!'
      />

      <ModalAddMembro
        abrir={abrirModalAdd}
        handleFechar={() => setAbrirModalAdd(false)}
      />
    </>
  )
}

function a11yProps (index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`
  }
}

export default DetalheProjeto
