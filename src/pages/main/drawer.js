import React from 'react'
import { Link } from 'react-router-dom'
import { makeStyles } from '@material-ui/core/styles'

import {
  Drawer,
  List,
  Divider,
  ListItem,
  ListItemIcon,
  ListItemText
} from '@material-ui/core'

import ListAltIcon from '@material-ui/icons/ListAlt'
import EventNoteIcon from '@material-ui/icons/EventNote'
import PieChartIcon from '@material-ui/icons/PieChart'
import SwapVertIcon from '@material-ui/icons/SwapVert'
import HomeIcon from '@material-ui/icons/Home'

import { HOME, PROJETOS, REQUISITOS, PRIORIZACAO, GRAFICOS } from 'routes'

const drawerWidth = 200

const useStyles = makeStyles(theme => ({
  appBar: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0
  },
  drawerPaper: {
    width: drawerWidth
  }
}))

const DrawerMain = () => {
  const classes = useStyles()

  return (
    <Drawer
      className={classes.drawer}
      variant='permanent'
      classes={{
        paper: classes.drawerPaper
      }}
      anchor='left'
    >
      <div className={classes.toolbar} />
      <Divider />
      <List>
        <ListItem component={Link} to={HOME} button>
          <ListItemIcon>
            <HomeIcon />
          </ListItemIcon>
          <ListItemText primary='Home' />
        </ListItem>

        <ListItem component={Link} to={PROJETOS} button>
          <ListItemIcon>
            <EventNoteIcon />
          </ListItemIcon>
          <ListItemText primary='Projetos' />
        </ListItem>

        <ListItem component={Link} to={REQUISITOS} button>
          <ListItemIcon>
            <ListAltIcon />
          </ListItemIcon>
          <ListItemText primary='Requisitos' />
        </ListItem>

        <ListItem component={Link} to={PRIORIZACAO} button>
          <ListItemIcon>
            <SwapVertIcon />
          </ListItemIcon>
          <ListItemText primary='Priorização' />
        </ListItem>

        <ListItem component={Link} to={GRAFICOS} button>
          <ListItemIcon>
            <PieChartIcon />
          </ListItemIcon>
          <ListItemText primary='Gráficos' />
        </ListItem>
      </List>
    </Drawer>
  )
}

export default DrawerMain
