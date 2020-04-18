import React, { useEffect, useState } from 'react'
import t from 'prop-types'

import { Link } from 'react-router-dom'
import {
  IconButton,
  Select,
  MenuItem,
  FormControl,
  InputLabel
} from '@material-ui/core'
import InfoIcon from '@material-ui/icons/Info'
import { MTableToolbar } from 'material-table'

import { TabelaDefault } from 'ui'

import { DETALHE_REQUISITO } from 'routes'
import { listaProjetos } from 'services/data-fake'

const TabelaRequisitos = (
  {
    projeto,
    handleAbrirAdd,
    handleAbriModalEdt,
    handleAbriModalDel,
    handleChangeProjeto
  }
) => {
  const [projetos, setProjetos] = useState([])

  useEffect(() => {
    setProjetos(listaProjetos)
  }, [])

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

  const dados = projeto.requisitos

  const actions = [
    {
      icon: () => (
        <IconButton component={Link} to={{ pathname: DETALHE_REQUISITO }} color='inherit'>
          <InfoIcon />
        </IconButton>),
      tooltip: 'info',
      onClick: (evt, data) => {
        window.location.state = {
          requisito: data
        }
      }
    },
    {
      icon: 'add',
      tooltip: 'Add Requisito',
      isFreeAction: true,
      onClick: () => handleAbrirAdd()
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
              value={projeto}
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
    <TabelaDefault titulo='Requisitos' columns={colunas} data={dados} actions={actions} components={toolbar} />
  )
}

TabelaRequisitos.propTypes = {
  projeto: t.any,
  handleAbrirAdd: t.func,
  handleAbriModalEdt: t.func,
  handleAbriModalDel: t.func,
  handleChangeProjeto: t.func
}

export default TabelaRequisitos
