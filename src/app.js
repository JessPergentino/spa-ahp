/* eslint-disable no-restricted-globals */
import React, { lazy, Suspense, useContext, useEffect } from 'react'
import { Switch } from 'react-router-dom'
import { LinearProgress } from '@material-ui/core'
import { LOGIN, CADASTRAR_MEMBRO, CADASTRAR } from 'routes'
import { get } from 'idb-keyval'

import { AuthContext } from 'contexts/auth'
import { ProjetoContext } from 'contexts/projetos'
import { PublicRoute, PrivateRoute } from 'route-component'

const MainPage = lazy(() => import('pages/main'))
const Login = lazy(() => import('pages/login'))
const Cadastrar = lazy(() => import('pages/cadastro'))

const App = () => {
  const { setUserLogin } = useContext(AuthContext)
  const { listarProjetos } = useContext(ProjetoContext)

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

  return (
    <Suspense fallback={<LinearProgress />}>
      <Switch>
        <PublicRoute path={LOGIN} restricted component={Login} />
        <PublicRoute path={[CADASTRAR_MEMBRO, CADASTRAR]} restricted component={Cadastrar} />
        <PrivateRoute component={MainPage} />
      </Switch>
    </Suspense>
  )
}

export default App
