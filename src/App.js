/* eslint-disable no-restricted-globals */
import React, { lazy, Suspense, useState, useContext, useEffect } from 'react'
import ajax from '@fdaciuk/ajax'
import t from 'prop-types'
import { Route, Switch, Redirect } from 'react-router-dom'
import { LinearProgress } from '@material-ui/core'

import { AuthContext } from 'contexts/auth'

const MainPage = lazy(() => import('pages/main'))
const Login = lazy(() => import('pages/login'))

function App () {
  const { userInfo, setUserInfo, handleLogout } = useContext(AuthContext)
  const [didCheckUserIn, setDidCheckUserIn] = useState(false)

  const { isUserLoggedIn, token } = userInfo

  useEffect(() => {
    console.log(token)
    // Deveria verificar se é um usuário valido atraves do token, porém o token está null
    ajax({
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      }
    }).get('http://localhost:8080/usuario/3')
      .then((result) => {
        console.log(result)
        if (result.data) {
          setUserInfo({
            isUserLoggedIn: true,
            user: result.data
          })
        }
        setDidCheckUserIn(true)
        window.logout = handleLogout
      })
  }, [])

  if (!didCheckUserIn) {
    /* return <LinearProgress /> */
  }

  if (isUserLoggedIn && location.pathname === '/login') {
    return <Redirect to='/' />
  }

  if (!isUserLoggedIn && location.pathname !== '/login') {
    return <Redirect to='/login' />
  }

  return (
    <Suspense fallback={<LinearProgress />}>
      <Switch>
        <Route path='/login' component={Login} />
        <Route component={MainPage} />
      </Switch>
    </Suspense>
  )
}

App.propType = {
  location: t.object.isRequired
}

export default App
