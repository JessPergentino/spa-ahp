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
import TabelaAddPonderacaoRequisito from 'pages/priorizacao/ponderacao-requisito/add-ponderacao'

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

const AddAssistente = ({ projetoSelecionado, matriz, handleChangeMatriz }) => {
  const classes = useStyles()

  const { userLogin } = useContext(AuthContext)
  const { buscarPonderacaoRequisito } = useContext(CriterioContext)

  const [activeStep, setActiveStep] = useState(0)
  const [openSnackbar, setOpenSnackbar] = useState(false)

  const handleOpenSnackbar = () => {
    setOpenSnackbar(true)
  }

  const handleCloseSnackbar = (event, reason) => {
    if (reason === 'clickaway') {
      return
    }
    setOpenSnackbar(false)
  }

  const getSteps = () => {
    const criterios = projetoSelecionado.criterios.map((item) => item.nome)
    return criterios
  }

  const getStepContent = (stepIndex) => {
    return (
      <TabelaAddPonderacaoRequisito
        matriz={matriz}
        handleChangeMatriz={handleChangeMatriz}
        projetoSelecionado={projetoSelecionado}
        criterio={steps[stepIndex]}
      />
    )
  }

  const steps = getSteps()

  const handleNext = () => {
    const criterio = projetoSelecionado.criterios.filter((c, index) => index === activeStep)

    const ponderacao = {
      matriz: matriz,
      criterioId: criterio[0].id,
      usuarioId: userLogin.user.id,
      projetoId: projetoSelecionado.id,
      requisitos: projetoSelecionado.requisitos
    }

    if (activeStep === steps.length - 1) {
      api.post('/priorizacoes_requisito', ponderacao)
        .then((response) => {
          buscarPonderacaoRequisito(userLogin.user.id, projetoSelecionado.id)
          handleOpenSnackbar()
        })
    } else {
      api.post('/priorizacoes_requisito', ponderacao)
        .then((response) => {
          handleOpenSnackbar()
        })
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1)
  }

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1)
  }

  return (
    <>
      <div className={classes.root}>
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
                <Button
                  disabled={activeStep === 0}
                  onClick={handleBack}
                  className={classes.backButton}
                >
                  Voltar
                </Button>

                <Button style={{ margin: '20px' }} variant='contained' color='primary' onClick={handleNext}>
                  {activeStep === steps.length - 1 ? 'Finalizar' : 'Próximo'}
                </Button>
              </div>
            </div>
          )}
        </div>
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

AddAssistente.propTypes = {
  projetoSelecionado: t.object,
  matriz: t.any,
  handleChangeMatriz: t.func
}

export default AddAssistente
