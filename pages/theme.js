import { createMuiTheme } from '@material-ui/core/styles'

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#29339B',
      light: '#74A4BC'
    },
    secondary: {
      main: '#F1FEC6',
      light: '#B6D6CC'
    },
    error: {
      main: '#FF3A20'
    },
    background: {
      default: '#fff'
    }
  }
})

export default theme
