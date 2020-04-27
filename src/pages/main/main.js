import React, { Suspense } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { Switch } from 'react-router-dom'
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
  TUTORIAIS,
  DETALHE_MEMBRO,
  DETALHE_REQUISITO
} from 'routes'
import { PrivateRoute } from 'route-component'

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
              <PrivateRoute path={HOME} exact component={PaginaInicial} />
              <PrivateRoute path={PROJETOS} component={Projetos} />
              <PrivateRoute path={DETALHE_PROJETO} component={DetalheProjeto} />
              <PrivateRoute path={DETALHE_MEMBRO} component={DetalheMembro} />
              <PrivateRoute path={REQUISITOS} component={Requisitos} />
              <PrivateRoute path={DETALHE_REQUISITO} component={DetalheRequisito} />
              <PrivateRoute path={PRIORIZACAO} component={Priorizacao} />
              <PrivateRoute path={GRAFICOS} component={Graficos} />
              <PrivateRoute path={TUTORIAIS} component={Tutoriais} />
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
