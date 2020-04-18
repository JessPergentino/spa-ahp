import React, { useState } from 'react'
import t from 'prop-types'

import {
  TextField,
  Tooltip
} from '@material-ui/core'

import { Modal } from 'ui'

const ModalAddRequisito = ({ projetoAtualId, usuarioId, abrir, handleFechar }) => {
  const [requisito, setRequisito] = useState({})

  const cadastrarRequisito = () => {
    const { titulo, descricao, estimativa, codReferencia } = requisito

    const novoRequisito = {
      titulo,
      descricao,
      codReferencia,
      estimativa,
      ProjetoId: projetoAtualId,
      UsuarioId: usuarioId
    }

    console.log(novoRequisito)
    handleFechar()
  }

  return (
    <Modal titulo='Novo Requisito' open={abrir} handleClose={handleFechar} handleSave={cadastrarRequisito} operacao='Salvar'>
      <TextField
        onChange={(e) => {
          const val = e.target.value
          setRequisito(prevState => {
            return { ...prevState, codReferencia: val }
          })
        }}
        autoFocus
        margin='normal'
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
          label='Estimativa'
          type='number'
        />
      </Tooltip>
    </Modal>
  )
}

ModalAddRequisito.propTypes = {
  projetoAtualId: t.number,
  usuarioId: t.number,
  abrir: t.bool,
  handleFechar: t.func
}

export default ModalAddRequisito
