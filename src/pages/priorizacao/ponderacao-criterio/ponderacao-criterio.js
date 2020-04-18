import React, { useState, useEffect } from 'react'
import {
  Grid
} from '@material-ui/core'

import { Page } from 'ui'
import TabelaAddPonderacao from 'pages/priorizacao/ponderacao-criterio/add-ponderacao'
import SelectProjeto from 'pages/priorizacao/ponderacao-criterio/select-projeto'
import TabelaVetorPrioritario from 'pages/priorizacao/ponderacao-criterio/tabela-vetor-prioritario'
import ModalRefazerPonderacaoCriterios from 'pages/priorizacao/ponderacao-criterio/modal-refazer-ponderacao'

import { listaProjetos, vetorPrioritario } from 'services/data-fake'

const PonderacaoCriterios = () => {
  const [projetos, setProjetos] = useState([])
  const [projetoSelect, setProjetoSelect] = useState({})
  const [abrirModalEdt, setAbrirModalEdt] = useState(false)

  useEffect(() => {
    setProjetos(listaProjetos)
  }, [])

  const exibirTabelas = projetoSelect != null && vetorPrioritario.length > 0

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
            <SelectProjeto
              projetos={projetos}
              projetoSelecionado={projetoSelect}
              handleChangeProjeto={handleChangeProjeto}
            />
          </Grid>

          <Grid item>
            {exibirTabelas &&
              (
                <TabelaVetorPrioritario
                  handleAbriModal={handleAbriModalEdt}
                />
              )}

            {projetoSelect && vetorPrioritario.length === 0 &&
              (
                <TabelaAddPonderacao
                  projeto={projetoSelect}
                  refazer={false}
                />
              )}
          </Grid>
        </Grid>
      </Page>

      <ModalRefazerPonderacaoCriterios
        abrir={abrirModalEdt}
        handleFechar={handleFecharModalEdt}
      />
    </>
  )
}

export default PonderacaoCriterios
