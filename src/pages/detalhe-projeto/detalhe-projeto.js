import React, { useState, useContext } from 'react'
import { Link } from 'react-router-dom'

import styled from 'styled-components'
import {
  AppBar,
  Tabs,
  Tab,
  Typography,
  IconButton,
  Checkbox,
  Grid,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Card,
  Button,
  Snackbar
} from '@material-ui/core'
import MuiAlert from '@material-ui/lab/Alert'
import InfoIcon from '@material-ui/icons/Info'

import TabPanel from 'pages/detalhe-projeto/tab-panel'
import CriterioGrid from 'pages/detalhe-projeto/criterio-grid'
import { TabelaDefault } from 'ui'

import { AuthContext } from 'contexts/auth'
import { CriterioContext } from 'contexts/criterios'
import { ProjetoContext } from 'contexts/projetos'
import { DETALHE_MEMBRO } from 'routes'
import api from 'services/api'

const DetalheProjeto = () => {
  const { projetoAtual, buscarProjeto } = useContext(ProjetoContext)
  const { userLogin } = useContext(AuthContext)
  const {
    criteriosBeneficio,
    criteriosCusto,
    criteriosRisco,
    criteriosPenalidade,
    criteriosEmpresarial,
    criteriosTecnico
  } = useContext(CriterioContext)

  const [value, setValue] = useState(0)
  const [checked, setChecked] = React.useState(projetoAtual.criterios.map((item) => item.id))
  const [openSnackbar, setOpenSnackbar] = React.useState(false)

  const handleToggle = value => () => {
    const currentIndex = checked.indexOf(value)
    const newChecked = [...checked]

    if (currentIndex === -1) {
      newChecked.push(value)
    } else {
      newChecked.splice(currentIndex, 1)
    }
    setChecked(newChecked)
  }

  const handleChange = (event, newValue) => {
    setValue(newValue)
  }

  const handleClickLimpar = () => {
    setChecked([])
  }

  const handleClickSalvar = () => {
    api.post(`/criterios_projeto/${projetoAtual.id}`, checked)
      .then((response) => {
        buscarProjeto(projetoAtual.id)
        handleClickSnackbar()
      })
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
      field: 'permissao',
      lookup: { ADMIN: 'Administrador', MEMBRO: 'Membro' }
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
    }
  ]

  const error = checked.filter(v => v).length > 15
  const admin = userLogin.user.permissao !== 'ADMIN'

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

      <TabPanel value={value} index={2}>
        <Paper>
          <Label>
            Selecione os Critérios de Priorização
          </Label>

          {error && (<Campo color='secondary'>Você só pode selecionar até no máximo 15 critérios.</Campo>)}

          <CriterioGrid>
            <Grid item xs>
              <Paper>
                <Label>
                  Critérios Relacionados Aos Benefícios
                </Label>

                <List>
                  {criteriosBeneficio.map((criterio) => {
                    const labelId = `checkbox-list-label-${criterio.id}`
                    return (
                      <Grid item key={criterio.id} xs>
                        <ListItem key={criterio.id} role={undefined} dense button onClick={handleToggle(criterio.id)}>
                          <ListItemIcon>
                            <Checkbox
                              edge='start'
                              checked={checked.indexOf(criterio.id) !== -1}
                              tabIndex={-1}
                              disableRipple
                              inputProps={{ 'aria-labelledby': labelId }}
                            />
                          </ListItemIcon>
                          <ListItemText id={labelId} primary={criterio.nome} />
                        </ListItem>
                      </Grid>
                    )
                  })}
                </List>
              </Paper>
            </Grid>

            <Grid item xs>
              <Paper>
                <Label>
                  Critérios Relacionados Aos Custos
                </Label>

                <List>
                  {criteriosCusto.map((criterio) => {
                    const labelId = `checkbox-list-label-${criterio.id}`
                    return (
                      <Grid item key={criterio.id} xs>
                        <ListItem key={criterio.id} role={undefined} dense button onClick={handleToggle(criterio.id)}>
                          <ListItemIcon>
                            <Checkbox
                              edge='start'
                              checked={checked.indexOf(criterio.id) !== -1}
                              tabIndex={-1}
                              disableRipple
                              inputProps={{ 'aria-labelledby': labelId }}
                            />
                          </ListItemIcon>
                          <ListItemText id={labelId} primary={criterio.nome} />
                        </ListItem>
                      </Grid>
                    )
                  })}
                </List>
              </Paper>
            </Grid>

            <Grid item xs>
              <Paper>
                <Label>
                  Critérios Relacionados aos Riscos
                </Label>

                <List>
                  {criteriosRisco.map((criterio) => {
                    const labelId = `checkbox-list-label-${criterio.id}`
                    return (
                      <Grid item key={criterio.id} xs>
                        <ListItem key={criterio.id} role={undefined} dense button onClick={handleToggle(criterio.id)}>
                          <ListItemIcon>
                            <Checkbox
                              edge='start'
                              checked={checked.indexOf(criterio.id) !== -1}
                              tabIndex={-1}
                              disableRipple
                              inputProps={{ 'aria-labelledby': labelId }}
                            />
                          </ListItemIcon>
                          <ListItemText id={labelId} primary={criterio.nome} />
                        </ListItem>
                      </Grid>
                    )
                  })}
                </List>
              </Paper>
            </Grid>

            <Grid item xs>
              <Paper>
                <Label>
                  Critérios Relacionados a Penalidades e Prevenção de Penalidades
                </Label>

                <List>
                  {criteriosPenalidade.map((criterio) => {
                    const labelId = `checkbox-list-label-${criterio.id}`
                    return (
                      <Grid item key={criterio.id} xs>
                        <ListItem key={criterio.id} role={undefined} dense button onClick={handleToggle(criterio.id)}>
                          <ListItemIcon>
                            <Checkbox
                              edge='start'
                              checked={checked.indexOf(criterio.id) !== -1}
                              tabIndex={-1}
                              disableRipple
                              inputProps={{ 'aria-labelledby': labelId }}
                            />
                          </ListItemIcon>
                          <ListItemText id={labelId} primary={criterio.nome} />
                        </ListItem>
                      </Grid>
                    )
                  })}
                </List>
              </Paper>
            </Grid>

            <Grid item xs>
              <Paper>
                <Label>
                  Critérios Relacionados Ao Contexto Empresarial
                </Label>

                <List>
                  {criteriosEmpresarial.map((criterio) => {
                    const labelId = `checkbox-list-label-${criterio.id}`
                    return (
                      <Grid item key={criterio.id} xs>
                        <ListItem key={criterio.id} role={undefined} dense button onClick={handleToggle(criterio.id)}>
                          <ListItemIcon>
                            <Checkbox
                              edge='start'
                              checked={checked.indexOf(criterio.id) !== -1}
                              tabIndex={-1}
                              disableRipple
                              inputProps={{ 'aria-labelledby': labelId }}
                            />
                          </ListItemIcon>
                          <ListItemText id={labelId} primary={criterio.nome} />
                        </ListItem>
                      </Grid>
                    )
                  })}
                </List>
              </Paper>
            </Grid>

            <Grid item xs>
              <Paper>
                <Label>
                  Critérios Relacionados Ao Contexto Técnico E Características Dos Requisitos
                </Label>

                <List>
                  {criteriosTecnico.map((criterio) => {
                    const labelId = `checkbox-list-label-${criterio.id}`
                    return (
                      <Grid item key={criterio.id} xs>
                        <ListItem key={criterio.id} role={undefined} dense button onClick={handleToggle(criterio.id)}>
                          <ListItemIcon>
                            <Checkbox
                              edge='start'
                              checked={checked.indexOf(criterio.id) !== -1}
                              tabIndex={-1}
                              disableRipple
                              inputProps={{ 'aria-labelledby': labelId }}
                            />
                          </ListItemIcon>
                          <ListItemText id={labelId} primary={criterio.nome} />
                        </ListItem>
                      </Grid>
                    )
                  })}
                </List>
              </Paper>
            </Grid>
          </CriterioGrid>

          <Grid container spacing={2} justify='flex-end'>
            <Grid item>
              <Button variant='outlined' onClick={handleClickLimpar}>
                Limpar
              </Button>
            </Grid>

            <Grid item>
              <Button disabled={error} variant='outlined' onClick={handleClickSalvar} color='primary'>
                Salvar
              </Button>
            </Grid>
          </Grid>
        </Paper>
      </TabPanel>

      <Snackbar open={openSnackbar} autoHideDuration={4000} onClose={handleCloseSnackbar}>
        <Alert onClose={handleCloseSnackbar} severity='success'>
          Critérios de Priorização Salvos com Sucesso!
        </Alert>
      </Snackbar>
    </>
  )
}

function a11yProps (index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`
  }
}

const Paper = styled(Card)`
padding: 30px;
min-width: 400px;
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

function Alert (props) {
  return <MuiAlert elevation={6} variant='filled' {...props} />
}

export default DetalheProjeto
