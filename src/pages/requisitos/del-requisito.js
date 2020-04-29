import React, { useContext, useState } from 'react'
import t from 'prop-types'

import {
  Typography
} from '@material-ui/core'

import { Modal, SnackBar } from 'ui'

import api from 'services/api'
import { RequisitoContext } from 'contexts/requisitos'

const ModalDelRequisito = ({ projeto, requisitoAtual, abrir, handleFechar }) => {
  const { listarRequisitos } = useContext(RequisitoContext)

  const [openSnackbar, setOpenSnackbar] = useState(false)

  const deletarRequisito = (e) => {
    e.preventDefault()
    api.delete(`/requisitos/${requisitoAtual.id}`)
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
      <Modal titulo='Deseja mesmo deletar este requisito?' open={abrir} handleClose={handleFechar} handleSave={deletarRequisito} operacao='Deletar'>
        <Typography>
          O requisito {requisitoAtual.titulo} e todas as suas dependencias serão deletadas!
        </Typography>
      </Modal>

      <SnackBar
        openSnackbar={openSnackbar}
        duracao={4000}
        handleClose={handleCloseSnackbar}
        tipo='success'
        mensagem='Requisito alterado com Sucesso!'
      />
    </>
  )
}

ModalDelRequisito.propTypes = {
  projeto: t.object,
  requisitoAtual: t.object,
  abrir: t.bool,
  handleFechar: t.func
}

export default ModalDelRequisito
