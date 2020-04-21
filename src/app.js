/* eslint-disable no-restricted-globals */
import React, { lazy, Suspense, useContext, useEffect } from 'react'
import { Route, Switch, Redirect } from 'react-router-dom'
import { LinearProgress } from '@material-ui/core'
import { LOGIN, HOME, CADASTRAR } from 'routes'
import { get } from 'idb-keyval'

import { AuthContext } from 'contexts/auth'
import { ProjetoContext } from 'contexts/projetos'

const MainPage = lazy(() => import('pages/main'))
const Login = lazy(() => import('pages/login'))

const App = () => {
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
          listarProjetos(usuario.id)
        }
      })
  }, [setUserLogin, listarProjetos])

  if (isUserLoggedIn && location.pathname === LOGIN) {
    return <Redirect to={HOME} />
  }

  if (!isUserLoggedIn && (location.pathname !== LOGIN)) {
    if (location.pathname === CADASTRAR) {
      return <Redirect to={CADASTRAR} />
    }
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

export default App
