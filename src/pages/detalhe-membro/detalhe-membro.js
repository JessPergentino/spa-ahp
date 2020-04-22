import React from 'react'
import {
  Grid
} from '@material-ui/core'

import TabelaProjetosMembro from 'pages/detalhe-membro/tabela-projeto-membro'
import InfoUsuario from 'pages/detalhe-membro/info-usuario'
import { listaUsuarios } from 'services/data-fake'

const DetalheMembro = () => {
  const handleOwner = (ownerId) => {
    const usuario = listaUsuarios.filter((usuario) => usuario.id === ownerId)
    return usuario[0].nome
  }
  return (
    <>
      <Grid container direction='column' alignItems='stretch' spacing={4}>
        <Grid item xs={12}>
          <InfoUsuario />
        </Grid>

        <Grid item xs={12}>
          <TabelaProjetosMembro
            handleOwner={handleOwner}
          />
        </Grid>
      </Grid>
    </>
  )
}

export default DetalheMembro
