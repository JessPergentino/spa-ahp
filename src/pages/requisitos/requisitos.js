import React, { useState, useContext } from 'react'
import { Link } from 'react-router-dom'
import {
  TextField,
  IconButton,
  Typography,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Tooltip
} from '@material-ui/core'
import InfoIcon from '@material-ui/icons/Info'
import { MTableToolbar } from 'material-table'

import { Modal, TabelaDefault } from 'ui'

import { AuthContext } from 'contexts/auth'
import { ProjetoContext } from 'contexts/projetos'
import { RequisitoContext } from 'contexts/requisitos'
import { UsuarioContext } from 'contexts/usuarios'

import api from 'services/api'
import { DETALHE_REQUISITO } from 'routes'

const Requisitos = () => {
  const { requisitos, listarRequisitos, setRequisitoAtual } = useContext(RequisitoContext)
  const { userLogin } = useContext(AuthContext)
  const { projetoAtual, projetos, setProjetoAtual } = useContext(ProjetoContext)
  const { buscarUsuario } = useContext(UsuarioContext)

  const [abrirModalAdd, setAbrirModalAdd] = useState(false)
  const [abrirModalEdt, setAbrirModalEdt] = useState(false)
  const [abrirModalDel, setAbrirModalDel] = useState(false)
  const [projetoSelect, setProjetoSelect] = useState('')

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

  const colunas = [
    {
      title: 'Código de Referência',
      field: 'codReferencia'
    },
    {
      title: 'Título',
      field: 'titulo'
    },
    {
      title: 'Estimativa',
      field: 'estimativa'
    }
  ]

  const dados = projetoSelect ? requisitos : []

  const actions = [
    {
      icon: () => (
        <IconButton component={Link} to={{ pathname: DETALHE_REQUISITO }} color='inherit'>
          <InfoIcon />
        </IconButton>),
      tooltip: 'info',
      onClick: (evt, data) => {
        setRequisitoAtual(data)
        buscarUsuario(data.usuarioId)
      }
    },
    {
      icon: 'add',
      tooltip: 'Add Requisito',
      isFreeAction: true,
      onClick: () => setAbrirModalAdd(true)
    },
    {
      icon: 'edit',
      tooltip: 'Editar Requisito',
      isFreeAction: false,
      onClick: (evt, data) => handleAbriModalEdt(evt, data)
    },
    {
      icon: 'delete',
      tooltip: 'Deletar Requisito',
      onClick: (evt, data) => handleAbriModalDel(evt, data)
    }
  ]

  const handleAbriModalEdt = (evt, data) => {
    setAbrirModalEdt(true)
    setRequisitoInfo({ ...data })
  }

  const handleAbriModalDel = (evt, data) => {
    setAbrirModalDel(true)
    setRequisitoInfo({ ...data })
  }

  const handleSalvarNovoRequisito = () => {
    const { titulo, descricao, estimativa, codReferencia } = requisitoInfo

    const novoRequisito = {
      titulo,
      descricao,
      codReferencia,
      estimativa,
      ProjetoId: projetoAtual.id,
      UsuarioId: userLogin.user.id
    }

    api.post('/requisitos', novoRequisito)
      .then((response) => {
        listarRequisitos(projetoAtual.id)
      })
    setAbrirModalAdd(false)
  }

  const handleSalvarRequisitoAlterado = () => {
    api.put(`/requisitos/${requisitoInfo.id}`, requisitoInfo)
      .then((response) => {
        listarRequisitos(projetoAtual.id)
      })

    setAbrirModalEdt(false)
  }

  const handleDeletarRequisito = () => {
    api.delete(`/requisitos/${requisitoInfo.id}`)
      .then((response) => {
        listarRequisitos(projetoAtual.id)
      })

    setAbrirModalDel(false)
  }

  const handleChangeProjeto = (e) => {
    setProjetoSelect(e.target.value)
    setProjetoAtual(e.target.value)
    listarRequisitos(e.target.value.id)
  }

  const toolbar = {
    Toolbar: props => (
      <div>
        <MTableToolbar {...props} />
        <div style={{ padding: '0px 10px' }}>
          <FormControl
            variant='outlined'
            style={{
              margin: '8px',
              minWidth: 200
            }}
          >
            <InputLabel id='label-select-projeto'>Selecione o Projeto</InputLabel>
            <Select
              labelId='label-select-projeto'
              id='select-projeto'
              value={projetoSelect}
              onChange={handleChangeProjeto}
              label='Selecione o Projeto'
            >
              {projetos ? projetos.map((projeto) => (
                <MenuItem
                  key={projeto.id}
                  value={projeto}
                >
                  {projeto.nome}
                </MenuItem>
              )) : []}
            </Select>
          </FormControl>
        </div>
      </div>
    )
  }

  return (
    <>
      <TabelaDefault titulo='Requisitos' columns={colunas} data={dados} actions={actions} components={toolbar} />

      <Modal titulo='Novo Requisito' open={abrirModalAdd} handleClose={() => setAbrirModalAdd(false)} handleSave={handleSalvarNovoRequisito} operacao='Salvar'>
        <TextField
          onChange={(e) => {
            const val = e.target.value
            setRequisitoInfo(prevState => {
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
            setRequisitoInfo(prevState => {
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
            setRequisitoInfo(prevState => {
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
              setRequisitoInfo(prevState => {
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

      <Modal titulo='Editar Requisito' open={abrirModalEdt} handleClose={() => setAbrirModalEdt(false)} handleSave={handleSalvarRequisitoAlterado} operacao='Alterar'>
        <TextField
          onChange={(e) => {
            const val = e.target.value
            setRequisitoInfo(prevState => {
              return { ...prevState, codReferencia: val }
            })
          }}
          autoFocus
          margin='normal'
          value={requisitoInfo.codReferencia}
          id='codReferencia'
          label='Código de Referência'
          type='text'
          fullWidth
        />

        <TextField
          onChange={(e) => {
            const val = e.target.value
            setRequisitoInfo(prevState => {
              return { ...prevState, titulo: val }
            })
          }}
          value={requisitoInfo.titulo}
          margin='normal'
          id='titulo'
          label='Título'
          type='text'
          fullWidth
        />

        <TextField
          onChange={(e) => {
            const val = e.target.value
            setRequisitoInfo(prevState => {
              return { ...prevState, descricao: val }
            })
          }}
          margin='normal'
          value={requisitoInfo.descricao}
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
              setRequisitoInfo(prevState => {
                return { ...prevState, estimativa: val }
              })
            }}
            margin='normal'
            id='estimativa'
            value={requisitoInfo.estimativa}
            label='Estimativa'
            type='number'
          />
        </Tooltip>
      </Modal>

      <Modal titulo='Deseja mesmo deletar este requisito?' open={abrirModalDel} handleClose={() => setAbrirModalDel(false)} handleSave={handleDeletarRequisito} operacao='Deletar'>
        <Typography>
          O requisito {requisitoInfo.titulo} e todas as suas dependencias serão deletadas!
        </Typography>
      </Modal>
    </>
  )
}

export default Requisitos
