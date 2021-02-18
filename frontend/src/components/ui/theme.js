import { createMuiTheme } from '@material-ui/core/styles'

const lightGray = '#f0f0f0'
const gray = '#d8d8d8'
const lightGreen = '#5B9279'
const mint = 'rgba(171, 204, 189)'
const mintTransparent = 'rgba(171, 204, 189, 0.75)'
const black = '#12130f'
const darkGreen = '#325944'
const orange = '#e84e25'

const theme = createMuiTheme({

  breakpoints: {
    values: {
      xs: 0,
      sm: 375,
      md: 768,
      lg: 1366,
      xl: 1680
    }
  },
  palette: {
    common: {
      orange,
      gray,
      darkGreen
    },
    primary: { main: mintTransparent },
    secondary: { main: mint },
    info: { main: black },
    background: { default: lightGray }
  },
  typography: {
    fontFamily: 'Spartan',
    tab: {
      textTransform: 'none',
      fontSize: '1rem'
    }
  },
  button: {
    color: black,
    background: `linear-gradient(90deg, ${lightGreen} 0%,  ${darkGreen} 100%)`,
    borderRadius: '5em',
    '&:hover': {
      background: darkGreen,
      color: black
    }
  }

})
export default theme
