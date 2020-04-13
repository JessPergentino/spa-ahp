import React, { useState } from 'react'
import styled from 'styled-components'
import AccountCircleIcon from '@material-ui/icons/AccountCircle'
import { TextField, Button, Grid, Typography } from '@material-ui/core'

import { Paper } from 'ui'

const Cadastro = () => {
  const [userInfo, setUserInfo] = useState({
    email: '',
    senha: '',
    error: ''
  })

  const handleLogin = async e => {
    e.preventDefault()
    console.log('Cadastrou', userInfo)
  }
  return (
    <>
      <Form onSubmit={handleLogin} noValidate autoComplete='off'>
        <Container>
          <Paper>
            <Grid container direction='column' justify='center' alignItems='center' spacing={2}>
              <Grid item>
                <LogoCadastro />
              </Grid>

              <Grid item>
                <Typography>Cadastre-se</Typography>
              </Grid>

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
                <PasswordText onChange={(e) => {
                  const val = e.target.value
                  setUserInfo(prevState => {
                    return { ...prevState, senha: val }
                  })
                }}
                />
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
    </>
  )
}

const Container = styled.div`
padding: 70px;
width: 100%;
`

const Form = styled.form`
`

const LogoCadastro = styled(AccountCircleIcon).attrs({
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

export default Cadastro
