import React, { useContext, useState } from 'react'
import t from 'prop-types'
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Grid,
  Button,
  Paper
} from '@material-ui/core'

import { SnackBar } from 'ui'

import { AuthContext } from 'contexts/auth'
import api from 'services/api'

const TabelaAddPonderacao = ({ projeto }) => {
  const { userLogin } = useContext(AuthContext)

  const [matriz, setMatriz] = useState(Array.from({ length: projeto.criterios.length }, () => Array.from({ length: projeto.criterios.length }, () => 1)))
  const [openSnackbar, setOpenSnackbar] = useState(false)

  const handleClickSnackbar = () => {
    setOpenSnackbar(true)
  }

  const handleCloseSnackbar = (event, reason) => {
    if (reason === 'clickaway') {
      return
    }

    setOpenSnackbar(false)
  }

  const handleChange = (row, column, event) => {
    const copy = [...matriz]
    if (event.target.value.includes('/')) {
      copy[row][column] = Number((1 / event.target.value.slice(-1)).toFixed(2))
    } else {
      copy[row][column] = +event.target.value
    }
    setMatriz(copy)
  }

  const handleClickSalvar = () => {
    const matrizComparacao = {
      matriz,
      usuarioId: userLogin.user.id,
      projetoId: projeto.id,
      criterios: projeto.criterios
    }

    api.post('/priorizacoes_criterio', matrizComparacao)
      .then((response) => {
        handleClickSnackbar()
      })
  }

  return (
    <>
      <Grid container spacing={4}>
        <Grid item>
          <TableContainer component={Paper}>
            <Table aria-label='simple table'>
              <TableHead>
                <TableRow>
                  <TableCell>Poderação dos Critérios</TableCell>
                  {projeto.criterios.map((criterio) => (
                    <TableCell key={criterio.id}>{criterio.nome}</TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {matriz.map((row, rowIndex) => (
                  <TableRow key={rowIndex}>
                    <TableCell key={projeto.criterios[rowIndex].id}>{projeto.criterios[rowIndex].nome}</TableCell>
                    {row.map((column, columnIndex) => {
                      if (rowIndex === columnIndex) {
                        return (
                          <TableCell key={columnIndex}>
                            <TextField
                              variant='outlined'
                              disabled
                              value={1}
                            />
                          </TableCell>
                        )
                      } else {
                        return (
                          <TableCell key={columnIndex}>
                            <TextField
                              variant='outlined'
                              onChange={e => handleChange(rowIndex, columnIndex, e)}
                            />
                          </TableCell>
                        )
                      }
                    })}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>

        <Grid container spacing={2} justify='flex-end'>
          <Grid item>
            <Button variant='outlined' onClick={handleClickSalvar} color='primary'>
              Salvar
            </Button>
          </Grid>
        </Grid>
      </Grid>

      <SnackBar
        openSnackbar={openSnackbar}
        duracao={4000}
        handleClose={handleCloseSnackbar}
        tipo='success'
        mensagem='Os Critérios de Priorização foram ponderados com Sucesso!'
      />
    </>
  )
}

TabelaAddPonderacao.propTypes = {
  projeto: t.object
}

export default TabelaAddPonderacao
