/* eslint-disable no-restricted-globals */
import React, { lazy, Suspense, useContext, useEffect } from 'react'
import t from 'prop-types'
import { Route, Switch, Redirect } from 'react-router-dom'
import { LinearProgress } from '@material-ui/core'
import { LOGIN, HOME } from 'routes'
import { get } from 'idb-keyval'

import { AuthContext } from 'contexts/auth'
import { ProjetoContext } from 'contexts/projetos'

const MainPage = lazy(() => import('pages/main'))
const Login = lazy(() => import('pages/login'))

function App () {
  const { userLogin, setUserLogin } = useContext(AuthContext)
  const { listarProjetos } = useContext(ProjetoContext)
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
          listarProjetos()
        }
      })
  }, [setUserLogin, listarProjetos])

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
