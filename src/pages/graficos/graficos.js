import React, { useState } from 'react'

import {
  AppBar,
  Tabs,
  Tab,
  Typography
} from '@material-ui/core'

import { Page, TabPanel } from 'ui'
import SelectProjeto from 'pages/priorizacao/select-projeto'
import { listaProjetos } from 'services/data-fake'

const Graficos = () => {
  const [projeto, setProjeto] = useState('')
  const [value, setValue] = useState(0)

  const handleChange = (event, newValue) => {
    setValue(newValue)
  }

  const handleChangeProjeto = (e) => {
    setProjeto(e.target.value)
  }

  return (
    <Page>
      <SelectProjeto
        projetos={listaProjetos}
        projetoSelecionado={projeto}
        handleChangeProjeto={handleChangeProjeto}
      />

      <AppBar position='static'>
        <Tabs value={value} onChange={handleChange} aria-label='simple tabs example'>
          <Tab label='Detalhes' {...a11yProps(0)} />
          <Tab label='Membros' {...a11yProps(1)} />
          <Tab label='Critérios' {...a11yProps(2)} />
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
    </Page>
  )
}

function a11yProps (index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`
  }
}

export default Graficos
