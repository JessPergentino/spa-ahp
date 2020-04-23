import React from 'react'
import t from 'prop-types'

import AutorenewIcon from '@material-ui/icons/Autorenew'

import { TabelaDefault } from 'ui'

const TabelaVetorPrioritario = ({ vetorPrioritario, handleAbriModal, handleCriterio }) => {
  const colunas = [
    {
      title: 'Critérios',
      field: 'criterioId',
      render: (linha) => handleCriterio(linha)
    },
    {
      title: 'Valor',
      field: 'valor',
      render: (linha) => handleValorPorcetagem(linha.valor)
    }
  ]

  const handleValorPorcetagem = (linha) => `${(linha * 100).toFixed(2)}%`

  const dados = vetorPrioritario.length > 0 ? vetorPrioritario : []

  const acoes = [{
    icon: () => <AutorenewIcon />,
    tooltip: 'Refazer Ponderação dos Critérios',
    isFreeAction: true,
    onClick: (evt, data) => handleAbriModal(evt, data)
  }]
  return (
    <>
      <TabelaDefault
        titulo='Vetor Prioritário dos Critérios'
        columns={colunas}
        data={dados}
        search={false}
        actions={acoes}
      />
    </>
  )
}

TabelaVetorPrioritario.propTypes = {
  vetorPrioritario: t.array,
  handleAbriModal: t.func,
  handleCriterio: t.func
}

export default TabelaVetorPrioritario
