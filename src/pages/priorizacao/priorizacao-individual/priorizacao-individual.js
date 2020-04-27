import React, { useState, useContext, useEffect } from 'react'
import TabelaPriorizacao from 'pages/priorizacao/tabela-priorizacao'
import { SelectProjeto, Page } from 'ui'
import { ProjetoContext } from 'contexts/projetos'
import { AuthContext } from 'contexts/auth'
import { CriterioContext } from 'contexts/criterios'
import { Grid, Typography } from '@material-ui/core'

const PriorizacaoIndividual = () => {
  const [projetoSelect, setProjetoSelect] = useState('')

  const { projetos, listarProjetos } = useContext(ProjetoContext)
  const { userLogin } = useContext(AuthContext)
  const { priorizacaoIndividual, buscarPriorizacaoIndividual } = useContext(CriterioContext)

  useEffect(() => {
    buscarPriorizacaoIndividual(userLogin.user.id, projetoSelect.id)
  }, [buscarPriorizacaoIndividual, userLogin, projetoSelect])

  useEffect(() => {
    listarProjetos(userLogin.user.id)
  }, [listarProjetos, userLogin])

  const handleChangeProjeto = (e) => {
    setProjetoSelect(e.target.value)
  }

  const exibirTabela = projetoSelect !== '' && priorizacaoIndividual.length > 0
  const exibirMensagem = projetoSelect !== '' && priorizacaoIndividual.length === 0

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
            <Typography variant='h4' align='center'>Priorização dos Requisitos</Typography>
          </Grid>
          <Grid item>

            <SelectProjeto
              projetos={projetos}
              projetoSelecionado={projetoSelect}
              handleChangeProjeto={handleChangeProjeto}
            />
          </Grid>

          <Grid item>
            {exibirTabela && (
              <TabelaPriorizacao
                projeto={projetoSelect}
                priorizacao={priorizacaoIndividual}
              />
            )}

            {exibirMensagem && (
              <Typography
                variant='h6'
                align='center'
              >
                Para visualizar a priorização é necessário realizar as ponderação dos critérios e dos requisitos.
              </Typography>
            )}
          </Grid>
        </Grid>
      </Page>
    </>
  )
}

export default PriorizacaoIndividual
