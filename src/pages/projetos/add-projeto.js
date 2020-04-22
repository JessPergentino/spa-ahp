import React, { useState, useContext } from 'react'
import t from 'prop-types'

import { TextField } from '@material-ui/core'

import { Modal, CampoData, SnackBar } from 'ui'

import api from 'services/api'
import { ProjetoContext } from 'contexts/projetos'
import { AuthContext } from 'contexts/auth'

const ModalAddProjeto = ({ abrir, handleFecharModal, ownerId }) => {
  const [projeto, setProjeto] = useState({})
  const [dataSelecionada, setDataSelecionada] = useState(null)
  const [openSnackbar, setOpenSnackbar] = useState(false)

  const { listarProjetos } = useContext(ProjetoContext)
  const { userLogin } = useContext(AuthContext)

  const handleCloseSnackbar = (event, reason) => {
    if (reason === 'clickaway') {
      return
    }
    setOpenSnackbar(false)
  }

  const handleAlterarData = data => {
    setDataSelecionada(data)
    setProjeto(estadoAnterior => {
      return { ...estadoAnterior, dataEntrega: data }
    })
  }

  const cadastrarProjeto = () => {
    const { nome, descricao, dataEntrega } = projeto

    const novoProjeto = {
      nome,
      descricao,
      dataEntrega,
      ownerId: ownerId
    }

    api.post('/projetos', novoProjeto)
      .then((response) => {
        listarProjetos(userLogin.user.id)
        setOpenSnackbar(true)
      })
    handleFecharModal()
    setDataSelecionada(null)
  }

  return (
    <>
      <Modal titulo='Novo Projeto' open={abrir} handleClose={handleFecharModal} handleSave={cadastrarProjeto} operacao='Salvar'>
        <TextField
          onChange={(e) => {
            const val = e.target.value
            setProjeto(prevState => {
              return { ...prevState, nome: val }
            })
          }}
          autoFocus
          margin='normal'
          id='nome'
          label='Nome'
          type='text'
          fullWidth
        />
        <TextField
          onChange={(e) => {
            const val = e.target.value
            setProjeto(prevState => {
              return { ...prevState, descricao: val }
            })
          }}
          margin='normal'
          id='descricao'
          label='Descrição'
          type='text'
          multiline
          rows='4'
          fullWidth
        />

        <CampoData
          label='Data de Entrega'
          dataSelecionada={dataSelecionada}
          handleAlterarData={handleAlterarData}
        />
      </Modal>

      <SnackBar
        openSnackbar={openSnackbar}
        duracao={4000}
        handleClose={handleCloseSnackbar}
        tipo='success'
        mensagem='Projeto Adicionado com Sucesso!'
      />
    </>
  )
}

ModalAddProjeto.propTypes = {
  abrir: t.bool,
  handleFecharModal: t.func,
  ownerId: t.number
}

export default ModalAddProjeto
