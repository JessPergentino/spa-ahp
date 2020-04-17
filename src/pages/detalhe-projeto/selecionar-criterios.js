import React, { useState, useEffect } from 'react'
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
import { Page } from 'ui'

const SelecionarCriterios = (
  {
    projetoAtual,
    criteriosBeneficio,
    criteriosCusto,
    criteriosRisco,
    criteriosPenalidade,
    criteriosEmpresarial,
    criteriosTecnico,
    handleClickSnackbar
  }
) => {
  const [checked, setChecked] = useState(projetoAtual.criterios.map((item) => item.id))

  useEffect(() => {
    setChecked(projetoAtual.criterios.map((item) => item.id))
  }, [projetoAtual])

  const error = checked.filter(v => v).length > 15

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

  const handleClickLimpar = () => {
    setChecked([])
  }

  const handleClickSalvar = () => {
    console.log('salvou')
    handleClickSnackbar()
  }

  return (
    <Page>
      <Typography variant='h6'>
        Selecione os Critérios de Priorização
      </Typography>

      {error && (<Typography color='secondary'>Você só pode selecionar até no máximo 15 critérios.</Typography>)}

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
          </Page>
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
    </Page>
  )
}

SelecionarCriterios.propTypes = {
  projetoAtual: t.object,
  criteriosBeneficio: t.array,
  criteriosCusto: t.array,
  criteriosRisco: t.array,
  criteriosPenalidade: t.array,
  criteriosEmpresarial: t.array,
  criteriosTecnico: t.array,
  handleClickSnackbar: t.func
}

export default SelecionarCriterios
