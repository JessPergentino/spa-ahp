import React, { useState, useEffect } from 'react'
import { Page } from 'ui'
import CampoPage from 'ui/campo-page'

const InfoProjeto = () => {
  const projetoAtual = window.location.state.projetoAtual
  const [projeto, setProjeto] = useState(projetoAtual)

  useEffect(() => {
    setProjeto(projetoAtual)
  }, [projetoAtual])

  return (
    <Page>
      <CampoPage
        titulo='Nome do Projeto'
        info={projeto.nome}
      />

      <CampoPage
        titulo='Descrição'
        info={projeto.descricao}
      />

      <CampoPage
        titulo='Owner'
        info={projeto.membros.filter((item) => item.id === projeto.ownerId)[0].nome}
      />

      <CampoPage
        titulo='Data de Criação'
        info={projeto.createdAt.toLocaleDateString()}
      />

      <CampoPage
        titulo='Data de Entrega'
        info={projeto.dataEntrega.toLocaleDateString()}
      />
    </Page>
  )
}

export default InfoProjeto
