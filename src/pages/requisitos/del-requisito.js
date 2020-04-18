import React from 'react'
import t from 'prop-types'

import {
  Typography
} from '@material-ui/core'

import { Modal } from 'ui'

const ModalDelRequisito = ({ requisitoAtual, abrir, handleFechar }) => {
  const deletarRequisito = () => {
    console.log(requisitoAtual)
    handleFechar()
  }

  return (
    <Modal titulo='Deseja mesmo deletar este requisito?' open={abrir} handleClose={handleFechar} handleSave={deletarRequisito} operacao='Deletar'>
      <Typography>
        O requisito {requisitoAtual.titulo} e todas as suas dependencias serão deletadas!
      </Typography>
    </Modal>
  )
}

ModalDelRequisito.propTypes = {
  requisitoAtual: t.object,
  abrir: t.bool,
  handleFechar: t.func
}

export default ModalDelRequisito
