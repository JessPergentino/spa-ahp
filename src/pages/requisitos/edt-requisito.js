import React, { useState, useEffect, useContext } from 'react'
import t from 'prop-types'

import {
  TextField,
  Tooltip
} from '@material-ui/core'

import { Modal, SnackBar } from 'ui'

import api from 'services/api'
import { RequisitoContext } from 'contexts/requisitos'

const ModalEdtRequisito = ({ projeto, abrir, handleFechar, requisitoAtual }) => {
  const { listarRequisitos } = useContext(RequisitoContext)
  const [requisito, setRequisito] = useState(requisitoAtual)
  const [openSnackbar, setOpenSnackbar] = useState(false)

  useEffect(() => {
    setRequisito(requisitoAtual)
  }, [requisitoAtual])

  const alterarRequisito = () => {
    api.put(`/requisitos/${requisito.id}`, requisito)
      .then((response) => {
        listarRequisitos(projeto.id)
        handleOpenSnackbar()
      })
    handleFechar()
  }

  const handleOpenSnackbar = () => {
    setOpenSnackbar(true)
  }

  const handleCloseSnackbar = (event, reason) => {
    if (reason === 'clickaway') {
      return
    }
    setOpenSnackbar(false)
  }

  return (
    <>
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

      <SnackBar
        openSnackbar={openSnackbar}
        duracao={4000}
        handleClose={handleCloseSnackbar}
        tipo='success'
        mensagem='Requisito alterado com Sucesso!'
      />
    </>
  )
}

ModalEdtRequisito.propTypes = {
  projeto: t.object,
  abrir: t.bool,
  handleFechar: t.func,
  requisitoAtual: t.object
}

export default ModalEdtRequisito
