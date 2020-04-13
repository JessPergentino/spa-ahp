import React, { useContext, useState } from 'react'
import { withRouter, Link } from 'react-router-dom'
import styled from 'styled-components'
import LockIcon from '@material-ui/icons/Lock'
import { TextField, Button, Grid, Typography } from '@material-ui/core'

import { AuthContext } from 'contexts/auth'
import { Paper } from 'ui'
import { CADASTRAR } from 'routes'

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
        <Paper>
          <Grid container direction='column' justify='center' alignItems='center' spacing={2}>
            <Grid item>
              <LogoLogin />
            </Grid>

            <Grid item>
              <h1>Login</h1>
            </Grid>

            {userInfo.error && <p>{userInfo.error}</p>}

            <Grid item>
              <EmailText onChange={(e) => {
                const val = e.target.value
                setUserInfo(prevState => {
                  return { ...prevState, email: val }
                })
              }}
              />
            </Grid>

            <Grid item>
              <PasswordText onChange={(e) => {
                const val = e.target.value
                setUserInfo(prevState => {
                  return { ...prevState, senha: val }
                })
              }}
              />
            </Grid>

            <Grid item>
              <Typography>
                <Typography component={Link} to={{ pathname: CADASTRAR }}>
                  Ainda não tem conta? Cadastre-se!
                </Typography>
              </Typography>
            </Grid>

            <Grid item>
              <Button type='submit' variant='contained' color='primary'>
                Entrar
              </Button>
            </Grid>
          </Grid>
        </Paper>
      </Container>
    </Form>
  )
}

const Container = styled.div`
padding: 70px;
width: 100%;
`

const Form = styled.form`
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
