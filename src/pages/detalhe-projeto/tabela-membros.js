import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import t from 'prop-types'

import InfoIcon from '@material-ui/icons/Info'

import ModalAddMembro from 'pages/detalhe-projeto/add-membro-projeto'

import { TabelaDefault } from 'ui'

import { DETALHE_MEMBRO } from 'routes'

const TabelaMembro = ({ projetoAtual }) => {
  const history = useHistory()

  const [abrirModalAdd, setAbrirModalAdd] = useState(false)

  const colunas = [
    {
      title: 'Nome',
      field: 'nome'
    },
    {
      title: 'Organização',
      field: 'organizacao'
    }
  ]

  const dados = projetoAtual !== null ? projetoAtual.membros : []

  const actions = [
    {
      icon: () => (<InfoIcon />),
      tooltip: 'info',
      onClick: (evt, data) => {
        history.push(DETALHE_MEMBRO.replace(':idUsuario', data.id))
      }
    },
    {
      icon: 'add',
      tooltip: 'Add Membro',
      isFreeAction: true,
      onClick: () => setAbrirModalAdd(true)
    }
  ]

  return (
    <>
      {projetoAtual !== null && (
        <TabelaDefault titulo='Membros do Projeto' columns={colunas} data={dados} actions={actions} />
      )}

      <ModalAddMembro
        abrir={abrirModalAdd}
        handleFechar={() => setAbrirModalAdd(false)}
        projetoAtual={projetoAtual}
      />
    </>
  )
}

TabelaMembro.propTypes = {
  projetoAtual: t.object
}

export default TabelaMembro
