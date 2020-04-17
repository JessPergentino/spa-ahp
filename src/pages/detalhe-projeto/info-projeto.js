import React from 'react'
import t from 'prop-types'
import { Page } from 'ui'
import CampoPage from 'ui/campo-page'

const InfoProjeto = ({ projetoAtual }) => {
  return (
    <Page>
      <CampoPage
        titulo='Nome do Projeto'
        info={projetoAtual.nome}
      />

      <CampoPage
        titulo='Descrição'
        info={projetoAtual.descricao}
      />

      <CampoPage
        titulo='Owner'
        info={projetoAtual.membros.filter((item) => item.id === projetoAtual.ownerId)[0].nome}
      />

      <CampoPage
        titulo='Data de Criação'
        info={projetoAtual.createdAt}
      />

      <CampoPage
        titulo='Data de Entrega'
        info={projetoAtual.dataEntrega}
      />
    </Page>
  )
}

InfoProjeto.propTypes = {
  projetoAtual: t.object
}

export default InfoProjeto
