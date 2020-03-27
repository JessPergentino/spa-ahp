import React from 'react'
import { BrowserRouter, Route } from 'react-router-dom'
import { CssBaseline } from '@material-ui/core'
import AuthProvider from 'contexts/auth'
import ProjetoProvider from 'contexts/projetos'
import RequisitoProvider from 'contexts/requisitos'
import UsuarioProvider from 'contexts/usuarios'
import CriterioProvider from 'contexts/criterios'
import App from './app'

function Root () {
  return (
    <AuthProvider>
      <ProjetoProvider>
        <RequisitoProvider>
          <UsuarioProvider>
            <CriterioProvider>
              <CssBaseline />
              <BrowserRouter>
                <Route component={App} />
              </BrowserRouter>
            </CriterioProvider>
          </UsuarioProvider>
        </RequisitoProvider>
      </ProjetoProvider>
    </AuthProvider>
  )
}

export default Root
