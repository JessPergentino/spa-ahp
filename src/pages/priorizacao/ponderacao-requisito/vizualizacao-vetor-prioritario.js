import React from 'react'
import t from 'prop-types'

import { Typography } from '@material-ui/core'

const VizualizacaoVetorPrioritario = ({ vetor, projeto }) => {
  return (
    <>
      {console.log(vetor)}
      <Typography>Vetor Prioritario do projeto {projeto.nome} </Typography>
      <Typography>Vetor Prioritario do projeto {vetor[0].criterioId} </Typography>
    </>
  )
}

VizualizacaoVetorPrioritario.propTypes = {
  vetor: t.array,
  projeto: t.object
}

export default VizualizacaoVetorPrioritario
