import React, { useState, useContext, useEffect } from 'react'
import TabelaPriorizacao from 'pages/priorizacao/priorizacao-individual/tabela-priorizacao'
import { SelectProjeto, Page } from 'ui'
import { ProjetoContext } from 'contexts/projetos'
import { AuthContext } from 'contexts/auth'
import { Grid, Typography } from '@material-ui/core'

const PriorizacaoIndividual = () => {
  const [projetoSelect, setProjetoSelect] = useState('')

  const { projetos, listarProjetos } = useContext(ProjetoContext)
  const { userLogin } = useContext(AuthContext)

  useEffect(() => {
    listarProjetos(userLogin.user.id)
  }, [listarProjetos, userLogin])

  const handleChangeProjeto = (e) => {
    setProjetoSelect(e.target.value)
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
            {projetoSelect !== '' && (
              <TabelaPriorizacao
                projeto={projetoSelect}
              />
            )}
          </Grid>
        </Grid>
      </Page>
    </>
  )
}

export default PriorizacaoIndividual
