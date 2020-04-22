import React, { useState, useEffect, useContext } from 'react'
import t from 'prop-types'

import {
  Checkbox,
  Grid,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Button,
  Typography
} from '@material-ui/core'

import CriterioGrid from 'pages/detalhe-projeto/criterio-grid'
import { Page, Alerta, SnackBar } from 'ui'
import { CriterioContext } from 'contexts/criterios'
import { ProjetoContext } from 'contexts/projetos'

import api from 'services/api'

const SelecionarCriterios = (
  {
    projetoAtual
  }
) => {
  const { criterios, listarTodosCriterios } = useContext(CriterioContext)
  const { setCriteriosProjetoAtual } = useContext(ProjetoContext)

  const [openSnackbar, setOpenSnackbar] = useState(false)
  const [criteriosBeneficio, setCriteriosBeneficio] = useState([])
  const [criteriosCusto, setCriteriosCusto] = useState([])
  const [criteriosEmpresarial, setCriteriosEmpresarial] = useState([])
  const [criteriosPenalidade, setCriteriosPenalidade] = useState([])
  const [criteriosRisco, setCriteriosRisco] = useState([])
  const [criteriosTecnico, setCriteriosTecnico] = useState([])

  useEffect(() => {
    listarTodosCriterios()
  }, [listarTodosCriterios])

  useEffect(() => {
    setCriteriosBeneficio(criterios.filter((criterio) => criterio.categoria === 'BENEFICIO'))
    setCriteriosCusto(criterios.filter((criterio) => criterio.categoria === 'CUSTO'))
    setCriteriosEmpresarial(criterios.filter((criterio) => criterio.categoria === 'EMPRESARIAL'))
    setCriteriosPenalidade(criterios.filter((criterio) => criterio.categoria === 'PENALIDADE'))
    setCriteriosRisco(criterios.filter((criterio) => criterio.categoria === 'RISCO'))
    setCriteriosTecnico(criterios.filter((criterio) => criterio.categoria === 'TECNICO'))
  }, [criterios])

  const error = projetoAtual.criterios.filter(v => v).length > 15

  const handleClickSnackbar = () => {
    setOpenSnackbar(true)
  }

  const handleCloseSnackbar = (event, reason) => {
    if (reason === 'clickaway') {
      return
    }
    setOpenSnackbar(false)
  }

  const handleToggle = value => (event) => {
    const criterioSelecionado = criterios.find((criterio) => criterio.id === value)

    if (event.target.checked) {
      setCriteriosProjetoAtual(projetoAtual.criterios.concat(criterioSelecionado))
    } else {
      setCriteriosProjetoAtual(projetoAtual.criterios.filter((c) => c.id !== value))
    }
  }

  const handleClickSalvar = () => {
    const ids = projetoAtual.criterios.map((item) => item.id)
    api.post(`/criterios_projeto/${projetoAtual.id}`, ids)
      .then((response) => {
        handleClickSnackbar()
      })
  }

  return (
    <>
      {projetoAtual !== null && (
        <Page>
          <Typography variant='h6'>
            Selecione os Critérios de Priorização
          </Typography>

          {error &&
            (
              <Alerta
                severidade='error'
                mensagem='Você só pode selecionar até no máximo 15 critérios.'
              />
            )}

          <CriterioGrid>
            <Grid item xs>
              <Page>
                <Typography variant='h6'>
                  Critérios Relacionados Aos Benefícios
                </Typography>

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
              </Page>
            </Grid>

            <Grid item xs>
              <Page>
                <Typography variant='h6'>
                  Critérios Relacionados Aos Custos
                </Typography>

                <List>
                  {criteriosCusto.map((criterio) => {
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
              </Page>
            </Grid>

            <Grid item xs>
              <Page>
                <Typography variant='h6'>
                  Critérios Relacionados aos Riscos
                </Typography>

                <List>
                  {criteriosRisco.map((criterio) => {
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
              </Page>
            </Grid>

            <Grid item xs>
              <Page>
                <Typography variant='h6'>
                  Critérios Relacionados a Penalidades e Prevenção de Penalidades
                </Typography>

                <List>
                  {criteriosPenalidade.map((criterio) => {
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
              </Page>
            </Grid>

            <Grid item xs>
              <Page>
                <Typography variant='h6'>
                  Critérios Relacionados Ao Contexto Empresarial
                </Typography>

                <List>
                  {criteriosEmpresarial.map((criterio) => {
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
              </Page>
            </Grid>

            <Grid item xs>
              <Page>
                <Typography variant='h6'>
                  Critérios Relacionados Ao Contexto Técnico E Características Dos Requisitos
                </Typography>

                <List>
                  {criteriosTecnico.map((criterio) => {
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
              </Page>
            </Grid>
          </CriterioGrid>

          <Grid container spacing={2} justify='flex-end'>
            <Grid item>
              <Button disabled={error} variant='outlined' onClick={handleClickSalvar} color='primary'>
                Salvar
              </Button>
            </Grid>
          </Grid>
        </Page>
      )}

      <SnackBar
        openSnackbar={openSnackbar}
        duracao={4000}
        handleClose={handleCloseSnackbar}
        tipo='success'
        mensagem='Critérios de Priorização Salvos com Sucesso!'
      />
    </>
  )
}

SelecionarCriterios.propTypes = {
  projetoAtual: t.object
}

export default SelecionarCriterios
