import React, { useState, useContext, useEffect } from 'react'

import {
  AppBar,
  Tabs,
  Tab,
  Select,
  MenuItem,
  Grid,
  InputLabel,
  FormControl,
  Dialog,
  DialogContent,
  DialogTitle,
  Typography
} from '@material-ui/core'
import AutorenewIcon from '@material-ui/icons/Autorenew'

import TabPanel from 'pages/detalhe-projeto/tab-panel'
import TabelaPonderacao from 'pages/priorizacao/tabela-ponderacao'
import { Paper, TabelaDefault } from 'ui'

import { ProjetoContext } from 'contexts/projetos'
import { AuthContext } from 'contexts/auth'
import { CriterioContext } from 'contexts/criterios'

const Priorizacao = () => {
  const { projetos, /* buscarProjeto, */ listarProjetos } = useContext(ProjetoContext)
  const { userLogin } = useContext(AuthContext)
  const { /* criterio, buscarCriterio, */ ponderacaoCriterio, listarPonderacaoCriterio } = useContext(CriterioContext)

  const [value, setValue] = useState(0)
  const [projetoSelect, setProjetoSelect] = useState('')
  const [matriz, setMatriz] = useState(null)
  const [abrirModalEdt, setAbrirModalEdt] = useState(false)

  useEffect(() => {
    listarProjetos()
  }, [listarProjetos, projetos])

  const exibirTabelas = projetoSelect != null && ponderacaoCriterio.length > 0

  const handleChangeTab = (event, newValue) => {
    setValue(newValue)
  }

  const handleChangeProjeto = (e) => {
    console.log(e.target.value)
    setProjetoSelect(e.target.value)
    listarProjetos()
    listarPonderacaoCriterio(userLogin.user.id, e.target.value.id)
    setMatriz(Array.from({ length: e.target.value.criterios.length }, () => Array.from({ length: e.target.value.criterios.length }, () => 1)))
  }

  /*   const handleCriterio = (linha) => {
    console.log(linha)
    buscarCriterio(linha)
    return criterio
  } */

  const handleValorPorcetagem = (linha) => `${linha * 100}%`

  const handleAbriModalEdt = (evt, data) => {
    setAbrirModalEdt(true)
  }

  const handleFecharModalEdt = () => {
    setAbrirModalEdt(false)
  }

  const colunas = [
    {
      title: 'Criterio',
      field: 'criterioId'
    },
    {
      title: 'Valor',
      field: 'valor',
      render: (linha) => handleValorPorcetagem(linha.valor)
    }
  ]

  const dados = ponderacaoCriterio.length > 0 ? ponderacaoCriterio : []

  const acoes = [{
    icon: () => <AutorenewIcon />,
    tooltip: 'Refazer Ponderação dos Critérios',
    isFreeAction: true,
    onClick: (evt, data) => handleAbriModalEdt(evt, data)
  }]

  return (
    <>
      <AppBar position='static'>
        <Tabs value={value} onChange={handleChangeTab} aria-label='simple tabs example'>
          <Tab label='Critérios' {...a11yProps(0)} />
          <Tab label='Requisitos' {...a11yProps(1)} />
        </Tabs>
      </AppBar>

      <TabPanel value={value} index={0}>
        <Paper>
          <Grid
            container
            spacing={2}
            direction='column'
            justify='center'
            alignItems='stretch'
          >
            <Grid item>
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
                  value={projetoSelect}
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
            </Grid>

            <Grid item>
              {exibirTabelas &&
                (
                  <TabelaDefault
                    titulo='Vetor Prioritário'
                    columns={colunas}
                    data={dados}
                    search={false}
                    actions={acoes}
                  />
                )}

              {projetoSelect && ponderacaoCriterio.length === 0 &&
                (
                  <TabelaPonderacao
                    projeto={projetoSelect}
                    matriz={matriz}
                    setMatriz={setMatriz}
                    refazer={false}
                  />
                )}
            </Grid>
          </Grid>
        </Paper>
      </TabPanel>

      <TabPanel value={value} index={1}>
        <Paper>
          <Typography>
            Priorização dos Requisitos
          </Typography>
        </Paper>
      </TabPanel>

      <Dialog open={abrirModalEdt} onClose={handleFecharModalEdt} aria-labelledby='form-dialog-title'>
        <DialogTitle id='form-dialog-title'>Refazer Ponderação dos Critérios</DialogTitle>
        <DialogContent>
          <TabelaPonderacao
            projeto={projetoSelect}
            matriz={matriz}
            setMatriz={setMatriz}
            refazer
          />
        </DialogContent>
      </Dialog>
    </>
  )
}

function a11yProps (index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`
  }
}

export default Priorizacao
