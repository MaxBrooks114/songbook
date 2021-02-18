import CssBaseline from '@material-ui/core/CssBaseline'
import { ThemeProvider } from '@material-ui/core/styles'
import { MuiThemeProvider } from 'material-ui/styles'
import React, { useEffect, useMemo } from 'react'
import { useDispatch } from 'react-redux'
import { Route, Router, Switch } from 'react-router-dom'

import { fetchUser } from '../actions/auth'
import { fetchFiles } from '../actions/files'
import { fetchInstruments } from '../actions/instruments'
import { fetchSections } from '../actions/sections'
import { fetchSongs } from '../actions/songs'
import history from '../history'
import Login from './auth/Login'
import Logout from './auth/Logout'
import PasswordReset from './auth/PasswordReset'
import PrivateRoute from './auth/PrivateRoute'
import Register from './auth/Register'
import UserEdit from './auth/UserEdit'
import UserShow from './auth/UserShow'
import InstrumentContainer from './instruments/InstrumentContainer'
import SectionContainer from './sections/SectionContainer'
import SongContainer from './songs/SongContainer'
import SpotifySearch from './spotify/SpotifySearch'
import ErrorPage from './ui/ErrorPage'
import Footer from './ui/Footer'
import Home from './ui/Home'
import Navbar from './ui/Navbar'
import Progressbar from './ui/Progressbar'
import SuccessSnackBar from './ui/SuccessSnackBar'
import theme from './ui/theme'

const App = () => {
  const dispatch = useDispatch()

  useMemo(() => {
    dispatch(fetchUser())
    dispatch(fetchInstruments())
    dispatch(fetchSongs())
    dispatch(fetchSections())
    dispatch(fetchFiles())
  }, [dispatch])

  useEffect(() => {
    dispatch(fetchUser())
    dispatch(fetchInstruments())
    dispatch(fetchSongs())
    dispatch(fetchSections())
    dispatch(fetchFiles())
  }, [dispatch])

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />

      <Router history={history}>
        <Progressbar />
        <div id="container">

          <Navbar />
        <div id="body">
          <MuiThemeProvider>
              <Switch>
                <Route exact path="/" component={Home} />
                <Route path="/register" exact component={Register} />
                <Route path="/login" exact component={Login} />
                <PrivateRoute path='/passwordReset' exact comp={PasswordReset} />
                <PrivateRoute exact path="/users/:id/edit" comp={UserEdit} />
                <PrivateRoute path="/users/:id" comp={UserShow} />
                <PrivateRoute exact path="/logout" comp={Logout} />
                <PrivateRoute exact path="/search" comp={SpotifySearch} />
                <PrivateRoute path="/songs" comp={SongContainer} />
                <PrivateRoute path="/sections" comp={SectionContainer} />
                <PrivateRoute path="/instruments" comp={InstrumentContainer} />
                <Route path='*' component={ErrorPage} />
              </Switch>
            </MuiThemeProvider>
          </div>
          <Footer />
        </div>
        <SuccessSnackBar/>
      </Router>

    </ThemeProvider>

  )
}

export default App
