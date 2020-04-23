import React, { useState, useContext, useEffect } from 'react'
import {
  Typography, Grid
} from '@material-ui/core'

import { Page, SelectProjeto } from 'ui'
import Assistente from 'pages/priorizacao/ponderacao-requisito/assistente'
import { ProjetoContext } from 'contexts/projetos'
import { AuthContext } from 'contexts/auth'

const PonderacaoRequisito = () => {
  const [projetoSelecionado, setProjetoSelecionado] = useState('')

  const { projetos, listarProjetos } = useContext(ProjetoContext)
  const { userLogin } = useContext(AuthContext)

  useEffect(() => {
    listarProjetos(userLogin.user.id)
  }, [listarProjetos, userLogin.user.id])

  const handleChangeProjeto = (e) => {
    setProjetoSelecionado(e.target.value)
  }

  return (
    <Page>
      <Grid
        container
        spacing={2}
        direction='column'
        justify='center'
        alignItems='stretch'
      >
        <Grid item>
          <Typography variant='h4' align='center'>Ponderação dos Requisitos</Typography>
        </Grid>

        <Grid item>
          <SelectProjeto
            projetos={projetos}
            projetoSelecionado={projetoSelecionado}
            handleChangeProjeto={handleChangeProjeto}
          />
        </Grid>

        <Grid item>
          {projetoSelecionado && (
            <Assistente
              projetoSelecionado={projetoSelecionado}
            />
          )}
        </Grid>
      </Grid>
    </Page>
  )
}

export default PonderacaoRequisito
