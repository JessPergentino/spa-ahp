import React from 'react'
import t from 'prop-types'

import { Typography } from '@material-ui/core'

import { Modal } from 'ui'

const ModalDelProjeto = ({ abrir, handleFechar, projetoAtual }) => {
  const deletarProjeto = () => {
    console.log(projetoAtual)
    handleFechar()
  }

  return (
    <Modal titulo='Deseja mesmo deletar este projeto?' open={abrir} handleClose={handleFechar} handleSave={deletarProjeto} operacao='Deletar'>
      <Typography>
        O projeto {projetoAtual.nome} e todas as suas dependencias serão deletadas!
      </Typography>
    </Modal>
  )
}

ModalDelProjeto.propTypes = {
  abrir: t.bool,
  handleFechar: t.func,
  projetoAtual: t.object
}

export default ModalDelProjeto
