import React, { useContext, useEffect } from 'react'
import {
  Grid
} from '@material-ui/core'

import TabelaProjetosMembro from 'pages/detalhe-membro/tabela-projeto-membro'
import InfoUsuario from 'pages/detalhe-membro/info-usuario'
import { UsuarioContext } from 'contexts/usuarios'

const DetalheMembro = () => {
  const { usuarios, listarUsuarios } = useContext(UsuarioContext)

  useEffect(() => {
    listarUsuarios()
  }, [listarUsuarios])

  const handleOwner = (ownerId) => {
    const usuario = usuarios.filter((usuario) => usuario.id === ownerId)
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
