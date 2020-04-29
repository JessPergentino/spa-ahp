import React, { useContext } from 'react'
import t from 'prop-types'
import { Route, Redirect } from 'react-router-dom'
import { AuthContext } from 'contexts/auth'
import { LOGIN } from 'routes'

const PrivateRoute = ({ component: Component, ...rest }) => {
  const { userLogin } = useContext(AuthContext)
  return (
    <Route
      {...rest} render={props => (
        userLogin.isUserLoggedIn
          ? <Component {...props} />
          : <Redirect to={LOGIN} />
      )}
    />
  )
}

PrivateRoute.propTypes = {
  component: t.any
}

export default PrivateRoute
