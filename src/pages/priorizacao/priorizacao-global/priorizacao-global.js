import React, { useContext, useState, useEffect } from 'react'
import { Grid, Typography } from '@material-ui/core'
import { Page, SelectProjeto, Alerta } from 'ui'
import { ProjetoContext } from 'contexts/projetos'
import { AuthContext } from 'contexts/auth'
import { CriterioContext } from 'contexts/criterios'
import TabelaPriorizacao from 'pages/priorizacao/tabela-priorizacao'

const PriorizacaoGlobal = () => {
  const { projetos, listarProjetos } = useContext(ProjetoContext)
  const { userLogin } = useContext(AuthContext)
  const { priorizacaoGlobal, buscarPriorizacaoGlobal, limparStateVetorPriorizacaoGlobal } = useContext(CriterioContext)

  const [projetoSelecionado, setProjetoSelecionado] = useState('')

  useEffect(() => {
    if (projetoSelecionado.id !== undefined) {
      buscarPriorizacaoGlobal(projetoSelecionado.id)
    }
  }, [buscarPriorizacaoGlobal, userLogin, projetoSelecionado])

  useEffect(() => {
    if (userLogin.user.id !== undefined) {
      listarProjetos(userLogin.user.id)
    }
  }, [listarProjetos, userLogin])

  const handleChangeProjeto = (e) => {
    setProjetoSelecionado(e.target.value)
    limparStateVetorPriorizacaoGlobal()
  }

  const exibirTabela = projetoSelecionado !== '' && priorizacaoGlobal.length > 0
  const exibirMensagem = projetoSelecionado !== '' && priorizacaoGlobal.length === 0

  return (
    <Page>
      <Grid
        container
        spacing={2}
        direction='column'
        justify='center'
        alignItems='stretch'
      >
        <Grid item>
          <Typography
            variant='h4'
            align='center'
          >
            Priorização Global dos Requisitos
          </Typography>
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
            <TabelaPriorizacao
              projeto={projetoSelecionado}
              priorizacao={priorizacaoGlobal}
            />
          )}

          {exibirMensagem && (
            <Alerta
              severidade='info'
              mensagem='Para visualizar a priorização é necessário realizar as ponderação dos critérios e dos requisitos.'
            />
          )}
        </Grid>
      </Grid>
    </Page>

  )
}

export default PriorizacaoGlobal
