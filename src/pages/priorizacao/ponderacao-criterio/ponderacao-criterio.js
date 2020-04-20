import React, { useState, useEffect } from 'react'
import {
  Grid, Typography
} from '@material-ui/core'

import { Page } from 'ui'
import TabelaAddPonderacao from 'pages/priorizacao/ponderacao-criterio/add-ponderacao'
import SelectProjeto from 'pages/priorizacao/select-projeto'
import TabelaVetorPrioritario from 'pages/priorizacao/ponderacao-criterio/tabela-vetor-prioritario'
import ModalRefazerPonderacaoCriterios from 'pages/priorizacao/ponderacao-criterio/modal-refazer-ponderacao'

import { listaProjetos, vetorPrioritario } from 'services/data-fake'

const PonderacaoCriterios = () => {
  const [projetos, setProjetos] = useState([])
  const [projetoSelect, setProjetoSelect] = useState('')
  const [abrirModalEdt, setAbrirModalEdt] = useState(false)

  useEffect(() => {
    setProjetos(listaProjetos)
  }, [])

  const exibirVetor = projetoSelect !== '' && vetorPrioritario.length > 0
  const exibirTabela = projetoSelect !== '' && vetorPrioritario.length === 0

  const handleChangeProjeto = (e) => {
    setProjetoSelect(e.target.value)
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
            {exibirVetor &&
              (
                <TabelaVetorPrioritario
                  handleAbriModal={handleAbriModalEdt}
                />
              )}

            {exibirTabela &&
              (
                <TabelaAddPonderacao
                  projeto={projetoSelect}
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
