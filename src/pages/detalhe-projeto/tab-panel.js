import React from 'react'
import t from 'prop-types'

import {
  Box,
  Typography
} from '@material-ui/core'

const TabPanel = (props) => {
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

export default TabPanel
