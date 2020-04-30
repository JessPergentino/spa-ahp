import React, { useContext, useEffect } from 'react'
import styled from 'styled-components'
import {
  Divider as MaterialDivider,
  Grid,
  Paper,
  Typography
} from '@material-ui/core'
import Grafico from 'pages/pagina-inicial/graficos'

import { AuthContext } from 'contexts/auth'
import { ProjetoContext } from 'contexts/projetos'

const PaginaInical = () => {
  const { userLogin } = useContext(AuthContext)
  const { projetos, listarProjetos } = useContext(ProjetoContext)

  useEffect(() => {
    if (userLogin.user.id !== undefined) {
      listarProjetos(userLogin.user.id)
    }
  }, [listarProjetos, userLogin])

  return (
    <>
      <Grid container direction='column'>
        <Title variant='h3'>
          Bem vindo, {userLogin.primeiroNome}!
        </Title>

        {projetos.length > 0 ? (
          <>
            <Title variant='h4'>Este é o dashboard do {projetos[0].nome}</Title>

            <GraficosGrid>
              <Grid item xs>
                <PaperGrafico>
                  <Grafico />

                  <Divider />
                  <Typography>Titulo do Gráfico 1</Typography>
                </PaperGrafico>
              </Grid>

              <Grid item xs>
                <PaperGrafico>
                  <Grafico />

                  <Divider />
                  <Typography>Titulo do Gráfico 2</Typography>
                </PaperGrafico>
              </Grid>
            </GraficosGrid>
          </>
        ) : (
          <Title variant='h4'> Cadastre um novo projeto para começar </Title>
        )}
      </Grid>
    </>
  )
}

const Title = styled(Typography).attrs({
  gutterBottom: true,
  align: 'center'
})`
`

const GraficosGrid = styled(Grid).attrs({
  container: true,
  spacing: 5
})`
padding: 20px;
`

const PaperGrafico = styled(Paper)`
align-items: center;
display: flex;
flex-direction: column;
min-width: 250px;
padding: 20px 0;
`

const Divider = styled(MaterialDivider)`
margin: 20px 0;
width: 100%;
`

export default PaginaInical
