import React from 'react'
import t from 'prop-types'

import {
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  DialogActions
} from '@material-ui/core'
import EdtAssistente from 'pages/priorizacao/ponderacao-requisito/edt-assistente'

const ModalRefazerPonderacaoRequisitos = ({ projetoSelecionado, abrir, handleFechar }) => {
  return (
    <>
      <Dialog fullWidth maxWidth='xl' open={abrir} onClose={handleFechar} aria-labelledby='form-dialog-title'>
        <DialogTitle id='form-dialog-title'>Refazer Ponderação dos Requisitos</DialogTitle>
        <DialogContent>
          <EdtAssistente
            projetoSelecionado={projetoSelecionado}
            handleFechar={handleFechar}
          />
        </DialogContent>

        <DialogActions>
          <Button onClick={handleFechar} variant='outlined' color='primary'>
            Fechar
          </Button>
        </DialogActions>
      </Dialog>
    </>

  )
}

ModalRefazerPonderacaoRequisitos.propTypes = {
  abrir: t.bool,
  handleFechar: t.func,
  projetoSelecionado: t.any
}

export default ModalRefazerPonderacaoRequisitos
