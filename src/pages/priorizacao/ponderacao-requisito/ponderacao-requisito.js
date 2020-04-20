import React, { useState } from 'react'
import {
  Typography, Grid
} from '@material-ui/core'

import { Page } from 'ui'
import Assistente from 'pages/priorizacao/ponderacao-requisito/assistente'
import SelectProjeto from 'pages/priorizacao/select-projeto'
import { listaProjetos } from 'services/data-fake'

const PonderacaoRequisito = () => {
  const [projetoSelecionado, setProjetoSelecionado] = useState('')

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
            projetos={listaProjetos}
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
