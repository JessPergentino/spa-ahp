import React, { useState } from 'react'
import { useParams, useHistory } from 'react-router-dom'
import AccountCircleIcon from '@material-ui/icons/AccountCircle'
import { TextField, Button, Grid, Typography } from '@material-ui/core'

import { Page, SnackBar } from 'ui'

import api from 'services/api'
import { validarEmail } from 'services/utils'
import { LOGIN } from 'routes'

const Cadastro = () => {
  const { id } = useParams()
  const history = useHistory()

  const [openSnackbar, setOpenSnackbar] = useState(false)
  const [userInfo, setUserInfo] = useState({
    nome: '',
    email: '',
    senha: '',
    confSenha: '',
    organizacao: '',
    codProjeto: '',
    errorSenha: '',
    errorEmail: ''
  })

  const handleClickSnackbar = () => {
    setOpenSnackbar(true)
  }

  const handleCloseSnackbar = (event, reason) => {
    if (reason === 'clickaway') {
      return
    }
    setOpenSnackbar(false)
  }

  const handleCadastrar = e => {
    e.preventDefault()
    const { nome, email, senha, organizacao, codProjeto } = userInfo

    const usuario = {
      nome,
      email,
      senha,
      organizacao,
      codProjeto
    }

    if (senha === userInfo.confSenha && validarEmail(usuario.email)) {
      api.post('/usuarios', usuario)
        .then((response) => {
          handleClickSnackbar()
          history.push(LOGIN)
        })
    } else if (senha !== userInfo.confSenha || validarEmail(email) === false) {
      setUserInfo(prevState => {
        return {
          ...prevState,
          errorSenha: senha !== userInfo.confSenha ? 'A confirmação de senha não confere' : '',
          errorEmail: validarEmail(email) === false ? 'Digite um email válido' : ''
        }
      })
    }
  }
  return (
    <>
      <Page>
        <form onSubmit={handleCadastrar}>
          <Grid
            container
            direction='column'
            alignItems='center'
            spacing={3}
          >
            <Grid item>
              <AccountCircleIcon color='primary' style={{ fontSize: 60 }} />
            </Grid>

            <Grid item>
              <Typography variant='h5'>Cadastre-se</Typography>
            </Grid>

            <Grid item>
              <Typography variant='subtitle1'>Preencha os campos abaixo para se cadastrar</Typography>
            </Grid>

            <Grid item>
              <TextField
                required
                id='outlined-nome'
                label='Nome Completo'
                variant='outlined'
                onChange={(e) => {
                  const val = e.target.value
                  setUserInfo(prevState => {
                    return { ...prevState, nome: val }
                  })
                }}
                style={{ width: '400px' }}
              />
            </Grid>

            <Grid item>
              <TextField
                required
                id='outlined-email'
                label='Email'
                variant='outlined'
                onChange={(e) => {
                  const val = e.target.value
                  setUserInfo(prevState => {
                    return { ...prevState, email: val }
                  })
                }}
                error={userInfo.errorEmail !== ''}
                helperText={userInfo.errorEmail}
                style={{ width: '400px' }}
              />
            </Grid>

            <Grid item>
              <TextField
                required
                id='outlined-senha'
                label='Senha'
                variant='outlined'
                type='password'
                onChange={(e) => {
                  const val = e.target.value
                  setUserInfo(prevState => {
                    return { ...prevState, senha: val }
                  })
                }}
                error={userInfo.errorSenha !== ''}
                helperText={userInfo.errorSenha}
                style={{ width: '400px' }}
              />
            </Grid>

            <Grid item>
              <TextField
                required
                id='outlined-conf-senha'
                label='Confirme a Sennha'
                variant='outlined'
                type='password'
                onChange={(e) => {
                  const val = e.target.value
                  setUserInfo(prevState => {
                    return { ...prevState, confSenha: val }
                  })
                }}
                style={{ width: '400px' }}
              />
            </Grid>

            <Grid item>
              <TextField
                required
                id='outlined-organizacao'
                label='Organização'
                variant='outlined'
                onChange={(e) => {
                  const val = e.target.value
                  setUserInfo(prevState => {
                    return { ...prevState, organizacao: val }
                  })
                }}
                style={{ width: '400px' }}
              />
            </Grid>

            {id !== undefined && (
              <Grid item>
                <TextField
                  required
                  id='outlined-projeto'
                  label='Código do Projeto'
                  variant='outlined'
                  onChange={(e) => {
                    const val = e.target.value
                    setUserInfo(prevState => {
                      return { ...prevState, codProjeto: val }
                    })
                  }}
                  style={{ width: '400px' }}
                />
              </Grid>
            )}

            <Grid item>
              <Button type='submit' variant='contained' color='primary'>
                Cadastrar
              </Button>
            </Grid>
          </Grid>
        </form>
      </Page>

      <SnackBar
        openSnackbar={openSnackbar}
        duracao={4000}
        handleClose={handleCloseSnackbar}
        tipo='success'
        mensagem='Cadastro efetuado com sucesso!'
      />
    </>
  )
}

export default Cadastro
