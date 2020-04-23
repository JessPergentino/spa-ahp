import React, { useContext, useState } from 'react'
import t from 'prop-types'

import {
  Typography
} from '@material-ui/core'

import { Modal, SnackBar } from 'ui'

import api from 'services/api'
import { ProjetoContext } from 'contexts/projetos'

const ModalDelRequisito = ({ projeto, requisitoAtual, abrir, handleFechar }) => {
  const { buscarProjeto } = useContext(ProjetoContext)

  const [openSnackbar, setOpenSnackbar] = useState(false)

  const deletarRequisito = () => {
    api.delete(`/requisitos/${requisitoAtual.id}`)
      .then((response) => {
        buscarProjeto(projeto.id)
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
      {console.log('renderizou - deletar requisitos')}
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
