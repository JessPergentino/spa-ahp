import React, { useState, useContext } from 'react'
import t from 'prop-types'

import {
  TextField, Typography
} from '@material-ui/core'

import { Modal, SnackBar } from 'ui'

import api from 'services/api'
import { AuthContext } from 'contexts/auth'

const ModalAddMembro = ({ abrir, handleFechar, projetoAtual }) => {
  const { userLogin } = useContext(AuthContext)

  const [openSnackbar, setOpenSnackbar] = useState(false)
  const [emailMembro, setEmailMembro] = useState({
    email: '',
    erro: false,
    helper: ''
  })

  const handleAdicionarMembro = () => {
    const email = {
      email: emailMembro.email,
      membro: userLogin.user.nome
    }
    if (validarEmail()) {
      api.post(`/projetos_membro/${projetoAtual.id}`, email)
        .then((response) => {
          handleClickSnackbar()
        })
      handleFechar()
    } else {
      setEmailMembro(prevState => {
        return { ...prevState, error: true, helper: 'Digite um email valido' }
      })
    }
  }

  const handleClickSnackbar = () => {
    setOpenSnackbar(true)
  }

  const handleCloseSnackbar = (event, reason) => {
    if (reason === 'clickaway') {
      return
    }
    setOpenSnackbar(false)
  }

  const validarEmail = () => {
    const usuario = emailMembro.email.substring(0, emailMembro.email.indexOf('@'))
    const dominio = emailMembro.email.substring(emailMembro.email.indexOf('@') + 1, emailMembro.email.length)

    if ((usuario.length >= 1) &&
      (dominio.length >= 3) &&
      (usuario.search('@') === -1) &&
      (dominio.search('@') === -1) &&
      (usuario.search(' ') === -1) &&
      (dominio.search(' ') === -1) &&
      (dominio.search('.') !== -1) &&
      (dominio.indexOf('.') >= 1) &&
      (dominio.lastIndexOf('.') < dominio.length - 1)) {
      return true
    } else {
      return false
    }
  }

  return (
    <>
      <Modal
        titulo='Adicionar Novo Membro'
        open={abrir}
        handleClose={handleFechar}
        handleSave={handleAdicionarMembro}
        operacao='Enviar Solicitação'
        style={{ width: '300px' }}
      >
        <Typography>
          Para adicionar um membro ao projeto envie um email de solicitação informando o email do novo membro do projeto:
        </Typography>

        <TextField
          onChange={(e) => {
            const val = e.target.value
            setEmailMembro(prevState => {
              return { ...prevState, email: val }
            })
          }}
          autoFocus
          margin='normal'
          id='emailMembro'
          label='Email do Novo Membro'
          type='text'
          fullWidth
          error={emailMembro.error}
          helperText={emailMembro.helper}
        />
      </Modal>

      <SnackBar
        openSnackbar={openSnackbar}
        duracao={4000}
        handleClose={handleCloseSnackbar}
        tipo='success'
        mensagem='Email de solicitação enviado com sucesso!'
      />
    </>
  )
}

ModalAddMembro.propTypes = {
  abrir: t.bool,
  handleFechar: t.func,
  projetoAtual: t.object
}

export default ModalAddMembro
