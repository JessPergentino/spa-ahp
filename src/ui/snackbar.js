import React from 'react'
import t from 'prop-types'
import {
  Snackbar
} from '@material-ui/core'
import MuiAlert from '@material-ui/lab/Alert'

const SnackBar = ({ openSnackbar, duracao, handleClose, mensagem, tipo }) => {
  return (
    <>
      <Snackbar open={openSnackbar} autoHideDuration={4000} onClose={handleClose}>
        <Alert onClose={handleClose} severity={tipo}>
          {mensagem}
        </Alert>
      </Snackbar>
    </>
  )
}
function Alert (props) {
  return <MuiAlert elevation={6} variant='filled' {...props} />
}

SnackBar.propTypes = {
  openSnackbar: t.bool.isRequired,
  duracao: t.number.isRequired,
  handleClose: t.func.isRequired,
  mensagem: t.string.isRequired,
  tipo: t.string.isRequired
}

export default SnackBar
