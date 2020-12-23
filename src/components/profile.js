import React from "react"
import { useAuth0 } from "@auth0/auth0-react"

export default () => {
  const { user, isAuthenticated } = useAuth0()

  return (
    isAuthenticated &&
      <div>
        <h2>{ user.name }</h2>
        <p>{ user.email }</p>
      </div>
  )
}
