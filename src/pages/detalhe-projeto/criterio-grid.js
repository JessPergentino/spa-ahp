import styled from 'styled-components'
import { Grid } from '@material-ui/core'

const CriterioGrid = styled(Grid).attrs({
  container: true,
  spacing: 5,
  justify: 'space-around',
  direction: 'row',
  alignItems: 'center'
})`
  padding: 20px;
`

export default CriterioGrid
