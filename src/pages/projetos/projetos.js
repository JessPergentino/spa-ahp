import React, { useState, useContext, useEffect } from 'react'

import { AuthContext } from 'contexts/auth'

import TabelaProjeto from 'pages/projetos/tabela-projeto'
import ModalAddProjeto from 'pages/projetos/add-projeto'
import ModalEdtProjeto from 'pages/projetos/edt-projeto'
import ModalDelProjeto from 'pages/projetos/del-projeto'

const listaProjetos = [
  {
    id: 1,
    nome: 'Projeto 1',
    descricao: 'Descrição projeto 1',
    ownerId: 1,
    membros: [{ id: 1, nome: 'Jessica Pergentino' }],
    dataEntrega: new Date(2020, 4, 30),
    createdAt: new Date(2020, 4, 17)
  },
  {
    id: 2,
    nome: 'Projeto 2',
    descricao: 'Descrição projeto 2',
    ownerId: 1,
    membros: [{ id: 1, nome: 'Jessica Pergentino' }],
    dataEntrega: new Date(2020, 4, 30),
    createdAt: new Date(2020, 4, 17)
  }
]

const listaUsuarios = [
  {
    id: 1,
    nome: 'Jessica Pergentino'
  },
  {
    id: 2,
    nome: 'Demetrius Batista'
  },
  {
    id: 3,
    nome: 'Usuário Ficticio'
  }
]

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
