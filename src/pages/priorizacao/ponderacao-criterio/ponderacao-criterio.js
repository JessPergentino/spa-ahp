import React, { useState, useContext, useEffect } from 'react'
import {
  Grid, Typography
} from '@material-ui/core'

import { Page, SelectProjeto, Alerta } from 'ui'
import TabelaAddPonderacao from 'pages/priorizacao/ponderacao-criterio/add-ponderacao'
import TabelaVetorPrioritarioCriterio from 'pages/priorizacao/ponderacao-criterio/tabela-vetor-prioritario-criterio'
import ModalRefazerPonderacaoCriterios from 'pages/priorizacao/ponderacao-criterio/modal-refazer-ponderacao-criterio'

import { ProjetoContext } from 'contexts/projetos'
import { AuthContext } from 'contexts/auth'
import { CriterioContext } from 'contexts/criterios'

const PonderacaoCriterios = () => {
  const [projetoSelect, setProjetoSelect] = useState('')
  const [abrirModalEdt, setAbrirModalEdt] = useState(false)
  const [matriz, setMatriz] = useState([[]])

  const { projetos, listarProjetos } = useContext(ProjetoContext)
  const { userLogin } = useContext(AuthContext)
  const { vetorPrioritarioCriterio, buscarPonderacaoCriterio, criterios, listarTodosCriterios } = useContext(CriterioContext)

  useEffect(() => {
    if (userLogin.user.id !== undefined) {
      listarProjetos(userLogin.user.id)
    }
  }, [listarProjetos, userLogin.user.id])

  useEffect(() => {
    if (userLogin.user.id !== undefined && projetoSelect.id !== undefined) {
      buscarPonderacaoCriterio(userLogin.user.id, projetoSelect.id)
    }
  }, [buscarPonderacaoCriterio, userLogin, projetoSelect])

  useEffect(() => {
    listarTodosCriterios()
  }, [listarTodosCriterios])

  const exibirVetor = projetoSelect !== '' && vetorPrioritarioCriterio.length > 0
  const exibirTabela = projetoSelect !== '' && projetoSelect.criterios.length > 0 && vetorPrioritarioCriterio.length === 0
  const exibirAlerta = projetoSelect !== '' && projetoSelect.criterios.length === 0

  const handleChangeMatriz = (copy) => {
    setMatriz(copy)
  }

  const handleChangeProjeto = (e) => {
    setProjetoSelect(e.target.value)
    setMatriz(Array.from({ length: e.target.value.criterios.length }, () => Array.from({ length: e.target.value.criterios.length }, () => 1)))
  }

  const handleAbriModalEdt = (evt, data) => {
    setAbrirModalEdt(true)
  }

  const handleFecharModalEdt = () => {
    setAbrirModalEdt(false)
  }

  const handleCriterio = (linha) => {
    if (linha.criterioId !== null && linha.ponderacaoId !== null) {
      const criterio = criterios.filter((c) => c.id === linha.criterioId)
      return criterio[0].nome
    }
    return ''
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
            <Typography variant='h4' align='center'> Ponderação dos Critérios </Typography>
          </Grid>

          <Grid item>
            <SelectProjeto
              projetos={projetos}
              projetoSelecionado={projetoSelect}
              handleChangeProjeto={handleChangeProjeto}
            />
          </Grid>

          <Grid item>
            {exibirAlerta && (
              <Alerta
                severidade='info'
                mensagem='É necessário adicionar critérios ao projeto para realizar a ponderação dos Critérios'
              />
            )}

            {exibirVetor &&
              (
                <TabelaVetorPrioritarioCriterio
                  vetorPrioritario={vetorPrioritarioCriterio}
                  handleAbriModal={handleAbriModalEdt}
                  handleCriterio={handleCriterio}
                />
              )}

            {exibirTabela &&
              (
                <TabelaAddPonderacao
                  projeto={projetoSelect}
                  matriz={matriz}
                  handleChangeMatriz={handleChangeMatriz}
                />
              )}
          </Grid>
        </Grid>
      </Page>

      <ModalRefazerPonderacaoCriterios
        abrir={abrirModalEdt}
        handleFechar={handleFecharModalEdt}
        projetoSelecionado={projetoSelect}
      />
    </>
  )
}

export default PonderacaoCriterios
