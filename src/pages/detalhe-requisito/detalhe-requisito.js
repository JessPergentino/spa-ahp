import React, { useState, useEffect } from 'react'

import { singularPlural } from 'services/utils'
import { Page } from 'ui'
import CampoPage from 'ui/campo-page'
import { listaUsuarios } from 'services/data-fake'

const DetalheRequisito = () => {
  const [requisitoAtual, setRequisitoAtual] = useState(window.location.state.requisito)
  const [usuario, setUsuario] = useState({})
  const user = listaUsuarios.filter((user) => user.id === window.location.state.requisito.UsuarioId)

  useEffect(() => {
    setRequisitoAtual(window.location.state.requisito)
    setUsuario(user[0])
  }, [user])

  return (
    <Page>
      <CampoPage
        titulo='Código de Referência'
        info={requisitoAtual.codReferencia}
      />

      <CampoPage
        titulo='Título'
        info={requisitoAtual.titulo}
      />

      <CampoPage
        titulo='Descrição'
        info={requisitoAtual.descricao}
      />

      <CampoPage
        titulo='Estimativa'
        info={requisitoAtual.estimativa + ' ' + singularPlural(requisitoAtual.estimativa, 'dia', 'dias')}
      />

      <CampoPage
        titulo='Prioridade'
        info={requisitoAtual.prioridade ? requisitoAtual.prioridade : 'Este requisito ainda não foi priorizado'}
      />

      <CampoPage
        titulo='Criado Por'
        info={`${usuario.nome} - ${requisitoAtual.createdAt.toLocaleDateString()}`}
      />
    </Page>
  )
}

export default DetalheRequisito
