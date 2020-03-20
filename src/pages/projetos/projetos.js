import React, { useState, useContext } from 'react'
import { Link } from 'react-router-dom'
import { TextField, Grid, IconButton } from '@material-ui/core'
import InfoIcon from '@material-ui/icons/Info'
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker
} from '@material-ui/pickers'
import DateFnsUtils from '@date-io/date-fns'
import MaterialTable from 'material-table'

import { ProjetoContext } from 'contexts/projetos'

import { DETALHE_PROJETO } from 'routes'

import { Modal } from 'ui'

const TabelaProjetos = () => {
  const { projetos } = useContext(ProjetoContext)
  const [selectedDate, setSelectedDate] = useState(null)
  const [openAdd, setOpenAdd] = useState(false)
  const [openEdt, setOpenEdt] = useState(false)
  const [projetoInfo, setProjetoInfo] = useState({
    nome: '',
    descricao: '',
    owner: '',
    membros: 2,
    dataEntrega: null,
    dataCriacao: new Date()
  })

  const [state, setState] = useState({
    columns: [
      {
        title: 'Nome',
        field: 'nome'
      },
      {
        title: 'Owner',
        field: 'owner',
        render: (rowData) => {
          const ownerId = rowData.ownerId
          return rowData.usuarios.filter((item) => item.id === ownerId)[0].nome
        }
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
    ],
    data: projetos
  })

  const handleDateChange = date => {
    setSelectedDate(date)
    setProjetoInfo(prevState => {
      return { ...prevState, dataEntrega: date }
    })
  }

  const handleClickOpenAdd = () => {
    setOpenAdd(true)
  }

  const handleCloseAdd = () => {
    setOpenAdd(false)
  }

  const handleSaveAdd = () => {
    const newData = projetoInfo

    setState(prevState => {
      const data = [...prevState.data]
      data.push(newData)
      return { ...prevState, data }
    })
    handleCloseAdd()
    setSelectedDate(null)
  }

  const handleClickOpenEdt = (evt, data) => {
    setOpenEdt(true)
    setSelectedDate(data.dataEntrega)
    setProjetoInfo({ ...data })
  }

  const handleCloseEdt = () => {
    setOpenEdt(false)
  }

  const handleSaveEdt = () => {
    const { nome, descricao, dataEntrega, tableData } = projetoInfo

    setState(prevState => {
      const data = [...prevState.data]

      const newData = {
        nome,
        descricao,
        membros: data[tableData.id].membros,
        owner: data[tableData.id].owner,
        dataCriacao: data[tableData.id].dataCriacao,
        dataEntrega
      }

      data[tableData.id] = newData
      return { ...prevState, data }
    })

    handleCloseEdt()
    setSelectedDate(null)
  }

  return (
    <>
      <MaterialTable
        title='Projetos'
        columns={state.columns}
        data={state.data}
        options={{
          actionsColumnIndex: -1
        }}
        actions={[
          {
            icon: () => (
              <IconButton component={Link} to={{ pathname: DETALHE_PROJETO }} color='inherit'>
                <InfoIcon />
              </IconButton>),
            tooltip: 'info',
            onClick: (evt, data) => {
              window.location.state = data
            }
          },
          {
            icon: 'add',
            tooltip: 'Add Projeto',
            isFreeAction: true,
            onClick: handleClickOpenAdd
          },
          {
            icon: 'edit',
            tooltip: 'Editar Projeto',
            isFreeAction: false,
            onClick: (evt, data) => handleClickOpenEdt(evt, data)
          }

        ]}
        editable={{
          onRowDelete: oldData =>
            new Promise(resolve => {
              setTimeout(() => {
                resolve()
                setState(prevState => {
                  const data = [...prevState.data]
                  data.splice(data.indexOf(oldData), 1)
                  return { ...prevState, data }
                })
              }, 600)
            })
        }}
      />

      <Modal titulo='Novo Projeto' open={openAdd} handleClose={handleCloseAdd} handleSave={handleSaveAdd}>
        <TextField
          onChange={(e) => {
            const val = e.target.value
            setProjetoInfo(prevState => {
              return { ...prevState, nome: val }
            })
          }}
          autoFocus
          margin='dense'
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
          margin='dense'
          id='descricao'
          label='Descrição'
          type='text'
          multiline
          rows='4'
          fullWidth
        />

        <Grid item xs>
          <TextField
            onChange={(e) => {
              const val = e.target.value
              setProjetoInfo(prevState => {
                return { ...prevState, owner: val }
              })
            }}
            margin='dense'
            id='owner'
            label='Owner'
            type='text'
          />
        </Grid>

        <Grid item xs>
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <KeyboardDatePicker
              label='Data de Entrega'
              clearable
              value={selectedDate}
              onChange={date => handleDateChange(date)}
              minDate={new Date()}
              format='dd/MM/yyyy'
            />
          </MuiPickersUtilsProvider>
        </Grid>
      </Modal>

      <Modal titulo='Editar Projeto' open={openEdt} handleClose={handleCloseEdt} handleSave={handleSaveEdt}>
        <TextField
          onChange={(e) => {
            const val = e.target.value
            setProjetoInfo(prevState => {
              return { ...prevState, nome: val }
            })
          }}
          value={projetoInfo.nome}
          autoFocus
          margin='dense'
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
          value={projetoInfo.descricao}
          margin='dense'
          id='descricao'
          label='Descrição'
          type='text'
          multiline
          rows='4'
          fullWidth
        />

        <Grid item xs>
          <TextField
            value={projetoInfo.owner}
            margin='dense'
            id='owner'
            label='Owner'
            type='text'
            disabled
          />
        </Grid>

        <Grid item xs>
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <KeyboardDatePicker
              label='Data de Entrega'
              clearable
              value={selectedDate}
              onChange={date => handleDateChange(date)}
              minDate={new Date()}
              format='dd/MM/yyyy'
            />
          </MuiPickersUtilsProvider>
        </Grid>
      </Modal>
    </>
  )
}

export default TabelaProjetos
