import React, { useState, useContext, useEffect } from 'react'
import {
  Typography, Grid
} from '@material-ui/core'

import { Page, SelectProjeto } from 'ui'
import Assistente from 'pages/priorizacao/ponderacao-requisito/assistente'
import { ProjetoContext } from 'contexts/projetos'
import { AuthContext } from 'contexts/auth'
import { CriterioContext } from 'contexts/criterios'
import VizualizacaoVetorPrioritario from 'pages/priorizacao/ponderacao-requisito/vizualizacao-vetor-prioritario'

const PonderacaoRequisito = () => {
  const { projetos, listarProjetos } = useContext(ProjetoContext)
  const { userLogin } = useContext(AuthContext)
  const { vetorPrioritarioRequisito, buscarPonderacaoRequisito } = useContext(CriterioContext)

  const [projetoSelecionado, setProjetoSelecionado] = useState('')
  const [matriz, setMatriz] = useState([[]])

  const exibirVetor = projetoSelecionado !== '' && vetorPrioritarioRequisito.length > 0
  const exibirTabela = projetoSelecionado !== '' && vetorPrioritarioRequisito.length === 0

  useEffect(() => {
    listarProjetos(userLogin.user.id)
  }, [listarProjetos, userLogin.user.id])

  useEffect(() => {
    buscarPonderacaoRequisito(userLogin.user.id, projetoSelecionado.id)
  }, [buscarPonderacaoRequisito, userLogin, projetoSelecionado])

  const handleChangeProjeto = (e) => {
    setProjetoSelecionado(e.target.value)
    setMatriz(Array.from({ length: e.target.value.requisitos.length }, () => Array.from({ length: e.target.value.requisitos.length }, () => 1)))
  }

  const handleChangeMatriz = (copy) => {
    setMatriz(copy)
  }

  return (
    <>
      <Page>
        <Grid
          container
          spacing={2}
          direction='column'
          justify='center'
          alignItems='stretch'
        >
          <Grid item>
            <Typography variant='h4' align='center'>Ponderação dos Requisitos</Typography>
          </Grid>

          <Grid item>
            <SelectProjeto
              projetos={projetos}
              projetoSelecionado={projetoSelecionado}
              handleChangeProjeto={handleChangeProjeto}
            />
          </Grid>

          <Grid item>
            {exibirTabela && (
              <Assistente
                matriz={matriz}
                handleChangeMatriz={handleChangeMatriz}
                projetoSelecionado={projetoSelecionado}
              />
            )}

            {exibirVetor && (
              <VizualizacaoVetorPrioritario
                vetor={vetorPrioritarioRequisito}
                projeto={projetoSelecionado}
              />
            )}
          </Grid>
        </Grid>
      </Page>
    </>
  )
}

export default PonderacaoRequisito
