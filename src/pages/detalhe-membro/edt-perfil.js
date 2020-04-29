import React, { useState, useEffect, useContext } from 'react'
import t from 'prop-types'
import { Modal, SnackBar } from 'ui'
import { TextField } from '@material-ui/core'

import api from 'services/api'
import { UsuarioContext } from 'contexts/usuarios'

const ModalEdtPerfil = ({ abrirModal, handleFechar, usuario }) => {
  const { buscarUsuario } = useContext(UsuarioContext)
  const [perfil, setPerfil] = useState({})
  const [openSnackbar, setOpenSnackbar] = useState(false)

  useEffect(() => {
    setPerfil(usuario)
  }, [usuario])

  const handleClickSnackbar = () => {
    setOpenSnackbar(true)
  }

  const handleCloseSnackbar = (event, reason) => {
    if (reason === 'clickaway') {
      return
    }
    setOpenSnackbar(false)
  }

  const alterarPerfil = (e) => {
    e.preventDefault()
    api.put(`/usuarios/${perfil.id}`, perfil)
      .then((response) => {
        buscarUsuario(perfil.id)
        handleClickSnackbar()
      })
    handleFechar()
  }

  return (
    <>
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
          required
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
          required
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
          required
        />
      </Modal>

      <SnackBar
        openSnackbar={openSnackbar}
        duracao={4000}
        handleClose={handleCloseSnackbar}
        tipo='success'
        mensagem='Perfil alterado com sucesso!'
      />
    </>
  )
}

ModalEdtPerfil.propTypes = {
  abrirModal: t.bool,
  handleFechar: t.func,
  usuario: t.object
}

export default ModalEdtPerfil
