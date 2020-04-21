import React, { useState, useContext, useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'

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
  TextField
} from '@material-ui/core'
import InfoIcon from '@material-ui/icons/Info'

import TabPanel from 'pages/detalhe-projeto/tab-panel'
import CriterioGrid from 'pages/detalhe-projeto/criterio-grid'
import { TabelaDefault, Modal, SnackBar } from 'ui'

import { AuthContext } from 'contexts/auth'
import { CriterioContext } from 'contexts/criterios'
import { ProjetoContext } from 'contexts/projetos'
import { DETALHE_MEMBRO } from 'routes'
import api from 'services/api'

const DetalheProjeto = () => {
  const { projetoAtual, buscarProjeto, setCriteriosProjetoAtual } = useContext(ProjetoContext)
  const { userLogin } = useContext(AuthContext)
  const {
    criteriosBeneficio,
    criteriosCusto,
    criteriosRisco,
    criteriosPenalidade,
    criteriosEmpresarial,
    criteriosTecnico,
    listarTodosCriteriosPorCategoria
  } = useContext(CriterioContext)

  const [abrirModalAdd, setAbrirModalAdd] = useState(false)
  const [value, setValue] = useState(0)
  const checked = projetoAtual.criterios.map((item) => item.id)
  const [openSnackbar, setOpenSnackbar] = useState(false)
  const [emailMembro, setEmailMembro] = useState({
    email: '',
    erro: false,
    helper: ''
  })

  const { id } = useParams()

  useEffect(() => {
    buscarProjeto(id)
  }, [buscarProjeto, id])

  useEffect(() => {
    listarTodosCriteriosPorCategoria()
  }, [listarTodosCriteriosPorCategoria])

  const error = checked.filter(v => v).length > 15
  const admin = userLogin.user.permissao !== 'ADMIN'

  const handleToggle = value => (event) => {
    console.log(1, value)
    const criterioSelecionado = criteriosBeneficio.find((criterio) => criterio.id === value)

    console.log(event.target.checked)
    if (event.target.checked) {
      console.log(2, criterioSelecionado)
      setCriteriosProjetoAtual(projetoAtual.criterios.concat(criterioSelecionado))
    } else {
      console.log(3)
      setCriteriosProjetoAtual(projetoAtual.criterios.filter((c) => c.id !== value))
    }
  }

  const handleChange = (event, newValue) => {
    setValue(newValue)
  }

  const handleClickLimpar = () => {
    // setChecked([])
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

  const validarEmail = () => {
    const usuario = emailMembro.email.substring(0, emailMembro.email.indexOf('@'))
    const dominio = emailMembro.email.substring(emailMembro.email.indexOf('@') + 1, emailMembro.email.length)

    if ((usuario.length >= 1) &&
      (dominio.length >= 3) &&
      (usuario.search('@') === -1) &&
      (dominio.search('@') === -1) &&
      (usuario.search(' ') === -1) &&
      (dominio.search(' ') === -1) &&
      (dominio.search('.') !== -1) &&
      (dominio.indexOf('.') >= 1) &&
      (dominio.lastIndexOf('.') < dominio.length - 1)) {
      return true
    } else {
      return false
    }
  }

  const handleAdicionarMembro = () => {
    const email = {
      email: emailMembro.email,
      membro: userLogin.user.nome
    }
    if (validarEmail()) {
      api.post(`/projetos_membro/${projetoAtual.id}`, email)
        .then((response) => {
          buscarProjeto(projetoAtual.id)
        })
      setAbrirModalAdd(false)
    } else {
      setEmailMembro(prevState => {
        return { ...prevState, error: true, helper: 'Digite um email valido' }
      })
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
      field: 'permissao',
      lookup: { ADMIN: 'Administrador', MEMBRO: 'Membro' }
    }
  ]

  const dados = projetoAtual.membros

  const actions = [
    {
      icon: () => (
        <IconButton component={Link} to={{ pathname: DETALHE_MEMBRO }} color='inherit'>
          <InfoIcon />
        </IconButton>),
      tooltip: 'info',
      onClick: (evt, data) => {
        window.location.state = {
          usuario: data
        }
      }
    },
    {
      icon: 'add',
      tooltip: 'Add Membro',
      isFreeAction: true,
      onClick: () => setAbrirModalAdd(true)
    }
  ]

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
              projetoAtual.membros.filter((item) => item.id === projetoAtual.ownerId)[0].nome
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
                        <ListItem key={criterio.id} role={undefined} dense button component='label'>
                          <ListItemIcon>
                            <Checkbox
                              edge='start'
                              checked={projetoAtual.criterios.some((c) => c.id === criterio.id)}
                              tabIndex={-1}
                              disableRipple
                              inputProps={{ 'aria-labelledby': labelId }}
                              onClick={handleToggle(criterio.id)}
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
                              checked={projetoAtual.criterios.some((c) => c.id === criterio.id)}
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
                              checked={projetoAtual.criterios.some((c) => c.id === criterio.id)}
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
                              checked={projetoAtual.criterios.some((c) => c.id === criterio.id)}
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
                              checked={projetoAtual.criterios.some((c) => c.id === criterio.id)}
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
                              checked={projetoAtual.criterios.some((c) => c.id === criterio.id)}
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

      <SnackBar
        openSnackbar={openSnackbar}
        duracao={4000}
        handleClose={handleCloseSnackbar}
        tipo='success'
        mensagem='Critérios de Priorização Salvos com Sucesso!'
      />

      <Modal
        titulo={`Adicionar Membro ao Projeto ${projetoAtual.nome}`}
        open={abrirModalAdd}
        handleClose={() => setAbrirModalAdd(false)}
        handleSave={handleAdicionarMembro}
        operacao='Adicionar'
        style={{ width: '300px' }}
      >
        <TextField
          onChange={(e) => {
            const val = e.target.value
            setEmailMembro(prevState => {
              return { ...prevState, email: val }
            })
          }}
          autoFocus
          margin='normal'
          id='emailMembro'
          label='Email do Novo Membro'
          type='text'
          fullWidth
          error={emailMembro.error}
          helperText={emailMembro.helper}
        />
      </Modal>
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

export default DetalheProjeto
