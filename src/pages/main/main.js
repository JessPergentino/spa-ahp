import React, { Suspense } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { Switch, Route } from 'react-router-dom'
import { withStyles, LinearProgress } from '@material-ui/core'

import Header from './header'
import Drawer from './drawer'

import {
  HOME,
  PROJETOS,
  DETALHE_PROJETO,
  REQUISITOS,
  PRIORIZACAO,
  GRAFICOS,
  CONFIGURACOES,
  TUTORIAIS,
  DETALHE_MEMBRO,
  DETALHE_REQUISITO
} from 'routes'

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex'
  },
  toolbar: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing(3)
  }
}))

const PaginaInicial = React.lazy(() => import('pages/pagina-inicial'))
const Projetos = React.lazy(() => import('pages/projetos'))
const DetalheProjeto = React.lazy(() => import('pages/detalhe-projeto'))
const DetalheMembro = React.lazy(() => import('pages/detalhe-membro'))
const Requisitos = React.lazy(() => import('pages/requisitos'))
const DetalheRequisito = React.lazy(() => import('pages/detalhe-requisito'))
const Priorizacao = React.lazy(() => import('pages/priorizacao'))
const Graficos = React.lazy(() => import('pages/graficos'))
const Configuracoes = React.lazy(() => import('pages/configuracoes'))
const Tutoriais = React.lazy(() => import('pages/tutoriais'))

const Main = () => {
  const classes = useStyles()

  return (
    <>
      <div className={classes.root}>
        <Header />

        <Drawer />

        <Spacer />

        <main className={classes.content}>
          <div className={classes.toolbar} />
          <Suspense fallback={<LinearProgress />}>
            <Switch>
              <Route path={HOME} exact component={PaginaInicial} />
              <Route path={PROJETOS} component={Projetos} />
              <Route path={DETALHE_PROJETO} component={DetalheProjeto} />
              <Route path={DETALHE_MEMBRO} component={DetalheMembro} />
              <Route path={REQUISITOS} component={Requisitos} />
              <Route path={DETALHE_REQUISITO} component={DetalheRequisito} />
              <Route path={PRIORIZACAO} component={Priorizacao} />
              <Route path={GRAFICOS} component={Graficos} />
              <Route path={CONFIGURACOES} component={Configuracoes} />
              <Route path={TUTORIAIS} component={Tutoriais} />
            </Switch>
          </Suspense>
        </main>
      </div>
    </>
  )
}

const style = (theme) => ({
  main: theme.mixins.toolbar
})

const Spacer = withStyles(style)(({ classes }) => (
  <div className={classes.main} />
))

export default Main
