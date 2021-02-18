import React from 'react'
import { useSelector } from 'react-redux'
import { Redirect, Route } from 'react-router-dom'

const PrivateRoute = ({ comp: Component, ...rest }) => {
  const auth = useSelector((state) => state.auth)
  return (
    < Route
      {...rest}
      render={(props) => {
        if (auth.isLoading) {
          return ' '
        } else if (!auth.isAuthenticated && !auth.isLoading) {
          return <Redirect to="/login" />
        } else {
          return <Component {...props} />
        }
      }}
    />
  )
}

export default PrivateRoute
