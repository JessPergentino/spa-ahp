import React, { useState, useEffect } from 'react'
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

const TabelaAddPonderacaoRequisito = ({ projetoSelecionado, criterio }) => {
  const [matriz, setMatriz] = useState(Array.from({ length: projetoSelecionado.requisitos.length }, () => Array.from({ length: projetoSelecionado.requisitos.length }, () => 1)))

  useEffect(() => {
    console.log('ponderação', projetoSelecionado)
    setMatriz(Array.from({ length: projetoSelecionado.requisitos.length }, () => Array.from({ length: projetoSelecionado.requisitos.length }, () => 1)))
  }, [projetoSelecionado])

  const handleChange = (row, column, event) => {
    const copy = [...matriz]
    if (event.target.value.includes('/')) {
      copy[row][column] = Number((1 / event.target.value.slice(-1)).toFixed(2))
    } else {
      copy[row][column] = +event.target.value
    }
    setMatriz(copy)
  }

  return (
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
              {console.log(matriz.length)}
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
  )
}

TabelaAddPonderacaoRequisito.propTypes = {
  projetoSelecionado: t.object,
  criterio: t.string
}

export default TabelaAddPonderacaoRequisito
