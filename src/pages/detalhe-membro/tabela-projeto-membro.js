import React from 'react'
import t from 'prop-types'

import { TabelaDefault } from 'ui'

const TabelaProjetosMembro = ({ projetos, handleOwner }) => {
  const colunas = [
    {
      title: 'Nome',
      field: 'nome'
    },
    {
      title: 'Owner',
      field: 'owner',
      render: (linha) => handleOwner(linha.ownerId)
    },
    {
      title: 'Data de Criação',
      field: 'createdAt',
      type: 'date'
    }
  ]

  const dados = projetos

  return (
    <TabelaDefault titulo='Projetos Participantes' columns={colunas} data={dados} search={false} />
  )
}

TabelaProjetosMembro.propTypes = {
  projetos: t.array,
  handleOwner: t.func
}

export default TabelaProjetosMembro
