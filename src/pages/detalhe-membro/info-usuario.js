import React, { useState, useEffect, useContext } from 'react'
import styled from 'styled-components'
import {
  Paper as MaterialPaper,
  Grid,
  Typography,
  IconButton,
  Tooltip
} from '@material-ui/core'

import ContactMailIcon from '@material-ui/icons/ContactMail'
import AccountCircleIcon from '@material-ui/icons/AccountCircle'
import DomainIcon from '@material-ui/icons/Domain'
import PermIdentityIcon from '@material-ui/icons/PermIdentity'
import EditIcon from '@material-ui/icons/Edit'
import VpnKeyIcon from '@material-ui/icons/VpnKey'

import ModalEdtPerfil from 'pages/detalhe-membro/edt-perfil'
import ModalEdtSenha from 'pages/detalhe-membro/edt-senha'

import { AuthContext } from 'contexts/auth'

const InfoUsuario = () => {
  const { userLogin } = useContext(AuthContext)
  const usuarioAtual = window.location.state.usuario

  const [usuario, setUsuario] = useState({})
  const [abrirModalAlterarPerfil, setAbrirModalAlterarPerfil] = useState(false)
  const [abrirModalAlterarSenha, setAbrirModalAlterarSenha] = useState(false)

  useEffect(() => {
    setUsuario(usuarioAtual)
  }, [usuarioAtual])

  const handleOpenModalAlterarPerfil = () => {
    setAbrirModalAlterarPerfil(true)
  }

  const handleFecharAlterarPerfil = () => {
    setAbrirModalAlterarPerfil(false)
  }

  const handleOpenModalAlterarSenha = () => {
    setAbrirModalAlterarSenha(true)
  }

  const handleFecharAlterarSenha = () => {
    setAbrirModalAlterarSenha(false)
  }

  const verificacaoUsuario = usuario.id === userLogin.user.id

  return (
    <>
      {console.log('verificação', verificacaoUsuario)}
      <Paper>
        <Typography variant='h4' style={{ margin: '20px' }}>
          Perfil do Usuário
        </Typography>

        {verificacaoUsuario && (
          <Grid container justify='flex-end'>
            <Grid item>
              <Tooltip title='Alterar Senha'>
                <IconButton color='inherit' onClick={handleOpenModalAlterarSenha}>
                  <VpnKeyIcon />
                </IconButton>
              </Tooltip>
            </Grid>

            <Grid item>
              <Tooltip title='Editar Perfil'>
                <IconButton color='inherit' onClick={handleOpenModalAlterarPerfil}>
                  <EditIcon />
                </IconButton>
              </Tooltip>
            </Grid>
          </Grid>
        )}

        <Grid container>
          <Grid item sm>
            <Grid container direction='column' alignItems='center'>
              <Grid item>
                <AccountCircleIcon style={{ fontSize: 150 }} />
              </Grid>

              <Grid item>
                <Typography>
                  {usuario.nome}
                </Typography>
              </Grid>
            </Grid>
          </Grid>

          <Grid item sm>
            <Grid container direction='column' alignItems='center' spacing={3}>
              <Grid item>
                <Grid container spacing={2}>
                  <Grid item sm>
                    <Tooltip title='Email de Contato'>
                      <ContactMailIcon />
                    </Tooltip>
                  </Grid>

                  <Grid item sm>
                    <Typography>
                      {usuario.email}
                    </Typography>
                  </Grid>
                </Grid>
              </Grid>

              <Grid item>
                <Grid container spacing={2}>
                  <Grid item>
                    <Tooltip title='Organização'>
                      <DomainIcon />
                    </Tooltip>
                  </Grid>

                  <Grid item>
                    <Typography>
                      {usuario.organizacao}
                    </Typography>
                  </Grid>
                </Grid>
              </Grid>

              <Grid item>
                <Grid container spacing={2}>
                  <Grid item>
                    <Tooltip title='Nível de Permissão'>
                      <PermIdentityIcon />
                    </Tooltip>
                  </Grid>

                  <Grid item>
                    <Typography>
                      {usuario.permissao === 'ADMIN' ? 'Administrador' : 'Membro'}
                    </Typography>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Paper>

      <ModalEdtSenha
        abrirModal={abrirModalAlterarSenha}
        handleFechar={handleFecharAlterarSenha}
        usuario={usuario}
      />

      <ModalEdtPerfil
        abrirModal={abrirModalAlterarPerfil}
        handleFechar={handleFecharAlterarPerfil}
        usuario={usuario}
      />
    </>
  )
}

const Paper = styled(MaterialPaper)`
padding: 30px;
height: 230;
`

export default InfoUsuario
