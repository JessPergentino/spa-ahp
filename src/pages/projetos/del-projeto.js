import React, { useContext } from 'react'
import t from 'prop-types'

import { Typography } from '@material-ui/core'

import { Modal } from 'ui'

import api from 'services/api'
import { ProjetoContext } from 'contexts/projetos'
import { AuthContext } from 'contexts/auth'

const ModalDelProjeto = ({ abrir, handleFechar, projetoAtual }) => {
  const { listarProjetos } = useContext(ProjetoContext)
  const { userLogin } = useContext(AuthContext)

  const deletarProjeto = () => {
    api.delete(`/projetos/${projetoAtual.id}`)
      .then((response) => {
        listarProjetos(userLogin.user.id)
      })
    handleFechar()
  }

  return (
    <Modal titulo='Deseja mesmo deletar este projeto?' open={abrir} handleClose={handleFechar} handleSave={deletarProjeto} operacao='Deletar'>
      <Typography>
        O projeto {projetoAtual.nome} e todas as suas dependencias serão deletadas!
      </Typography>
    </Modal>
  )
}

ModalDelProjeto.propTypes = {
  abrir: t.bool,
  handleFechar: t.func,
  projetoAtual: t.object
}

export default ModalDelProjeto
