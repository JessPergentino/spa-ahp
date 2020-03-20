import React, { useContext, useState } from 'react'
import { withRouter } from 'react-router-dom'
import styled from 'styled-components'
import LockIcon from '@material-ui/icons/Lock'
import { TextField, Button, Grid } from '@material-ui/core'
import Checkbox from './checkbox'

import { AuthContext } from 'contexts/auth'

const Login = () => {
  const [userInfo, setUserInfo] = useState({
    email: '',
    senha: '',
    error: ''
  })
  const { login } = useContext(AuthContext)

  const handleLogin = async e => {
    e.preventDefault()
    const { email, senha } = userInfo
    if (!email || !senha) {
      setUserInfo(prevState => {
        return {
          ...prevState,
          error: 'Preencha e-mail e senha para continuar!'
        }
      })
    } else {
      login(email, senha)
    }
  }

  return (
    <Form onSubmit={handleLogin} noValidate autoComplete='off'>
      <Container>
        <Grid container justify='center' spacing={2}>
          <Grid item container justify='center'>
            <LogoLogin />
          </Grid>

          <Grid item container justify='center'>
            <h1>Login</h1>
          </Grid>

          {userInfo.error && <p>{userInfo.error}</p>}

          <Grid item container justify='center'>
            <EmailText onChange={(e) => {
              const val = e.target.value
              setUserInfo(prevState => {
                return { ...prevState, email: val }
              })
            }}
            />
          </Grid>

          <Grid item container justify='center'>
            <PasswordText onChange={(e) => {
              const val = e.target.value
              setUserInfo(prevState => {
                return { ...prevState, senha: val }
              })
            }}
            />
          </Grid>

          <Grid item container justify='center'>
            <Checkbox />
          </Grid>

          <Grid item container justify='center'>
            <Button type='submit' variant='contained' color='primary'>
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

export default withRouter(Login)
