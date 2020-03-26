import React from 'react'
import { BrowserRouter, Route } from 'react-router-dom'
import { CssBaseline } from '@material-ui/core'
import AuthProvider from 'contexts/auth'
import ProjetoProvider from 'contexts/projetos'
import RequisitoProvider from 'contexts/requisitos'
import UsuarioProvider from 'contexts/usuarios'
import App from './app'

function Root () {
  return (
    <AuthProvider>
      <ProjetoProvider>
        <RequisitoProvider>
          <UsuarioProvider>
            <CssBaseline />
            <BrowserRouter>
              <Route component={App} />
            </BrowserRouter>
          </UsuarioProvider>
        </RequisitoProvider>
      </ProjetoProvider>
    </AuthProvider>
  )
}

export default Root
