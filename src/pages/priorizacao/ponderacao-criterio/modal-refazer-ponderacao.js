import React from 'react'
import t from 'prop-types'

import {
  Dialog,
  DialogContent,
  DialogTitle
} from '@material-ui/core'
import TabelaEdtPonderacao from 'pages/priorizacao/ponderacao-criterio/edt-ponderacao'

const ModalRefazerPonderacaoCriterios = ({ abrir, handleFechar, projetoSelecionado, matriz, handleChangeMatriz }) => {
  return (
    <Dialog open={abrir} onClose={handleFechar} aria-labelledby='form-dialog-title'>
      <DialogTitle id='form-dialog-title'>Refazer Ponderação dos Critérios</DialogTitle>
      <DialogContent>
        <TabelaEdtPonderacao
          projeto={projetoSelecionado}
          matriz={matriz}
          handleChangeMatriz={handleChangeMatriz}
          refazer
        />
      </DialogContent>
    </Dialog>
  )
}

ModalRefazerPonderacaoCriterios.propTypes = {
  abrir: t.bool,
  handleFechar: t.func,
  projetoSelecionado: t.object,
  matriz: t.any,
  handleChangeMatriz: t.func
}

export default ModalRefazerPonderacaoCriterios
