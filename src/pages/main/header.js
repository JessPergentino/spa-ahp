import React, { useState, useContext } from 'react'
import { Link } from 'react-router-dom'
import { makeStyles } from '@material-ui/core/styles'
import {
  AppBar,
  Toolbar,
  Menu,
  MenuItem,
  IconButton,
  Typography,
  Button
} from '@material-ui/core'
import MenuBookIcon from '@material-ui/icons/MenuBook'
import AccountCircle from '@material-ui/icons/AccountCircle'

import { AuthContext } from 'contexts/auth'
import { ProjetoContext } from 'contexts/projetos'

const drawerWidth = 240

const useStyles = makeStyles(theme => ({
  appBar: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth
  }
}))

const Header = () => {
  const classes = useStyles()

  const [anchorLogin, setAnchorLogin] = useState(null)
  const [anchorProjeto, setAnchorProjeto] = React.useState(null)

  const { userLogin, logout } = useContext(AuthContext)
  const { projetos, setProjetoAtual } = useContext(ProjetoContext)

  const handleClickProjeto = e => {
    setAnchorProjeto(e.currentTarget)
  }

  const handleClickProjetoItem = (projeto) => {
    setProjetoAtual(projeto)
    handleCloseProjeto()
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

  return (
    <AppBar
      position='fixed'
      className={classes.appBar}
    >
      <Toolbar>
        <Typography variant='h6' noWrap style={{ flexGrow: 1 }}>
          SPR - AHP
        </Typography>

        <IconButton component={Link} to='/tutoriais' color='inherit'>
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
          {projetos ? projetos.map((projeto) => (
            <MenuItem
              key={projeto.id}
              onClick={(e) => handleClickProjetoItem(projeto)}
            >
              {projeto.nome}
            </MenuItem>
          )) : []}
        </Menu>

        <Typography color='inherit'>Olá, {userLogin.primeiroNome}</Typography>

        <IconButton color='inherit' onClick={handleOpenLogin}>
          <AccountCircle />
        </IconButton>

        <Menu
          open={!!anchorLogin}
          onClose={handleCloseLogin}
          anchorEl={anchorLogin}
        >
          <MenuItem onClick={logout}>Sair</MenuItem>
        </Menu>
      </Toolbar>
    </AppBar>
  )
}

export default Header
