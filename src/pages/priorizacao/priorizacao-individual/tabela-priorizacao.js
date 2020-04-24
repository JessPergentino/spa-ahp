import React from 'react'
import t from 'prop-types'

import { TabelaDefault } from 'ui'
import { handleValorPorcetagem } from 'services/utils'

const TabelaPriorizacao = ({ projeto }) => {
  const colunas = [
    {
      title: 'Critérios',
      field: 'criterioId'
    },
    {
      title: 'Valor',
      field: 'valor',
      render: (linha) => handleValorPorcetagem(linha.valor)
    }
  ]

  const dados = projeto !== null ? projeto.criterios : []

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
  projeto: t.object
}

export default TabelaPriorizacao
