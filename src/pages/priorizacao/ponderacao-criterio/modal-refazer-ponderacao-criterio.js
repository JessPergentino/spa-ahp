import React from 'react'
import t from 'prop-types'

import {
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  DialogActions
} from '@material-ui/core'
import TabelaEdtPonderacao from 'pages/priorizacao/ponderacao-criterio/edt-ponderacao'

const ModalRefazerPonderacaoCriterios = ({ abrir, handleFechar, projetoSelecionado }) => {
  return (
    <>
      <Dialog fullWidth maxWidth='md' open={abrir} onClose={handleFechar} aria-labelledby='form-dialog-title'>
        <DialogTitle id='form-dialog-title'>Refazer Ponderação dos Critérios</DialogTitle>
        <DialogContent>
          <TabelaEdtPonderacao
            projeto={projetoSelecionado}
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

ModalRefazerPonderacaoCriterios.propTypes = {
  abrir: t.bool,
  handleFechar: t.func,
  projetoSelecionado: t.any
}

export default ModalRefazerPonderacaoCriterios
