import React, { useState, useContext } from 'react'

import { AuthContext } from 'contexts/auth'

import ModalAddRequisito from 'pages/requisitos/add-requisito'
import ModalEdtRequisito from 'pages/requisitos/edt-requisito'
import ModalDelRequisito from 'pages/requisitos/del-requisito'
import TabelaRequisitos from 'pages/requisitos/tabela-requisitos'

const Requisitos = () => {
  const { userLogin } = useContext(AuthContext)

  const [abrirModalAdd, setAbrirModalAdd] = useState(false)
  const [abrirModalEdt, setAbrirModalEdt] = useState(false)
  const [abrirModalDel, setAbrirModalDel] = useState(false)
  const [projeto, setProjeto] = useState('')

  const [requisitoInfo, setRequisitoInfo] = useState({
    id: null,
    titulo: '',
    descricao: '',
    codReferencia: '',
    estimativa: null,
    prioridade: null,
    createdAt: '',
    updatedAt: '',
    ProjetoId: null,
    UsuarioId: null
  })

  const handleAbriModalEdt = (evt, data) => {
    setAbrirModalEdt(true)
    setRequisitoInfo({ ...data })
  }

  const handleAbriModalDel = (evt, data) => {
    setAbrirModalDel(true)
    setRequisitoInfo({ ...data })
  }

  const handleChangeProjeto = (e) => {
    setProjeto(e.target.value)
  }

  return (
    <>
      <TabelaRequisitos
        projeto={projeto}
        handleAbrirAdd={() => setAbrirModalAdd(true)}
        handleAbriModalEdt={handleAbriModalEdt}
        handleAbriModalDel={handleAbriModalDel}
        handleChangeProjeto={handleChangeProjeto}
      />

      <ModalAddRequisito
        projetoAtualId={projeto.id}
        usuarioId={userLogin.user.id}
        abrir={abrirModalAdd}
        handleFechar={() => setAbrirModalAdd(false)}
      />

      <ModalEdtRequisito
        abrir={abrirModalEdt}
        handleFechar={() => setAbrirModalEdt(false)}
        requisitoAtual={requisitoInfo}
      />

      <ModalDelRequisito
        requisitoAtual={requisitoInfo}
        abrir={abrirModalDel}
        handleFechar={() => setAbrirModalDel(false)}
      />
    </>
  )
}

export default Requisitos
