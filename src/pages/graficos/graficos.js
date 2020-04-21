import React, { useState, useContext, useEffect } from 'react'

import {
  AppBar,
  Tabs,
  Tab,
  Typography,
  Grid
} from '@material-ui/core'

import { Page, TabPanel } from 'ui'
import SelectProjeto from 'pages/priorizacao/select-projeto'
import { ProjetoContext } from 'contexts/projetos'
import { AuthContext } from 'contexts/auth'

const Graficos = () => {
  const [projeto, setProjeto] = useState('')
  const [value, setValue] = useState(0)

  const { projetos, listarProjetos } = useContext(ProjetoContext)
  const { userLogin } = useContext(AuthContext)

  useEffect(() => {
    listarProjetos(userLogin.user.id)
  }, [listarProjetos, userLogin.user.id])

  const handleChange = (event, newValue) => {
    setValue(newValue)
  }

  const handleChangeProjeto = (e) => {
    setProjeto(e.target.value)
  }

  return (
    <Page>
      <Grid
        container
        direction='column'
        justify='center'
        alignItems='stretch'
        spacing={3}
      >
        <Grid item>
          <Typography variant='h4'>Informações do Projeto</Typography>
        </Grid>

        <Grid item>
          <SelectProjeto
            projetos={projetos}
            projetoSelecionado={projeto}
            handleChangeProjeto={handleChangeProjeto}
          />
        </Grid>

        <Grid item>
          {projeto !== '' && (
            <>
              <AppBar position='static'>
                <Tabs value={value} onChange={handleChange} aria-label='simple tabs example'>
                  <Tab label='Priorização' {...a11yProps(0)} />
                  <Tab label='Requisitos Criados Por' {...a11yProps(1)} />
                  <Tab label='Estimativas' {...a11yProps(2)} />
                </Tabs>
              </AppBar>

              <TabPanel value={value} index={0}>
                <Typography> Page </Typography>
              </TabPanel>

              <TabPanel value={value} index={1}>
                <Typography> Page </Typography>
              </TabPanel>

              <TabPanel value={value} index={2}>
                <Typography> Page </Typography>
              </TabPanel>
            </>
          )}
        </Grid>
      </Grid>
    </Page>
  )
}

const a11yProps = (index) => {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`
  }
}

export default Graficos
