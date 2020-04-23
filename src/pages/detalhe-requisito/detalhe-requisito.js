import React, { useEffect, useContext } from 'react'

import { singularPlural } from 'services/utils'
import { Page } from 'ui'
import CampoPage from 'ui/campo-page'
import { RequisitoContext } from 'contexts/requisitos'
import { useParams } from 'react-router-dom'
import { Typography } from '@material-ui/core'

const DetalheRequisito = () => {
  const { requisitoAtual, buscarRequisito } = useContext(RequisitoContext)
  const { idRequisito } = useParams()

  useEffect(() => {
    buscarRequisito(idRequisito)
  }, [buscarRequisito, idRequisito])

  return (
    <>
      {requisitoAtual !== null && (
        <Page>
          <Typography variant='h4' style={{ margin: '20px' }}> Informações do Requisito </Typography>

          <CampoPage
            titulo='Código de Referência'
            info={requisitoAtual.codReferencia}
          />

          <CampoPage
            titulo='Título'
            info={requisitoAtual.titulo}
          />

          <CampoPage
            titulo='Descrição'
            info={requisitoAtual.descricao}
          />

          <CampoPage
            titulo='Estimativa'
            info={requisitoAtual.estimativa + ' ' + singularPlural(requisitoAtual.estimativa, 'dia', 'dias')}
          />

          <CampoPage
            titulo='Prioridade'
            info={requisitoAtual.prioridade ? requisitoAtual.prioridade : 'Este requisito ainda não foi priorizado'}
          />

          <CampoPage
            titulo='Criado Por'
            info={`${requisitoAtual.usuarioId} - ${requisitoAtual.createdAt}`}
          />
        </Page>
      )}
    </>
  )
}

export default DetalheRequisito
