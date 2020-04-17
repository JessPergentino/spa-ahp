import React, { useState, useContext } from 'react'
import t from 'prop-types'

import {
  TextField
} from '@material-ui/core'

import { Modal } from 'ui'

import { AuthContext } from 'contexts/auth'

const ModalAddMembro = ({ projetoAtual, abrir, handleFechar }) => {
  const { userLogin } = useContext(AuthContext)
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
      console.log(email)
      handleFechar()
    } else {
      setEmailMembro(prevState => {
        return { ...prevState, error: true, helper: 'Digite um email valido' }
      })
    }
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
    <Modal
      titulo={`Adicionar Membro ao Projeto ${projetoAtual.nome}`}
      open={abrir}
      handleClose={handleFechar}
      handleSave={handleAdicionarMembro}
      operacao='Adicionar'
      style={{ width: '300px' }}
    >
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
  )
}

ModalAddMembro.propTypes = {
  projetoAtual: t.object,
  abrir: t.bool,
  handleFechar: t.func
}

export default ModalAddMembro
