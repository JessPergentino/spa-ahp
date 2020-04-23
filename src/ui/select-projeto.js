import React from 'react'
import t from 'prop-types'

import {
  Select,
  MenuItem,
  InputLabel,
  FormControl
} from '@material-ui/core'

const SelectProjeto = ({ projetos, projetoSelecionado, handleChangeProjeto }) => {
  return (
    <>
      {console.log('projetoSelecionado', projetoSelecionado)}
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
          value={projetoSelecionado}
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
    </>
  )
}

SelectProjeto.propTypes = {
  projetos: t.array,
  projetoSelecionado: t.any,
  handleChangeProjeto: t.func
}

export default SelectProjeto
