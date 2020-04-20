import React, { useState } from 'react'
import t from 'prop-types'
import { Modal } from 'ui'
import { TextField } from '@material-ui/core'

const ModalEdtSenha = ({ abrirModal, handleFechar, usuario }) => {
  const [formSenha, setFormSenha] = useState({
    senhaAtual: '',
    novaSenha: '',
    confirmSenha: ''
  })

  const alterarSenha = () => {
    console.log('alterou')
    handleFechar()
  }

  return (
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
            return { ...prevState, senhaAtual: val }
          })
        }}
        value={formSenha.senhaAtual}
        autoFocus
        id='senhaAtual'
        label='Senha Atual'
        type='text'
        width='100%'
        margin='normal'
        fullWidth
      />

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
        type='text'
        width='100%'
        margin='normal'
        fullWidth
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
        type='text'
        width='100%'
        margin='normal'
        fullWidth
      />
    </Modal>
  )
}

ModalEdtSenha.propTypes = {
  abrirModal: t.bool,
  handleFechar: t.func,
  usuario: t.object
}

export default ModalEdtSenha
