import React, { useState, useContext } from 'react'
import { Link } from 'react-router-dom'
import { makeStyles } from '@material-ui/core/styles'
import {
  AppBar,
  Toolbar,
  Menu,
  MenuItem,
  IconButton,
  Typography
} from '@material-ui/core'
import MenuBookIcon from '@material-ui/icons/MenuBook'
import AccountCircle from '@material-ui/icons/AccountCircle'

import { AuthContext } from 'contexts/auth'

import { DETALHE_MEMBRO, TUTORIAIS } from 'routes'

const drawerWidth = 200

const useStyles = makeStyles(theme => ({
  appBar: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth
  }
}))

const Header = () => {
  const classes = useStyles()

  const [anchorLogin, setAnchorLogin] = useState(null)

  const { userLogin, logout } = useContext(AuthContext)

  const handleOpenLogin = (e) => {
    setAnchorLogin(e.target)
  }

  const handleCloseLogin = () => {
    setAnchorLogin(null)
  }

  const onclickPerfil = (e) => {
    window.location.state = userLogin.user
    setAnchorLogin(null)
  }
  return (
    <AppBar
      position='fixed'
      className={classes.appBar}
    >
      <Toolbar>
        <Typography variant='h6' noWrap style={{ flexGrow: 1 }}>
          SPR - AHP
        </Typography>

        <IconButton component={Link} to={TUTORIAIS} color='inherit'>
          <MenuBookIcon />
          <Typography>
            Tutoriais
          </Typography>
        </IconButton>

        <Typography color='inherit'>Olá, {userLogin.primeiroNome}</Typography>

        <IconButton color='inherit' onClick={handleOpenLogin}>
          <AccountCircle />
        </IconButton>

        <Menu
          open={!!anchorLogin}
          onClose={handleCloseLogin}
          anchorEl={anchorLogin}
        >
          <MenuItem component={Link} to={DETALHE_MEMBRO} onClick={onclickPerfil}>Perfil</MenuItem>
          <MenuItem onClick={logout}>Sair</MenuItem>
        </Menu>
      </Toolbar>
    </AppBar>
  )
}

export default Header
