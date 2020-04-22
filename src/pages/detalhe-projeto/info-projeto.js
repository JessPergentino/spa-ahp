import React, { useContext, useEffect } from 'react'

import { Page } from 'ui'
import CampoPage from 'ui/campo-page'
import { ProjetoContext } from 'contexts/projetos'
import { useParams } from 'react-router-dom'

const InfoProjeto = () => {
  const { projetoAtual, buscarProjeto } = useContext(ProjetoContext)
  const { id } = useParams()

  useEffect(() => {
    buscarProjeto(id)
  }, [buscarProjeto, id])

  return (
    <>
      {projetoAtual != null && (
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
      )}
    </>
  )
}

export default InfoProjeto
