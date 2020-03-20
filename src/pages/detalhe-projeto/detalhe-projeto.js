import React, { useState } from 'react'
import t from 'prop-types'
import styled from 'styled-components'
import {
  AppBar,
  Tabs,
  Tab,
  Typography,
  Box,
  Paper as MaterialPaper
} from '@material-ui/core'

const Detalhe = () => {
  const [value, setValue] = useState(0)

  const handleChange = (event, newValue) => {
    setValue(newValue)
  }

  function a11yProps (index) {
    return {
      id: `simple-tab-${index}`,
      'aria-controls': `simple-tabpanel-${index}`
    }
  }
  return (
    <>
      <AppBar position='static'>
        <Tabs value={value} onChange={handleChange} aria-label='simple tabs example'>
          <Tab label='Detalhes' {...a11yProps(0)} />
          <Tab label='Membros' {...a11yProps(1)} />
        </Tabs>
      </AppBar>

      <TabPanel value={value} index={0}>
        <Paper>
          <Label>
            Nome do Projeto
          </Label>
          <Campo>
            {window.location.state.nome}
          </Campo>
          <Label>
            Descrição
          </Label>
          <Campo>
            {window.location.state.descricao}
          </Campo>
          <Label>
            Owner
          </Label>
          <Campo>
            {
              window.location.state.usuarios.filter((item) => item.id === window.location.state.ownerId)[0].nome
            }
          </Campo>
          <Label>
            Data de Criação
          </Label>
          <Campo>
            {window.location.state.createdAt}
          </Campo>
          <Label>
            Data de Entrega
          </Label>
          <Campo>
            {window.location.state.dataEntrega}
          </Campo>
        </Paper>
      </TabPanel>
      <TabPanel value={value} index={1}>
        <Paper>
          {window.location.state.usuarios[0].nome}
        </Paper>
      </TabPanel>
    </>
  )
}

function TabPanel (props) {
  const { children, value, index, ...other } = props

  return (
    <Typography
      component='div'
      role='tabpanel'
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box p={3}>{children}</Box>}
    </Typography>
  )
}

TabPanel.propTypes = {
  children: t.node,
  index: t.any.isRequired,
  value: t.any.isRequired
}

const Paper = styled(MaterialPaper)`
padding: 30px;
`

const Campo = styled(Typography).attrs({
  variant: 'body1'
})`
margin: 20px;
`

const Label = styled(Typography).attrs({
  variant: 'h6'
})`
`

export default Detalhe
