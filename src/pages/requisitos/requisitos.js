import React, { useState, useContext, useEffect } from 'react'

import ModalAddRequisito from 'pages/requisitos/add-requisito'
import ModalEdtRequisito from 'pages/requisitos/edt-requisito'
import ModalDelRequisito from 'pages/requisitos/del-requisito'
import TabelaRequisitos from 'pages/requisitos/tabela-requisitos'
import { SelectProjeto, Page } from 'ui'

import { ProjetoContext } from 'contexts/projetos'
import { AuthContext } from 'contexts/auth'
import { Typography, Grid } from '@material-ui/core'

const PageRequisitos = () => {
  const { projetos, listarProjetos } = useContext(ProjetoContext)
  const { userLogin } = useContext(AuthContext)

  const [projeto, setProjeto] = useState('')

  useEffect(() => {
    listarProjetos(userLogin.user.id)
  }, [listarProjetos, userLogin.user.id])

  const [abrirModalAdd, setAbrirModalAdd] = useState(false)
  const [abrirModalEdt, setAbrirModalEdt] = useState(false)
  const [abrirModalDel, setAbrirModalDel] = useState(false)

  const [requisitoInfo, setRequisitoInfo] = useState({
    id: null,
    titulo: '',
    descricao: '',
    codReferencia: '',
    estimativa: null,
    prioridade: null,
    createdAt: '',
    updatedAt: '',
    ProjetoId: null,
    UsuarioId: null
  })

  const handleAbriModalAdd = () => {
    setAbrirModalAdd(true)
  }

  const handleAbriModalEdt = (evt, data) => {
    setAbrirModalEdt(true)
    setRequisitoInfo({ ...data })
  }

  const handleAbriModalDel = (evt, data) => {
    setAbrirModalDel(true)
    setRequisitoInfo({ ...data })
  }

  const handleChangeProjeto = (evt, data) => {
    setProjeto(evt.target.value)
  }

  return (
    <>
      <Page>
        <Grid
          container
          direction='column'
          justify='center'
          alignItems='stretch'
          spacing={3}
        >

          <Grid item>
            <Typography>Selecione um projeto para visualizar os Requisitos</Typography>
          </Grid>

          <Grid item>
            <SelectProjeto
              projetos={projetos}
              projetoSelecionado={projeto}
              handleChangeProjeto={handleChangeProjeto}
            />
          </Grid>

          <Grid item>
            {projeto && (
              <>
                <TabelaRequisitos
                  projeto={projeto}
                  handleAbrirAdd={handleAbriModalAdd}
                  handleAbriModalEdt={handleAbriModalEdt}
                  handleAbriModalDel={handleAbriModalDel}
                />

                <ModalAddRequisito
                  projeto={projeto}
                  abrir={abrirModalAdd}
                  handleFechar={() => setAbrirModalAdd(false)}
                />

                <ModalEdtRequisito
                  projeto={projeto}
                  abrir={abrirModalEdt}
                  handleFechar={() => setAbrirModalEdt(false)}
                  requisitoAtual={requisitoInfo}
                />

                <ModalDelRequisito
                  projeto={projeto}
                  requisitoAtual={requisitoInfo}
                  abrir={abrirModalDel}
                  handleFechar={() => setAbrirModalDel(false)}
                />
              </>
            )}
          </Grid>
        </Grid>
      </Page>
    </>
  )
}

export default PageRequisitos
