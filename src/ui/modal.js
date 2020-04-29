import React from 'react'
import t from 'prop-types'
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle
} from '@material-ui/core'

const Modal = ({ children, open, handleClose, handleSave, titulo, operacao }) => {
  return (
    <Dialog open={open} onClose={handleClose} aria-labelledby='form-dialog-title'>
      <DialogTitle id='form-dialog-title'>{titulo}</DialogTitle>
      <form onSubmit={handleSave}>
        <DialogContent>
          {children}
        </DialogContent>

        <DialogActions>
          <Button onClick={handleClose} color='primary'>
            Cancelar
          </Button>
          <Button type='submit' color='primary'>
            {operacao}
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  )
}

Modal.propTypes = {
  children: t.node.isRequired,
  open: t.bool.isRequired,
  handleClose: t.func.isRequired,
  handleSave: t.func,
  titulo: t.string.isRequired,
  operacao: t.string.isRequired
}

export default Modal
