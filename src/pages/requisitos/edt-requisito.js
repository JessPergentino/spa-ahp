import React, { useState, useEffect } from 'react'
import t from 'prop-types'

import {
  TextField,
  Tooltip
} from '@material-ui/core'

import { Modal } from 'ui'

const ModalEdtRequisito = ({ abrir, handleFechar, requisitoAtual }) => {
  const [requisito, setRequisito] = useState(requisitoAtual)

  useEffect(() => {
    setRequisito(requisitoAtual)
  }, [requisitoAtual])

  const alterarRequisito = () => {
    console.log(requisito)
    handleFechar()
  }

  return (
    <Modal titulo='Editar Requisito' open={abrir} handleClose={handleFechar} handleSave={alterarRequisito} operacao='Alterar'>
      <TextField
        onChange={(e) => {
          const val = e.target.value
          setRequisito(prevState => {
            return { ...prevState, codReferencia: val }
          })
        }}
        autoFocus
        margin='normal'
        value={requisito.codReferencia}
        id='codReferencia'
        label='Código de Referência'
        type='text'
        fullWidth
      />

      <TextField
        onChange={(e) => {
          const val = e.target.value
          setRequisito(prevState => {
            return { ...prevState, titulo: val }
          })
        }}
        value={requisito.titulo}
        margin='normal'
        id='titulo'
        label='Título'
        type='text'
        fullWidth
      />

      <TextField
        onChange={(e) => {
          const val = e.target.value
          setRequisito(prevState => {
            return { ...prevState, descricao: val }
          })
        }}
        margin='normal'
        value={requisito.descricao}
        id='descricao'
        label='Descrição'
        type='text'
        multiline
        rows='4'
        fullWidth
      />

      <Tooltip title='A estimativa deve ser em dias'>
        <TextField
          onChange={(e) => {
            const val = e.target.value
            setRequisito(prevState => {
              return { ...prevState, estimativa: val }
            })
          }}
          margin='normal'
          id='estimativa'
          value={requisito.estimativa}
          label='Estimativa'
          type='number'
        />
      </Tooltip>
    </Modal>
  )
}

ModalEdtRequisito.propTypes = {
  abrir: t.bool,
  handleFechar: t.func,
  requisitoAtual: t.object
}

export default ModalEdtRequisito
