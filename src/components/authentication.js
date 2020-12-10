import React from "react"
import LoginButton from "./loginButton"
import LogoutButton from "./logoutButton"
import Profile from "./profile"

export default ({ isAuthenticated }) => {
  if (isAuthenticated != null) {
    return (
      <>
        {
          !isAuthenticated && <LoginButton />
        }
        {
          isAuthenticated && <LogoutButton />
        }
        <Profile />
        {
          !isAuthenticated && <div>Please log in ...</div>
        }
      </>
    )
  } else {
    return null
  }
}
