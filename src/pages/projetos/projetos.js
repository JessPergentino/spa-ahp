import React, { useState, useContext } from 'react'
import { Link } from 'react-router-dom'
import { TextField, IconButton, Typography } from '@material-ui/core'
import InfoIcon from '@material-ui/icons/Info'

import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker
} from '@material-ui/pickers'
import DateFnsUtils from '@date-io/date-fns'

import api from 'services/api'

import { AuthContext } from 'contexts/auth'
import { ProjetoContext } from 'contexts/projetos'
import { CriterioContext } from 'contexts/criterios'

import { DETALHE_PROJETO } from 'routes'

import { Modal, TabelaDefault } from 'ui'

const TabelaProjetos = () => {
  const { projetos, listarProjetos, buscarProjeto, buscarOwner, owner } = useContext(ProjetoContext)
  const { userLogin } = useContext(AuthContext)
  const { listarTodosCriteriosPorCategoria } = useContext(CriterioContext)

  const [dataSelecionada, setDataSelecionada] = useState(null)
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
    dataCriacao: ''
  })

  const dados = projetos

  const colunas = [
    {
      title: 'Nome',
      field: 'nome'
    },
    {
      title: 'Owner',
      field: 'owner',
      render: (linha) => handleOwner(linha.ownerId)
    },
    {
      title: 'Data de Criação',
      field: 'createdAt',
      type: 'date'
    },
    {
      title: 'Data de Entrega',
      field: 'dataEntrega',
      type: 'date'
    }
  ]

  const actions = [
    {
      icon: () => (
        <IconButton component={Link} to={{ pathname: DETALHE_PROJETO }} color='inherit'>
          <InfoIcon />
        </IconButton>),
      tooltip: 'info',
      onClick: (evt, data) => {
        window.location.state = {
          projetoId: data.id
        }
        listarTodosCriteriosPorCategoria()
      }
    },
    {
      icon: 'add',
      tooltip: 'Add Projeto',
      isFreeAction: true,
      onClick: () => setAbrirModalAdd(true)
    },
    {
      icon: 'edit',
      tooltip: 'Editar Projeto',
      isFreeAction: false,
      onClick: (evt, data) => handleAbriModalEdt(evt, data)
    },
    {
      icon: 'delete',
      tooltip: 'Deletar Projeto',
      onClick: (evt, data) => handleAbriModalDel(evt, data)
    }
  ]
  const handleOwner = (linha) => {
    buscarOwner(linha)
    return owner
  }

  const handleAbriModalEdt = (evt, data) => {
    setAbrirModalEdt(true)
    setDataSelecionada(data.dataEntrega)
    setProjetoInfo({ ...data })
  }

  const handleAbriModalDel = (evt, data) => {
    setAbrirModalDel(true)
    setProjetoInfo({ ...data })
  }

  const handleFecharModalEdt = () => {
    setAbrirModalEdt(false)
    setDataSelecionada(null)
  }

  const handleAlterarData = data => {
    setDataSelecionada(data)
    setProjetoInfo(estadoAnterior => {
      return { ...estadoAnterior, dataEntrega: data }
    })
  }

  const handleSalvarNovoProjeto = () => {
    const { nome, descricao, dataEntrega } = projetoInfo

    const novoProjeto = {
      nome,
      descricao,
      dataEntrega,
      ownerId: userLogin.user.id
    }

    api.post('/projetos', novoProjeto)
      .then((response) => {
        if (projetos.length === 0) {
          buscarProjeto(response.data.id)
        }
        listarProjetos(userLogin.user.id)
      })
    setAbrirModalAdd(false)
    setDataSelecionada(null)
  }

  const handleSalvarProjetoAlterado = () => {
    api.put(`/projetos/${projetoInfo.id}`, projetoInfo)
      .then((response) => {
        listarProjetos(userLogin.user.id)
      })

    handleFecharModalEdt()
    setDataSelecionada(null)
  }

  const handleDeletarProjeto = () => {
    api.delete(`/projetos/${projetoInfo.id}`)
      .then((response) => {
        listarProjetos(userLogin.user.id)
      })

    setAbrirModalDel(false)
  }

  return (
    <>
      <TabelaDefault titulo='Projetos' columns={colunas} data={dados} actions={actions} />

      <Modal titulo='Novo Projeto' open={abrirModalAdd} handleClose={() => setAbrirModalAdd(false)} handleSave={handleSalvarNovoProjeto} operacao='Salvar'>
        <TextField
          onChange={(e) => {
            const val = e.target.value
            setProjetoInfo(prevState => {
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
            setProjetoInfo(prevState => {
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

        <MuiPickersUtilsProvider utils={DateFnsUtils}>
          <KeyboardDatePicker
            label='Data de Entrega'
            clearable
            value={dataSelecionada}
            onChange={date => handleAlterarData(date)}
            minDate={new Date()}
            format='dd/MM/yyyy'
          />
        </MuiPickersUtilsProvider>
      </Modal>

      <Modal titulo='Editar Projeto' open={abrirModalEdt} handleClose={handleFecharModalEdt} handleSave={handleSalvarProjetoAlterado} operacao='Alterar'>
        <TextField
          onChange={(e) => {
            const val = e.target.value
            setProjetoInfo(prevState => {
              return { ...prevState, nome: val }
            })
          }}
          value={projetoInfo.nome}
          autoFocus
          id='nome'
          label='Nome'
          type='text'
          width='100%'
          margin='normal'
          fullWidth
        />

        <TextField
          onChange={(e) => {
            const val = e.target.value
            setProjetoInfo(prevState => {
              return { ...prevState, descricao: val }
            })
          }}
          value={projetoInfo.descricao}
          id='descricao'
          label='Descrição'
          type='text'
          multiline
          rows='4'
          width='100%'
          margin='normal'
          fullWidth
        />

        <MuiPickersUtilsProvider utils={DateFnsUtils}>
          <KeyboardDatePicker
            label='Data de Entrega'
            clearable
            value={dataSelecionada}
            onChange={date => handleAlterarData(date)}
            minDate={new Date()}
            format='dd/MM/yyyy'
          />
        </MuiPickersUtilsProvider>
      </Modal>

      <Modal titulo='Deseja mesmo deletar este projeto?' open={abrirModalDel} handleClose={() => setAbrirModalDel(false)} handleSave={handleDeletarProjeto} operacao='Deletar'>
        <Typography>
          O projeto {projetoInfo.nome} e todas as suas dependencias serão deletadas!
        </Typography>
      </Modal>
    </>
  )
}

export default TabelaProjetos
