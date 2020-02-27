import React, { useContext } from 'react'
import styled from 'styled-components'
import LockIcon from '@material-ui/icons/Lock'
import { TextField, Button, Grid } from '@material-ui/core'
import Checkbox from './checkbox'

import { AuthContext } from 'contexts/auth'

const Login = () => {
  const { handleLogin } = useContext(AuthContext)

  return (
    <Form noValidate autoComplete='off'>
      <Container>
        <Grid container justify='center' spacing={2}>
          <Grid item container justify='center'>
            <LogoLogin />
          </Grid>

          <Grid item container justify='center'>
            <h1>Login</h1>
          </Grid>

          <Grid item container justify='center'>
            <EmailText />
          </Grid>

          <Grid item container justify='center'>
            <PasswordText />
          </Grid>

          <Grid item container justify='center'>
            <Checkbox />
          </Grid>

          <Grid item container justify='center'>
            <Button onClick={handleLogin} variant='contained' color='primary'>
              Entrar
            </Button>
          </Grid>
        </Grid>
      </Container>
    </Form>
  )
}

const Container = styled.div`
padding: 70px;
`

const Form = styled.form`
width: 100%;
`

const LogoLogin = styled(LockIcon).attrs({
  color: 'primary',
  fontSize: 'large'
})`
  && {
  }
`

const EmailText = styled(TextField).attrs({
  id: 'email-input',
  label: 'email',
  variant: 'outlined'
})`
&& {
  width: 400px;
}
`

const PasswordText = styled(TextField).attrs({
  id: 'password-input',
  variant: 'outlined',
  label: 'Senha',
  type: 'password',
  autoComplete: 'current-password'
})`
&& {
  width: 400px;
}
`

export default Login
