import React from 'react'
import t from 'prop-types'
import styled from 'styled-components'
import {
  Typography
} from '@material-ui/core'

const CampoPage = ({ titulo, info }) => (
  <>
    <Label>
      {titulo}
    </Label>
    <Campo>
      {info}
    </Campo>
  </>
)

const Campo = styled(Typography).attrs({
  variant: 'body1'
})`
margin: 20px;
`

const Label = styled(Typography).attrs({
  variant: 'h6'
})`
`

CampoPage.propTypes = {
  titulo: t.string,
  info: t.any
}

export default CampoPage
