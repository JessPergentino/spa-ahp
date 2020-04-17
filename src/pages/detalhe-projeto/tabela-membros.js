import React from 'react'
import { Link } from 'react-router-dom'
import t from 'prop-types'

import {
  IconButton
} from '@material-ui/core'
import InfoIcon from '@material-ui/icons/Info'

import { TabelaDefault } from 'ui'

import { DETALHE_MEMBRO } from 'routes'

const TabelaMembro = ({ projetoAtual, handleAbrirModal }) => {
  const colunas = [
    {
      title: 'Nome',
      field: 'nome'
    },
    {
      title: 'Organização',
      field: 'organizacao'
    },
    {
      title: 'Nível de Permissão',
      field: 'permissao',
      lookup: { ADMIN: 'Administrador', MEMBRO: 'Membro' }
    }
  ]

  const dados = projetoAtual.membros

  const actions = [
    {
      icon: () => (
        <IconButton component={Link} to={{ pathname: DETALHE_MEMBRO }} color='inherit'>
          <InfoIcon />
        </IconButton>),
      tooltip: 'info',
      onClick: (evt, data) => {
        window.location.state = data
      }
    },
    {
      icon: 'add',
      tooltip: 'Add Membro',
      isFreeAction: true,
      onClick: () => handleAbrirModal()
    }
  ]
  return (
    <TabelaDefault titulo='Membros do Projeto' columns={colunas} data={dados} actions={actions} />
  )
}

TabelaMembro.propTypes = {
  projetoAtual: t.object,
  handleAbrirModal: t.func
}

export default TabelaMembro
