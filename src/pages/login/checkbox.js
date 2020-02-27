import React from 'react'
import Checkbox from '@material-ui/core/Checkbox'
import FormControlLabel from '@material-ui/core/FormControlLabel'

export default function Checkboxes () {
  const [checked, setChecked] = React.useState(true)

  const handleChange = event => {
    setChecked(event.target.checked)
  }

  return (
    <div>
      <FormControlLabel
        control={
          <Checkbox
            checked={checked}
            onChange={handleChange}
            color='primary'
            inputProps={{ 'aria-label': 'primary checkbox' }}
          />
        }
        label='Mantenha-me Conectado'
      />
    </div>
  )
}
