import React, { useContext } from 'react'
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
import { TabelaDefault } from 'ui'

import { ProjetoContext } from 'contexts/projetos'

const DetalheMembro = () => {
  const { projetos, buscarOwner, owner } = useContext(ProjetoContext)

  const colunas = [
    {
      title: 'Nome',
      field: 'nome'
    },
    {
      title: 'Owner',
      field: 'owner',
      render: (linha) => handleOwner(linha.ownerId)
    },
    {
      title: 'Data de Criação',
      field: 'createdAt',
      type: 'date'
    }
  ]

  const dados = projetos

  const handleOwner = (linha) => {
    buscarOwner(linha)
    return owner
  }

  console.log(window.location.state)

  return (
    <>
      <Typography variant='h4' gutterBottom>
        Perfil do Usuário
      </Typography>

      <Grid container direction='column' alignItems='stretch' spacing={4}>
        <Grid item xs={12}>
          <Paper>
            <Grid container>
              <Grid item sm>
                <Grid container direction='column' alignItems='center'>
                  <Grid item>
                    <AccountCircleIcon style={{ fontSize: 150 }} />
                  </Grid>

                  <Grid item>
                    <Typography>
                      {window.location.state.nome}
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
                          {window.location.state.email}
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
                          {window.location.state.organizacao}
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
                          {window.location.state.permissao === 'ADMIN' ? 'Administrador' : 'Membro'}
                        </Typography>
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Paper>
        </Grid>

        <Grid item xs={12}>
          <TabelaDefault titulo='Projetos Participantes' columns={colunas} data={dados} search={false} />
        </Grid>
      </Grid>
    </>
  )
}

const Paper = styled(MaterialPaper)`
padding: 30px;
height: 230px;
`

export default DetalheMembro
