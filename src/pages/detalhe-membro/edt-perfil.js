import React, { useState, useEffect } from 'react'
import t from 'prop-types'
import { Modal } from 'ui'
import { TextField } from '@material-ui/core'

const ModalEdtPerfil = ({ abrirModal, handleFechar, usuario }) => {
  const [perfil, setPerfil] = useState(usuario)

  useEffect(() => {
    setPerfil(usuario)
  }, [usuario])

  const alterarPerfil = () => {
    handleFechar()
  }

  return (
    <Modal
      titulo='Editar Perfil'
      open={abrirModal}
      handleClose={handleFechar}
      handleSave={alterarPerfil}
      operacao='Alterar'
    >

      <TextField
        onChange={(e) => {
          const val = e.target.value
          setPerfil(prevState => {
            return { ...prevState, nome: val }
          })
        }}
        value={perfil.nome}
        autoFocus
        id='nome'
        label='Nome'
        type='text'
        width='100%'
        margin='normal'
        fullWidth
      />

      <TextField
        onChange={(e) => {
          const val = e.target.value
          setPerfil(prevState => {
            return { ...prevState, email: val }
          })
        }}
        value={perfil.email}
        id='email'
        label='Email'
        type='text'
        width='100%'
        margin='normal'
        fullWidth
      />

      <TextField
        onChange={(e) => {
          const val = e.target.value
          setPerfil(prevState => {
            return { ...prevState, organizacao: val }
          })
        }}
        value={perfil.organizacao}
        id='organizacao'
        label='Organização'
        type='text'
        width='100%'
        margin='normal'
        fullWidth
      />
    </Modal>
  )
}

ModalEdtPerfil.propTypes = {
  abrirModal: t.bool,
  handleFechar: t.func,
  usuario: t.object
}

export default ModalEdtPerfil
