import React, { useContext } from 'react'
import { RequisitoContext } from 'contexts/requisitos'

const DetalheRequisito = () => {
  const { requisitoAtual } = useContext(RequisitoContext)
  return (
    <h1>Page Detalhe do {requisitoAtual.titulo}</h1>
  )
}

export default DetalheRequisito
