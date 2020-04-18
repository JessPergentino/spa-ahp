import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import t from 'prop-types'

import {
  IconButton
} from '@material-ui/core'
import InfoIcon from '@material-ui/icons/Info'

import { TabelaDefault } from 'ui'

import { DETALHE_MEMBRO } from 'routes'

const TabelaMembro = ({ handleAbrirModal }) => {
  const [projeto, setProjeto] = useState({})

  useEffect(() => {
    setProjeto(window.location.state.projetoAtual)
  }, [])

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

  const dados = projeto.membros

  const actions = [
    {
      icon: () => (
        <IconButton component={Link} to={{ pathname: DETALHE_MEMBRO }} color='inherit'>
          <InfoIcon />
        </IconButton>),
      tooltip: 'info',
      onClick: (evt, data) => {
        window.location.state = {
          usuario: data
        }
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
  handleAbrirModal: t.func
}

export default TabelaMembro
