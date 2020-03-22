import React, { useState, useContext } from 'react'
import { Link } from 'react-router-dom'
import t from 'prop-types'
import styled from 'styled-components'
import {
  AppBar,
  Tabs,
  Tab,
  Typography,
  Box,
  Paper as MaterialPaper,
  IconButton
} from '@material-ui/core'
import InfoIcon from '@material-ui/icons/Info'
/* import RemoveCircleIcon from '@material-ui/icons/RemoveCircle' */

import { ProjetoContext } from 'contexts/projetos'
import { TabelaDefault, Modal } from 'ui'
import { DETALHE_MEMBRO } from 'routes'

const DetalheProjeto = () => {
  const { projetoAtual } = useContext(ProjetoContext)
  const [abrirModalDel, setAbrirModalDel] = useState(false)
  const [usuarioAtual/* setUsuarioAtual */] = useState({})
  const [value, setValue] = useState(0)

  const handleChange = (event, newValue) => {
    setValue(newValue)
  }

  function a11yProps (index) {
    return {
      id: `simple-tab-${index}`,
      'aria-controls': `simple-tabpanel-${index}`
    }
  }

  const colunas = [
    {
      title: 'Nome',
      field: 'nome'
    },
    {
      title: 'Organização',
      field: 'organizacao'
    },
    {
      title: 'Nível de Permissão',
      field: 'PermissaoId',
      lookup: { 1: 'Administrador', 2: 'Membro' }
    }
  ]

  const dados = projetoAtual.usuarios

  const actions = [
    {
      icon: () => (
        <IconButton component={Link} to={{ pathname: DETALHE_MEMBRO }} color='inherit'>
          <InfoIcon />
        </IconButton>),
      tooltip: 'info',
      onClick: (evt, data) => {
        window.location.state = data
      }
    }/* ,
    {
      icon: () => (<RemoveCircleIcon />),
      tooltip: 'Remover Membro',
      onClick: (evt, data) => handleAbriModalDel(evt, data)
    } */
  ]

  /*   const handleAbriModalDel = (evt, data) => {
    setUsuarioAtual(data)
    setAbrirModalDel(true)
  } */

  const handleDelete = () => {
    console.log('Removeu')
    setAbrirModalDel(false)
  }

  return (
    <>
      <AppBar position='static'>
        <Tabs value={value} onChange={handleChange} aria-label='simple tabs example'>
          <Tab label='Detalhes' {...a11yProps(0)} />
          <Tab label='Membros' {...a11yProps(1)} />
        </Tabs>
      </AppBar>

      <TabPanel value={value} index={0}>
        <Paper>
          <Label>
            Nome do Projeto
          </Label>
          <Campo>
            {projetoAtual.nome}
          </Campo>
          <Label>
            Descrição
          </Label>
          <Campo>
            {projetoAtual.descricao}
          </Campo>
          <Label>
            Owner
          </Label>
          <Campo>
            {
              projetoAtual.usuarios.filter((item) => item.id === projetoAtual.ownerId)[0].nome
            }
          </Campo>
          <Label>
            Data de Criação
          </Label>
          <Campo>
            {projetoAtual.createdAt}
          </Campo>
          <Label>
            Data de Entrega
          </Label>
          <Campo>
            {projetoAtual.dataEntrega}
          </Campo>
        </Paper>
      </TabPanel>

      <TabPanel value={value} index={1}>
        <TabelaDefault titulo='Membros do Projeto' columns={colunas} data={dados} actions={actions} />
      </TabPanel>

      <Modal titulo='Deseja mesmo remover este membro?' open={abrirModalDel} handleClose={() => setAbrirModalDel(false)} handleSave={handleDelete} operacao='Remover'>
        <Typography>
          O membro {usuarioAtual.nome} não fará mais parte deste projeto!
        </Typography>
      </Modal>
    </>
  )
}

function TabPanel (props) {
  const { children, value, index, ...other } = props

  return (
    <Typography
      component='div'
      role='tabpanel'
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box p={3}>{children}</Box>}
    </Typography>
  )
}

TabPanel.propTypes = {
  children: t.node,
  index: t.any.isRequired,
  value: t.any.isRequired
}

const Paper = styled(MaterialPaper)`
padding: 30px;
`

const Campo = styled(Typography).attrs({
  variant: 'body1'
})`
margin: 20px;
`

const Label = styled(Typography).attrs({
  variant: 'h6'
})`
`

export default DetalheProjeto
