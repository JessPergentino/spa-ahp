/* eslint-disable no-restricted-globals */
import React, { lazy, Suspense, useContext, useEffect } from 'react'
import t from 'prop-types'
import { Route, Switch, Redirect } from 'react-router-dom'
import { LinearProgress } from '@material-ui/core'
import { LOGIN, HOME } from 'routes'
import { get, del } from 'idb-keyval'

import { AuthContext } from 'contexts/auth'
import { ProjetoContext } from 'contexts/projetos'
import { RequisitoContext } from 'contexts/requisitos'

const MainPage = lazy(() => import('pages/main'))
const Login = lazy(() => import('pages/login'))

function App () {
  const { userLogin, setUserLogin } = useContext(AuthContext)
  const { listarProjetos, buscarProjeto } = useContext(ProjetoContext)
  const { listarRequisitos } = useContext(RequisitoContext)
  const { isUserLoggedIn } = userLogin

  useEffect(() => {
    get('usuario')
      .then((usuario) => {
        if (usuario) {
          setUserLogin({
            isUserLoggedIn: true,
            user: usuario,
            primeiroNome: usuario.nome.split(' ')[0]
          })

          if (usuario.projetos.length > 0) {
            buscarProjeto(usuario.projetos[0].id)
            listarRequisitos(usuario.projetos[0].id)
          }
          listarProjetos(usuario.id)
        }
      })
    window.logout = () => del('usuario')
  }, [setUserLogin, listarProjetos, listarRequisitos, buscarProjeto])

  if (isUserLoggedIn && location.pathname === LOGIN) {
    return <Redirect to={HOME} />
  }

  if (!isUserLoggedIn && location.pathname !== LOGIN) {
    return <Redirect to={LOGIN} />
  }

  return (
    <Suspense fallback={<LinearProgress />}>
      <Switch>
        <Route path={LOGIN} component={Login} />
        <Route component={MainPage} />
      </Switch>
    </Suspense>
  )
}

App.propType = {
  location: t.object.isRequired
}

export default App
