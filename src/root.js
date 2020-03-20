import React from 'react'
import { BrowserRouter, Route } from 'react-router-dom'
import { CssBaseline } from '@material-ui/core'
import AuthProvider from 'contexts/auth'
import ProjetoProvider from 'contexts/projetos'
import App from './app'

function Root () {
  return (
    <AuthProvider>
      <ProjetoProvider>
        <CssBaseline />
        <BrowserRouter>
          <Route component={App} />
        </BrowserRouter>
      </ProjetoProvider>
    </AuthProvider>
  )
}

export default Root
