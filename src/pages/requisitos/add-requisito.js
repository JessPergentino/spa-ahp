import React, { useState, useContext } from 'react'
import t from 'prop-types'

import {
  TextField,
  Tooltip
} from '@material-ui/core'

import { Modal, SnackBar } from 'ui'

import { AuthContext } from 'contexts/auth'

import api from 'services/api'
import { RequisitoContext } from 'contexts/requisitos'

const ModalAddRequisito = ({ projeto, abrir, handleFechar }) => {
  const { userLogin } = useContext(AuthContext)
  const { listarRequisitos } = useContext(RequisitoContext)
  const [requisito, setRequisito] = useState({})
  const [openSnackbar, setOpenSnackbar] = useState(false)

  const cadastrarRequisito = () => {
    const { titulo, descricao, estimativa, codReferencia } = requisito

    const novoRequisito = {
      titulo,
      descricao,
      codReferencia,
      estimativa,
      ProjetoId: projeto.id,
      UsuarioId: userLogin.user.id
    }

    api.post('/requisitos', novoRequisito)
      .then((response) => {
        listarRequisitos(projeto.id)
        handleOpenSnackbar()
      })
    handleFechar()
  }

  const handleOpenSnackbar = () => {
    setOpenSnackbar(true)
  }

  const handleCloseSnackbar = (event, reason) => {
    if (reason === 'clickaway') {
      return
    }
    setOpenSnackbar(false)
  }

  return (
    <>
      {console.log('renderizou - add requisitos')}

      <Modal titulo='Novo Requisito' open={abrir} handleClose={handleFechar} handleSave={cadastrarRequisito} operacao='Salvar'>
        <TextField
          onChange={(e) => {
            const val = e.target.value
            setRequisito(prevState => {
              return { ...prevState, codReferencia: val }
            })
          }}
          autoFocus
          margin='normal'
          id='codReferencia'
          label='Código de Referência'
          type='text'
          fullWidth
        />

        <TextField
          onChange={(e) => {
            const val = e.target.value
            setRequisito(prevState => {
              return { ...prevState, titulo: val }
            })
          }}
          margin='normal'
          id='titulo'
          label='Título'
          type='text'
          fullWidth
        />

        <TextField
          onChange={(e) => {
            const val = e.target.value
            setRequisito(prevState => {
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
        <Tooltip title='A estimativa deve ser em dias'>
          <TextField
            onChange={(e) => {
              const val = e.target.value
              setRequisito(prevState => {
                return { ...prevState, estimativa: val }
              })
            }}
            margin='normal'
            id='estimativa'
            label='Estimativa'
            type='number'
          />
        </Tooltip>
      </Modal>

      <SnackBar
        openSnackbar={openSnackbar}
        duracao={4000}
        handleClose={handleCloseSnackbar}
        tipo='success'
        mensagem='Requisito adicionado com Sucesso!'
      />
    </>
  )
}

ModalAddRequisito.propTypes = {
  projeto: t.object,
  abrir: t.bool,
  handleFechar: t.func
}

export default ModalAddRequisito
