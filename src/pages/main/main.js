import React, { useState, useContext } from 'react'
import clsx from 'clsx'
import { makeStyles, useTheme } from '@material-ui/core/styles'
import Drawer from '@material-ui/core/Drawer'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import List from '@material-ui/core/List'
import CssBaseline from '@material-ui/core/CssBaseline'
import Typography from '@material-ui/core/Typography'
import Divider from '@material-ui/core/Divider'
import IconButton from '@material-ui/core/IconButton'
import MenuIcon from '@material-ui/icons/Menu'
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft'
import ChevronRightIcon from '@material-ui/icons/ChevronRight'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import AccountCircle from '@material-ui/icons/AccountCircle'
import Menu from '@material-ui/core/Menu'
import MenuItem from '@material-ui/core/MenuItem'
import Button from '@material-ui/core/Button'
import MenuBookIcon from '@material-ui/icons/MenuBook'
import ListAltIcon from '@material-ui/icons/ListAlt'
import EventNoteIcon from '@material-ui/icons/EventNote'
import SettingsIcon from '@material-ui/icons/Settings'
import PieChartIcon from '@material-ui/icons/PieChart'
import SwapVertIcon from '@material-ui/icons/SwapVert'
import Card from '@material-ui/core/Card'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import Grid from '@material-ui/core/Grid'

import { AuthContext } from 'contexts/auth'

const drawerWidth = 240

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex'
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    })
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen
    })
  },
  menuButton: {
    marginRight: 36
  },
  hide: {
    display: 'none'
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap'
  },
  drawerOpen: {
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen
    })
  },
  drawerClose: {
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    }),
    overflowX: 'hidden',
    width: theme.spacing(7) + 1,
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing(9) + 1
    }
  },
  toolbar: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: theme.spacing(0, 1),
    ...theme.mixins.toolbar
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3)
  }
}))

const Main = () => {
  const classes = useStyles()
  const theme = useTheme()

  const [open, setOpen] = React.useState(false)
  const [anchorLogin, setAnchorLogin] = useState(null)
  const [anchorProjeto, setAnchorProjeto] = React.useState(null)

  const { userInfo, handleLogout } = useContext(AuthContext)
  const userName = userInfo.user.nome.split(' ')[0]

  const handleClickProjeto = e => {
    setAnchorProjeto(e.currentTarget)
  }

  const handleCloseProjeto = () => {
    setAnchorProjeto(null)
  }

  const handleOpenLogin = (e) => {
    setAnchorLogin(e.target)
  }

  const handleCloseLogin = () => {
    setAnchorLogin(null)
  }

  const handleDrawerOpen = () => {
    setOpen(true)
  }

  const handleDrawerClose = () => {
    setOpen(false)
  }

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar
        position='fixed'
        className={clsx(classes.appBar, {
          [classes.appBarShift]: open
        })}
      >
        <Toolbar>
          <IconButton
            color='inherit'
            aria-label='open drawer'
            onClick={handleDrawerOpen}
            edge='start'
            className={clsx(classes.menuButton, {
              [classes.hide]: open
            })}
          >
            <MenuIcon />
          </IconButton>

          <Typography variant='h6' noWrap style={{ flexGrow: 1 }}>
            SPR - AHP
          </Typography>

          <IconButton color='inherit' onClick={() => console.log('clicou')}>
            <MenuBookIcon />
            <Typography>
              Tutoriais
            </Typography>
          </IconButton>

          <Button aria-controls='simple-menu' aria-haspopup='true' color='inherit' onClick={handleClickProjeto}>
            Projetos
          </Button>
          <Menu
            anchorEl={anchorProjeto}
            keepMounted
            open={Boolean(anchorProjeto)}
            onClose={handleCloseProjeto}
          >
            <MenuItem onClick={handleCloseProjeto}>Profile</MenuItem>
            <MenuItem onClick={handleCloseProjeto}>My account</MenuItem>
            <MenuItem onClick={handleCloseProjeto}>Logout</MenuItem>
          </Menu>

          <Typography color='inherit'>Olá, {userName}</Typography>

          <IconButton color='inherit' onClick={handleOpenLogin}>
            <AccountCircle />
          </IconButton>

          <Menu
            open={!!anchorLogin}
            onClose={handleCloseLogin}
            anchorEl={anchorLogin}
          >
            <MenuItem onClick={handleLogout}>Sair</MenuItem>
          </Menu>
        </Toolbar>
      </AppBar>
      <Drawer
        variant='permanent'
        className={clsx(classes.drawer, {
          [classes.drawerOpen]: open,
          [classes.drawerClose]: !open
        })}
        classes={{
          paper: clsx({
            [classes.drawerOpen]: open,
            [classes.drawerClose]: !open
          })
        }}
      >
        <div className={classes.toolbar}>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
          </IconButton>
        </div>
        <Divider />
        <List>
          <ListItem button>
            <ListItemIcon>
              <EventNoteIcon />
            </ListItemIcon>
            <ListItemText primary='Projetos' />
          </ListItem>

          <ListItem button>
            <ListItemIcon>
              <ListAltIcon />
            </ListItemIcon>
            <ListItemText primary='Requisitos' />
          </ListItem>

          <ListItem button>
            <ListItemIcon>
              <SwapVertIcon />
            </ListItemIcon>
            <ListItemText primary='Priorização' />
          </ListItem>

          <ListItem button>
            <ListItemIcon>
              <PieChartIcon />
            </ListItemIcon>
            <ListItemText primary='Gráficos' />
          </ListItem>

          <ListItem button>
            <ListItemIcon>
              <SettingsIcon />
            </ListItemIcon>
            <ListItemText primary='Configurações' />
          </ListItem>
        </List>
      </Drawer>

      <main className={classes.content}>
        <div className={classes.toolbar} />
        <Typography variant='h3' style={{ margin: theme.spacing(3) }}>
          Bem vindo, {userName}!
        </Typography>

        <Typography variant='h4' style={{ margin: theme.spacing(3) }}>
          Este é o dashboard do projeto 1
        </Typography>

        <Grid container spacing={5}>
          <Grid item xs={6}>
            <Card>
              <CardContent>
                <Typography color='textSecondary' gutterBottom>
                  Word of the Day
                </Typography>
              </CardContent>
              <CardActions>
                <Button size='small'>Gráfico 1</Button>
              </CardActions>
            </Card>
          </Grid>

          <Grid item xs={6}>
            <Card>
              <CardContent>
                <Typography color='textSecondary' gutterBottom>
                  Word of the Day
                </Typography>
              </CardContent>
              <CardActions>
                <Button size='small'>Gráfico 2</Button>
              </CardActions>
            </Card>
          </Grid>
        </Grid>
      </main>
    </div>
  )
}

export default Main
