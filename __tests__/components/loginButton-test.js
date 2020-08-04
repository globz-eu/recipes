import { render, fireEvent, screen } from "@testing-library/react"
import React from "react"
import { useAuth0 } from "@auth0/auth0-react"
import LoginButton from "../../src/components/loginButton"

jest.mock("@auth0/auth0-react")

describe("LoginButton", () => {
  const mockLoginWithRedirect = jest.fn()

  beforeEach(() => {
    useAuth0.mockReturnValue({
      isAuthenticated: false,
      user: false,
      logout: jest.fn(),
      loginWithRedirect: mockLoginWithRedirect,
    })
  })

  it("calls loginWithRedirect when clicked", async () => {
    render(<LoginButton />)
    fireEvent.click(screen.getByRole("button"))

    expect(mockLoginWithRedirect).toHaveBeenCalled()
  })
})
