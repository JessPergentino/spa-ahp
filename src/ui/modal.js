import React from 'react'
import t from 'prop-types'
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid
} from '@material-ui/core'

const Modal = ({ children, open, handleClose, handleSave, titulo }) => {
  return (
    <Dialog open={open} onClose={handleClose} aria-labelledby='form-dialog-title'>
      <DialogTitle id='form-dialog-title'>{titulo}</DialogTitle>
      <DialogContent>
        <Grid container spacing={2}>
          {children}
        </Grid>
      </DialogContent>

      <DialogActions>
        <Button onClick={handleClose} color='primary'>
          Cancelar
        </Button>
        <Button onClick={handleSave} color='primary'>
          Salvar
        </Button>
      </DialogActions>
    </Dialog>
  )
}

Modal.propTypes = {
  children: t.node.isRequired,
  open: t.bool.isRequired,
  handleClose: t.func.isRequired,
  handleSave: t.func.isRequired,
  titulo: t.string.isRequired
}

export default Modal
