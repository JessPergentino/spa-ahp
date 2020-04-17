import React from 'react'
import t from 'prop-types'
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker
} from '@material-ui/pickers'
import DateFnsUtils from '@date-io/date-fns'

const CampoData = ({ label, dataSelecionada, handleAlterarData }) => (
  <MuiPickersUtilsProvider utils={DateFnsUtils}>
    <KeyboardDatePicker
      label={label}
      clearable
      value={dataSelecionada}
      onChange={date => handleAlterarData(date)}
      minDate={new Date()}
      format='dd/MM/yyyy'
    />
  </MuiPickersUtilsProvider>
)

CampoData.propTypes = {
  dataSelecionada: t.any,
  handleAlterarData: t.func,
  label: t.string
}

export default CampoData
