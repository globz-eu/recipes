import { render, fireEvent, screen } from "@testing-library/react"
import React from "react"
import { useAuth0 } from "@auth0/auth0-react"
import LogoutButton from "../../src/components/logoutButton"

jest.mock("@auth0/auth0-react")

describe("LogoutButton", () => {
  const mockLogout = jest.fn()
  const user = {
    email: "johndoe@me.com",
    email_verified: true, // eslint-disable-line camelcase
    sub: "google-oauth2|2147627834623744883746",
  }

  beforeEach(() => {
    useAuth0.mockReturnValue({
      isAuthenticated: true,
      user,
      logout: mockLogout,
      loginWithRedirect: jest.fn(),
    })
  })

  it("calls logout when clicked", async () => {
    render(<LogoutButton />)
    fireEvent.click(screen.getByRole("button"))

    expect(mockLogout).toHaveBeenCalled()
  })
})
