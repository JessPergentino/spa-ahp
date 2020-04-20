import React, { useContext } from 'react'
import t from 'prop-types'
import { Link } from 'react-router-dom'
import { IconButton } from '@material-ui/core'
import InfoIcon from '@material-ui/icons/Info'

import { TabelaDefault } from 'ui'

import { DETALHE_PROJETO } from 'routes'

import { CriterioContext } from 'contexts/criterios'

const TabelaProjeto = ({ projetos, handleAbrirModalAdd, handleAbriModalDel, handleAbriModalEdt, handleOwner }) => {
  const { listarTodosCriteriosPorCategoria } = useContext(CriterioContext)
  const dados = projetos

  const colunas = [
    {
      title: 'Nome',
      field: 'nome'
    },
    {
      title: 'Owner',
      field: 'ownerId',
      render: (linha) => handleOwner(linha.ownerId)
    },
    {
      title: 'Data de Criação',
      field: 'createdAt',
      type: 'date'
    },
    {
      title: 'Data de Entrega',
      field: 'dataEntrega',
      type: 'date'
    }
  ]

  const actions = [
    {
      icon: () => (
        <IconButton component={Link} to={{ pathname: DETALHE_PROJETO }} color='inherit'>
          <InfoIcon />
        </IconButton>),
      tooltip: 'info',
      onClick: (evt, data) => {
        window.location.state = {
          projetoAtual: data
        }
        listarTodosCriteriosPorCategoria()
      }
    },
    {
      icon: 'add',
      tooltip: 'Add Projeto',
      isFreeAction: true,
      onClick: () => handleAbrirModalAdd()
    },
    {
      icon: 'edit',
      tooltip: 'Editar Projeto',
      isFreeAction: false,
      onClick: (evt, data) => handleAbriModalEdt(evt, data)
    },
    {
      icon: 'delete',
      tooltip: 'Deletar Projeto',
      onClick: (evt, data) => handleAbriModalDel(evt, data)
    }
  ]

  return (
    <TabelaDefault titulo='Lista de Projetos' columns={colunas} data={dados} actions={actions} />
  )
}

TabelaProjeto.propTypes = {
  projetos: t.array,
  handleAbrirModalAdd: t.func,
  handleAbriModalDel: t.func,
  handleAbriModalEdt: t.func,
  handleOwner: t.func
}

export default TabelaProjeto
