import React, { useState } from 'react'
import t from 'prop-types'

import { TextField } from '@material-ui/core'

import { Modal, CampoData } from 'ui'

const ModalAddProjeto = ({ abrir, handleFecharModal, ownerId }) => {
  const [projeto, setProjeto] = useState({})
  const [dataSelecionada, setDataSelecionada] = useState(null)

  const handleAlterarData = data => {
    setDataSelecionada(data)
    setProjeto(estadoAnterior => {
      return { ...estadoAnterior, dataEntrega: data }
    })
  }

  const cadastrarProjeto = () => {
    console.log(projeto, ownerId)
    handleFecharModal()
  }

  return (
    <Modal titulo='Novo Projeto' open={abrir} handleClose={handleFecharModal} handleSave={cadastrarProjeto} operacao='Salvar'>
      <TextField
        onChange={(e) => {
          const val = e.target.value
          setProjeto(prevState => {
            return { ...prevState, nome: val }
          })
        }}
        autoFocus
        margin='normal'
        id='nome'
        label='Nome'
        type='text'
        fullWidth
      />
      <TextField
        onChange={(e) => {
          const val = e.target.value
          setProjeto(prevState => {
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

      <CampoData
        label='Data de Entrega'
        dataSelecionada={dataSelecionada}
        handleAlterarData={handleAlterarData}
      />
    </Modal>
  )
}

ModalAddProjeto.propTypes = {
  abrir: t.bool,
  handleFecharModal: t.func,
  ownerId: t.number
}

export default ModalAddProjeto
