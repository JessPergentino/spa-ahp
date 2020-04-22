import React, { useContext, useEffect } from 'react'
import t from 'prop-types'

import { TabelaDefault } from 'ui'
import { UsuarioContext } from 'contexts/usuarios'
import { useParams } from 'react-router-dom'

const TabelaProjetosMembro = ({ handleOwner }) => {
  const { usuario, buscarUsuario } = useContext(UsuarioContext)
  const { idUsuario } = useParams()

  useEffect(() => {
    buscarUsuario(idUsuario)
  }, [buscarUsuario, idUsuario])

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

  const dados = usuario.projetos

  return (
    <TabelaDefault titulo='Projetos Participantes' columns={colunas} data={dados} search={false} />
  )
}

TabelaProjetosMembro.propTypes = {
  handleOwner: t.func
}

export default TabelaProjetosMembro
