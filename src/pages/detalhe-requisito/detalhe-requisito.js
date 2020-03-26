import { RequisitoContext } from 'contexts/requisitos'
import React, { useContext } from 'react'
import styled from 'styled-components'

import { UsuarioContext } from 'contexts/usuarios'

import {
  Typography,
  Paper as MaterialPaper
} from '@material-ui/core'

const DetalheRequisito = () => {
  const { usuario } = useContext(UsuarioContext)
  const { requisitoAtual } = useContext(RequisitoContext)

  return (
    <Paper>
      <Label>
        Código de Referência
      </Label>
      <Campo>
        {requisitoAtual.codReferencia}
      </Campo>

      <Label>
        Título
      </Label>
      <Campo>
        {requisitoAtual.titulo}
      </Campo>

      <Label>
        Descrição
      </Label>
      <Campo>
        {requisitoAtual.descricao}
      </Campo>

      <Label>
        Estimativa
      </Label>
      <Campo>
        {requisitoAtual.estimativa}
      </Campo>

      <Label>
        Prioridade
      </Label>
      <Campo>
        {requisitoAtual.prioridade ? requisitoAtual.prioridade : 'Este requisito ainda não foi priorizado'}
      </Campo>

      <Label>
        Criado Por
      </Label>
      <Campo>
        {`${usuario.nome} - ${requisitoAtual.createdAt}`}
      </Campo>
    </Paper>
  )
}

const Paper = styled(MaterialPaper)`
padding: 30px;
`

const Campo = styled(Typography).attrs({
  variant: 'body1'
})`
margin: 20px;
`

const Label = styled(Typography).attrs({
  variant: 'h6'
})`
`

export default DetalheRequisito
