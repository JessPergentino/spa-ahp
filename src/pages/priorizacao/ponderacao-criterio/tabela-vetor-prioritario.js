import React from 'react'
import t from 'prop-types'

import AutorenewIcon from '@material-ui/icons/Autorenew'

import { TabelaDefault } from 'ui'
import { vetorPrioritario } from 'services/data-fake'

const TabelaVetorPrioritario = ({ handleAbriModal }) => {
  const colunas = [
    {
      title: 'Criterio',
      field: 'criterioId'
    },
    {
      title: 'Valor',
      field: 'valor',
      render: (linha) => handleValorPorcetagem(linha.valor)
    }
  ]

  const handleValorPorcetagem = (linha) => `${linha * 100}%`

  const dados = vetorPrioritario.length > 0 ? vetorPrioritario : []

  const acoes = [{
    icon: () => <AutorenewIcon />,
    tooltip: 'Refazer Ponderação dos Critérios',
    isFreeAction: true,
    onClick: (evt, data) => handleAbriModal(evt, data)
  }]
  return (
    <TabelaDefault
      titulo='Vetor Prioritário dos Critérios'
      columns={colunas}
      data={dados}
      search={false}
      actions={acoes}
    />
  )
}

TabelaVetorPrioritario.propTypes = {
  handleAbriModal: t.func
}

export default TabelaVetorPrioritario
