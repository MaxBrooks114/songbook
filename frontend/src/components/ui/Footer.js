import { makeStyles } from '@material-ui/core/styles'
import React from 'react'

import footerLogo from '../../assets/footerLogo.png'

const useStyles = makeStyles((theme) => ({
  copy: {
    display: 'inline-block',
    width: 210,
    wordWrap: 'break-word',
    whiteSpace: 'normal'
  },

  footer: {
    backgroundColor: theme.palette.common.gray,
    width: '100%',
    position: 'absolute',
    bottom: 0,
    height: 60,
    zIndex: theme.zIndex.modal + 1,
    color: theme.palette.info.main,
    clear: 'both'
  },

  logo: {
    width: '4em',
    height: '4em',
    verticalAlign: 'bottom',
    marginLeft: '1em'
  }

}))

const Footer = () => {
  const classes = useStyles()
  return (
    <footer className={classes.footer}>
     <img src={footerLogo} alt="footer-logo" className={classes.logo}/>
     <span className={classes.copy} >SongBook by Max Brooks 2020</span>
    </footer>
  )
}

export default Footer
