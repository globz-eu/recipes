import { render, screen } from "@testing-library/react"
import React from "react"
import { useAuth0 } from "@auth0/auth0-react"
import Profile from "../../src/components/profile"

jest.mock("@auth0/auth0-react")

describe("Profile", () => {
  const user = {
    email: "johndoe@me.com",
    name: "John Doe",
    email_verified: true, // eslint-disable-line camelcase
    sub: "google-oauth2|2147627834623744883746",
  }

  beforeEach(() => {
    useAuth0.mockReturnValue({
      isAuthenticated: true,
      user
    })
  })

  it("displays the user name when authenticated", () => {
    render(<Profile />)
    expect(screen.getByText("John Doe")).toBeInTheDocument()
  })

  it("displays the user email when authenticated", () => {
    render(<Profile />)
    expect(screen.getByText("johndoe@me.com")).toBeInTheDocument()
  })
})
