import React from 'react'
import t from 'prop-types'

import { TabelaDefault } from 'ui'
import { handleValorPorcetagem } from 'services/utils'

const TabelaVetorPrioritarioRequisito = ({ vetor, handleRequisito }) => {
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

  const dados = vetor

  return (
    <TabelaDefault
      titulo='Vetor Prioritário dos Requisitos'
      columns={colunas}
      data={dados}
      search={false}
    />
  )
}

TabelaVetorPrioritarioRequisito.propTypes = {
  vetor: t.array,
  handleRequisito: t.func
}

export default TabelaVetorPrioritarioRequisito
