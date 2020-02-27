/* eslint-disable no-restricted-globals */
import React, { lazy, Suspense, useState, useContext } from 'react'
/* import ajax from '@fdaciuk/ajax' */
import t from 'prop-types'
import { Route, Switch, Redirect } from 'react-router-dom'
import { LinearProgress } from '@material-ui/core'

import { AuthContext } from 'contexts/auth'

const MainPage = lazy(() => import('pages/main'))
const Login = lazy(() => import('pages/login'))

function App () {
  const { userInfo, handleLogout } = useContext(AuthContext)
  const [didCheckUserIn] = useState(false)

  const { isUserLoggedIn, token } = userInfo

  console.log(token)
  window.logout = handleLogout

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
