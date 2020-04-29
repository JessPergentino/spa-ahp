import React, { useState, useContext } from 'react'
import t from 'prop-types'
import { Modal, SnackBar } from 'ui'
import { TextField } from '@material-ui/core'
import { UsuarioContext } from 'contexts/usuarios'

import api from 'services/api'

const ModalEdtSenha = ({ abrirModal, handleFechar, usuario }) => {
  const { buscarUsuario } = useContext(UsuarioContext)
  const estadoInicial = {
    novaSenha: '',
    confirmSenha: '',
    erro: false,
    helper: ''
  }

  const [formSenha, setFormSenha] = useState(estadoInicial)
  const [openSnackbar, setOpenSnackbar] = useState(false)

  const handleClickSnackbar = () => {
    setOpenSnackbar(true)
  }

  const handleCloseSnackbar = (event, reason) => {
    if (reason === 'clickaway') {
      return
    }
    setOpenSnackbar(false)
  }

  const alterarSenha = (e) => {
    e.preventDefault()
    if (formSenha.novaSenha === formSenha.confirmSenha) {
      api.put(`/usuarios_senha/${usuario.id}`, formSenha)
        .then((response) => {
          buscarUsuario(usuario.id)
          handleClickSnackbar()
        })
      setFormSenha(estadoInicial)
      handleFechar()
    } else {
      setFormSenha(prevState => {
        return { ...prevState, error: true, helper: 'As senhas digitadas são incompativeis' }
      })
    }
  }

  return (
    <>
      <Modal
        titulo='Alterar Senha'
        open={abrirModal}
        handleClose={handleFechar}
        handleSave={alterarSenha}
        operacao='Alterar'
      >
        <TextField
          onChange={(e) => {
            const val = e.target.value
            setFormSenha(prevState => {
              return { ...prevState, novaSenha: val }
            })
          }}
          value={formSenha.novaSenha}
          id='novaSenha'
          label='Nova Senha'
          type='password'
          width='100%'
          margin='normal'
          fullWidth
          required
          error={formSenha.error}
        />

        <TextField
          onChange={(e) => {
            const val = e.target.value
            setFormSenha(prevState => {
              return { ...prevState, confirmSenha: val }
            })
          }}
          value={formSenha.confirmSenha}
          id='confirmSenha'
          label='Confirmar Senha'
          type='password'
          width='100%'
          margin='normal'
          fullWidth
          required
          error={formSenha.error}
          helperText={formSenha.helper}
        />
      </Modal>

      <SnackBar
        openSnackbar={openSnackbar}
        duracao={4000}
        handleClose={handleCloseSnackbar}
        tipo='success'
        mensagem='Senha alterada com sucesso!'
      />
    </>
  )
}

ModalEdtSenha.propTypes = {
  abrirModal: t.bool,
  handleFechar: t.func,
  usuario: t.object
}

export default ModalEdtSenha
