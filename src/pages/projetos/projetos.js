import React, { useState, useContext, useEffect } from 'react'

import { AuthContext } from 'contexts/auth'

import TabelaProjeto from 'pages/projetos/tabela-projeto'
import ModalAddProjeto from 'pages/projetos/add-projeto'
import ModalEdtProjeto from 'pages/projetos/edt-projeto'
import ModalDelProjeto from 'pages/projetos/del-projeto'

import { listaProjetos, listaUsuarios } from 'services/data-fake'

const PageProjetos = () => {
  const { userLogin } = useContext(AuthContext)

  const [projetos, setProjetos] = useState([])
  const [abrirModalAdd, setAbrirModalAdd] = useState(false)
  const [abrirModalEdt, setAbrirModalEdt] = useState(false)
  const [abrirModalDel, setAbrirModalDel] = useState(false)
  const [projetoInfo, setProjetoInfo] = useState({
    id: null,
    nome: '',
    descricao: '',
    ownerId: null,
    membros: null,
    dataEntrega: '',
    createdAt: ''
  })

  useEffect(() => {
    setProjetos(listaProjetos)
  }, [])

  const handleAbriModalEdt = (evt, data) => {
    setProjetoInfo({ ...data })
    setAbrirModalEdt(true)
  }

  const handleAbriModalDel = (evt, data) => {
    setProjetoInfo({ ...data })
    setAbrirModalDel(true)
  }

  const handleFecharModalEdt = () => {
    setAbrirModalEdt(false)
  }

  const handleOwner = (ownerId) => {
    const usuario = listaUsuarios.filter((usuario) => usuario.id === ownerId)
    return usuario[0].nome
  }

  return (
    <>
      <TabelaProjeto
        projetos={projetos}
        handleAbrirModalAdd={() => setAbrirModalAdd(true)}
        handleAbriModalEdt={handleAbriModalEdt}
        handleAbriModalDel={handleAbriModalDel}
        handleOwner={handleOwner}
      />

      <ModalAddProjeto
        abrir={abrirModalAdd}
        handleFecharModal={() => setAbrirModalAdd(false)}
        ownerId={userLogin.user.id}
      />

      <ModalEdtProjeto
        abrir={abrirModalEdt}
        handleFechar={handleFecharModalEdt}
        projetoAtual={projetoInfo}
      />

      <ModalDelProjeto
        abrir={abrirModalDel}
        handleFechar={() => setAbrirModalDel(false)}
        projetoAtual={projetoInfo}
      />
    </>
  )
}

export default PageProjetos
