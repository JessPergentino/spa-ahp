import React from 'react'
import t from 'prop-types'
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Paper
} from '@material-ui/core'

const TabelaEdtPonderacaoRequisito = ({ projetoSelecionado, criterio, matriz, handleChangeMatriz }) => {
  const handleChange = (row, column, event) => {
    const copy = [...matriz]
    if (event.target.value.includes('/')) {
      copy[row][column] = Number((1 / event.target.value.slice(-1)).toFixed(2))
    } else {
      copy[row][column] = +event.target.value
    }
    handleChangeMatriz(copy)
  }

  return (
    <>
      <TableContainer component={Paper}>
        <Table aria-label='simple table'>
          <TableHead>
            <TableRow>
              <TableCell>{criterio}</TableCell>
              {projetoSelecionado.requisitos.map((requisito) => (
                <TableCell key={requisito.id}>{requisito.titulo}</TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {matriz.map((row, rowIndex) => (
              <TableRow key={rowIndex}>
                <TableCell key={projetoSelecionado.requisitos[rowIndex].id}>{projetoSelecionado.requisitos[rowIndex].titulo}</TableCell>
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
    </>
  )
}

TabelaEdtPonderacaoRequisito.propTypes = {
  matriz: t.any,
  handleChangeMatriz: t.func,
  projetoSelecionado: t.object,
  criterio: t.string
}

export default TabelaEdtPonderacaoRequisito
