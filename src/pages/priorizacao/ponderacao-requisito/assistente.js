import React, { useState } from 'react'
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

const Assistente = ({ projetoSelecionado }) => {
  const classes = useStyles()
  const [activeStep, setActiveStep] = useState(0)

  const getSteps = () => {
    const criterios = projetoSelecionado.criterios.map((item) => item.nome)
    return criterios
  }

  const getStepContent = (stepIndex) => {
    console.log('projeto', projetoSelecionado)
    return (
      <TabelaAddPonderacaoRequisito
        projetoSelecionado={projetoSelecionado}
        criterio={steps[stepIndex]}
      />
    )
  }

  const steps = getSteps()

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1)
  }

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1)
  }

  return (
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
  )
}

Assistente.propTypes = {
  projetoSelecionado: t.object
}

export default Assistente
