import React, { useContext } from 'react'
import t from 'prop-types'
import { Route, Redirect } from 'react-router-dom'
import { AuthContext } from 'contexts/auth'
import { HOME } from 'routes'

const PublicRoute = ({ component: Component, restricted, ...rest }) => {
  const { userLogin } = useContext(AuthContext)
  return (
    // restricted = false meaning public route
    // restricted = true meaning restricted route
    <Route
      {...rest} render={props => (
        userLogin.isUserLoggedIn && restricted
          ? <Redirect to={HOME} />
          : <Component {...props} />
      )}
    />
  )
}

PublicRoute.propTypes = {
  component: t.any,
  restricted: t.bool
}

export default PublicRoute
