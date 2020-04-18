import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import {
  Paper as MaterialPaper,
  Grid,
  Typography
} from '@material-ui/core'

import ContactMailIcon from '@material-ui/icons/ContactMail'
import AccountCircleIcon from '@material-ui/icons/AccountCircle'
import DomainIcon from '@material-ui/icons/Domain'
import PermIdentityIcon from '@material-ui/icons/PermIdentity'

const InfoUsuario = () => {
  const [usuario, setUsuario] = useState({})

  useEffect(() => {
    setUsuario(window.location.state.usuario)
  }, [])

  return (
    <Paper>
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
                  <ContactMailIcon />
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
                  <DomainIcon />
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
                  <PermIdentityIcon />
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
  )
}

const Paper = styled(MaterialPaper)`
padding: 30px;
height: 230px;
`

export default InfoUsuario
