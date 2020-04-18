import React from 'react'
import {
  Typography
} from '@material-ui/core'

import { Page } from 'ui'
import Assistente from 'pages/priorizacao/ponderacao-requisito/assistente'

const PonderacaoRequisito = () => {
  return (
    <Page>
      <Typography variant='h4' align='center'>Ponderação dos Requisitos</Typography>

      <Assistente />
    </Page>
  )
}

export default PonderacaoRequisito
