import React from 'react'
import t from 'prop-types'

import { TabelaDefault } from 'ui'
import { handleValorPorcetagem } from 'services/utils'

const TabelaPriorizacao = ({ projeto, priorizacao }) => {
  const colunas = [
    {
      title: 'Requisitos',
      field: 'requisitoId',
      render: (linha) => handleRequisito(linha.requisitoId)
    },
    {
      title: 'Valor',
      field: 'valor',
      render: (linha) => handleValorPorcetagem(linha.valor)
    }
  ]

  const handleRequisito = (requisitoId) => {
    const requisito = projeto.requisitos.filter((r) => r.id === requisitoId)
    return requisito[0].titulo
  }

  const dados = priorizacao

  return (
    <TabelaDefault
      titulo='Priorização'
      columns={colunas}
      data={dados}
      search={false}
    />
  )
}

TabelaPriorizacao.propTypes = {
  projeto: t.object,
  priorizacao: t.array
}

export default TabelaPriorizacao
