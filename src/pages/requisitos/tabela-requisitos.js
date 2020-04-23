import React, { useContext, useEffect } from 'react'
import t from 'prop-types'

import { useHistory } from 'react-router-dom'
import InfoIcon from '@material-ui/icons/Info'

import { TabelaDefault } from 'ui'

import { DETALHE_REQUISITO } from 'routes'
import { RequisitoContext } from 'contexts/requisitos'

const TabelaRequisitos = (
  {
    projeto,
    handleAbrirAdd,
    handleAbriModalEdt,
    handleAbriModalDel
  }
) => {
  const { requisitos, listarRequisitos } = useContext(RequisitoContext)

  useEffect(() => {
    listarRequisitos(projeto.id)
  }, [listarRequisitos, projeto])

  const history = useHistory()

  const colunas = [
    {
      title: 'Código de Referência',
      field: 'codReferencia'
    },
    {
      title: 'Título',
      field: 'titulo'
    },
    {
      title: 'Estimativa',
      field: 'estimativa'
    }
  ]

  const dados = requisitos

  const actions = [
    {
      icon: () => (<InfoIcon />),
      tooltip: 'info',
      onClick: (evt, data) => {
        history.push(DETALHE_REQUISITO.replace(':idRequisito', data.id))
      }
    },
    {
      icon: 'add',
      tooltip: 'Add Requisito',
      isFreeAction: true,
      onClick: () => handleAbrirAdd()
    },
    {
      icon: 'edit',
      tooltip: 'Editar Requisito',
      isFreeAction: false,
      onClick: (evt, data) => handleAbriModalEdt(evt, data)
    },
    {
      icon: 'delete',
      tooltip: 'Deletar Requisito',
      onClick: (evt, data) => handleAbriModalDel(evt, data)
    }
  ]

  return (
    <>
      <TabelaDefault titulo='Lista de Requisitos' columns={colunas} data={dados} actions={actions} />
    </>
  )
}

TabelaRequisitos.propTypes = {
  projeto: t.object,
  handleAbrirAdd: t.func,
  handleAbriModalEdt: t.func,
  handleAbriModalDel: t.func
}

export default TabelaRequisitos
