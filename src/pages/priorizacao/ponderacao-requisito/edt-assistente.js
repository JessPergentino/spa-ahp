import React, { useState, useContext } from 'react'
import t from 'prop-types'
import { makeStyles } from '@material-ui/core/styles'
import {
  Stepper,
  Step,
  StepLabel,
  Button,
  Typography
} from '@material-ui/core/'
import TabelaEdtPonderacaoRequisito from 'pages/priorizacao/ponderacao-requisito/edt-ponderacao'

import { SnackBar } from 'ui'

import api from 'services/api'
import { AuthContext } from 'contexts/auth'
import { CriterioContext } from 'contexts/criterios'

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%'
  },
  backButton: {
    marginRight: theme.spacing(1)
  },
  instructions: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1)
  }
}))

const EdtAssistente = ({ projetoSelecionado, handleFechar }) => {
  const classes = useStyles()

  const { userLogin } = useContext(AuthContext)
  const { buscarPonderacaoRequisito } = useContext(CriterioContext)

  const [activeStep, setActiveStep] = useState(0)
  const [openSnackbar, setOpenSnackbar] = useState(false)
  const [matriz, setMatriz] = useState(Array.from({ length: projetoSelecionado.requisitos.length }, () => Array.from({ length: projetoSelecionado.requisitos.length }, () => 1)))

  const handleOpenSnackbar = () => {
    setOpenSnackbar(true)
  }

  const handleCloseSnackbar = (event, reason) => {
    if (reason === 'clickaway') {
      return
    }
    setOpenSnackbar(false)
  }

  const handleChangeMatriz = (copy) => {
    setMatriz(copy)
  }

  const getSteps = () => {
    const criterios = projetoSelecionado.criterios.sort((a, b) => {
      if (a.id > b.id) {
        return 1
      }
      if (a.id < b.id) {
        return -1
      }
      return 0
    }).map((item) => item.nome)
    return criterios
  }

  const getStepContent = (stepIndex) => {
    return (
      <TabelaEdtPonderacaoRequisito
        matriz={matriz}
        handleChangeMatriz={handleChangeMatriz}
        projetoSelecionado={projetoSelecionado}
        criterio={steps[stepIndex]}
      />
    )
  }

  const steps = getSteps()

  const handleNext = (e) => {
    e.preventDefault()
    e.target.reset()
    const criterio = projetoSelecionado.criterios.filter((c, index) => index === activeStep)

    const ponderacao = {
      matriz: matriz,
      criterioId: criterio[0].id,
      usuarioId: userLogin.user.id,
      projetoId: projetoSelecionado.id,
      requisitos: projetoSelecionado.requisitos
    }

    if (activeStep === steps.length - 1) {
      api.put('/priorizacoes_requisito', ponderacao)
        .then((response) => {
          buscarPonderacaoRequisito(userLogin.user.id, projetoSelecionado.id)
          handleOpenSnackbar()
          handleFechar()
        })
    } else {
      api.put('/priorizacoes_requisito', ponderacao)
        .then((response) => {
          handleOpenSnackbar()
        })
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1)
  }

  return (
    <>
      <div className={classes.root}>
        <form onSubmit={handleNext}>
          <Stepper activeStep={activeStep} alternativeLabel>
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>
          <div>
            {activeStep === steps.length ? (
              <div>
                <Typography className={classes.instructions}>Todas as Ponderações foram feitas!</Typography>
              </div>
            ) : (
              <div>
                {getStepContent(activeStep)}
                <div>
                  <Button type='submit' style={{ margin: '20px' }} variant='contained' color='primary'>
                    {activeStep === steps.length - 1 ? 'Finalizar' : 'Salvar'}
                  </Button>
                </div>
              </div>
            )}
          </div>
        </form>
      </div>

      <SnackBar
        openSnackbar={openSnackbar}
        duracao={4000}
        handleClose={handleCloseSnackbar}
        tipo='success'
        mensagem='A ponderação foi realizada com sucesso!'
      />
    </>
  )
}

EdtAssistente.propTypes = {
  projetoSelecionado: t.any,
  handleFechar: t.func
}

export default EdtAssistente
