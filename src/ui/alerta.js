import React from 'react'
import t from 'prop-types'

import { Typography } from '@material-ui/core'
import { Alert, AlertTitle } from '@material-ui/lab'

const Alerta = ({ severidade, mensagem, onClose }) => (
  <Alert
    severity={severidade}
    onClose={onClose}
    style={{ margin: '20px' }}
  >
    <AlertTitle>{severidade}</AlertTitle>
    <Typography> {mensagem} </Typography>
  </Alert>
)

Alerta.propTypes = {
  severidade: t.string,
  mensagem: t.string,
  onClose: t.func
}

export default Alerta
