import React, { useState, useContext, useEffect } from 'react'
import {
  Typography,
  Grid,
  IconButton,
  Tooltip
} from '@material-ui/core'
import AutorenewIcon from '@material-ui/icons/Autorenew'

import { Page, SelectProjeto, Alerta } from 'ui'
import AddAssistente from 'pages/priorizacao/ponderacao-requisito/add-assistente'
import { ProjetoContext } from 'contexts/projetos'
import { AuthContext } from 'contexts/auth'
import { CriterioContext } from 'contexts/criterios'
import VizualizacaoVetorPrioritario from 'pages/priorizacao/ponderacao-requisito/vizualizacao-vetor-prioritario'
import ModalRefazerPonderacaoRequisitos from 'pages/priorizacao/ponderacao-requisito/modal-refazer-ponderacao-requisitos'

const PonderacaoRequisito = () => {
  const { projetos, listarProjetos } = useContext(ProjetoContext)
  const { userLogin } = useContext(AuthContext)
  const { vetorPrioritarioRequisito, buscarPonderacaoRequisito, limparStateVetorPrioritarioRequisito } = useContext(CriterioContext)

  const [projetoSelecionado, setProjetoSelecionado] = useState('')
  const [abrirModalEdt, setAbrirModalEdt] = useState(false)
  const [matriz, setMatriz] = useState([[]])

  const exibirVetor = projetoSelecionado !== '' && projetoSelecionado.requisitos.length > 0 && vetorPrioritarioRequisito.length > 0
  const exibirTabela = projetoSelecionado !== '' && projetoSelecionado.requisitos.length > 0 && vetorPrioritarioRequisito.length === 0
  const exibirAlerta = projetoSelecionado !== '' && projetoSelecionado.requisitos.length === 0

  useEffect(() => {
    if (userLogin.user.id !== undefined) {
      listarProjetos(userLogin.user.id)
    }
  }, [listarProjetos, userLogin.user.id])

  useEffect(() => {
    if (userLogin.user.id !== undefined && projetoSelecionado.id !== undefined) {
      buscarPonderacaoRequisito(userLogin.user.id, projetoSelecionado.id)
    }
  }, [buscarPonderacaoRequisito, userLogin, projetoSelecionado])

  const handleChangeProjeto = (e) => {
    setProjetoSelecionado(e.target.value)
    limparStateVetorPrioritarioRequisito()
    setMatriz(Array.from({ length: e.target.value.requisitos.length }, () => Array.from({ length: e.target.value.requisitos.length }, () => 1)))
  }

  const handleChangeMatriz = (copy) => {
    setMatriz(copy)
  }

  const handleAbriModalEdt = (evt, data) => {
    setAbrirModalEdt(true)
  }

  const handleFecharModalEdt = () => {
    setAbrirModalEdt(false)
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
            <Grid
              container
              direction='row'
              justify='space-between'
              alignItems='center'
            >
              <Grid item>
                <SelectProjeto
                  projetos={projetos}
                  projetoSelecionado={projetoSelecionado}
                  handleChangeProjeto={handleChangeProjeto}
                />
              </Grid>
              <Grid item>
                {projetoSelecionado !== '' && !exibirAlerta && (
                  <Tooltip title='Refazer Ponderação dos Requisitos'>
                    <IconButton onClick={handleAbriModalEdt}>
                      <AutorenewIcon />
                    </IconButton>
                  </Tooltip>
                )}
              </Grid>
            </Grid>
          </Grid>

          <Grid item>
            {exibirAlerta && (
              <Alerta
                severidade='info'
                mensagem='É necessário adicionar requisitos ao projeto para realizar a ponderação dos Requisitos.'
              />
            )}

            {exibirTabela && (
              <AddAssistente
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

      <ModalRefazerPonderacaoRequisitos
        abrir={abrirModalEdt}
        handleFechar={handleFecharModalEdt}
        projetoSelecionado={projetoSelecionado}
      />
    </>
  )
}

export default PonderacaoRequisito
