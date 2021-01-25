import { render, screen, waitForElementToBeRemoved } from "@testing-library/react"
import React from "react"
import { useAuth0 } from "@auth0/auth0-react"
import Auth0App from "../../src/auth0/app"
import getLatestData from "../../src/restBackend/getLatestData"
import submit from "../../src/restBackend/submit"
import { server, config } from "../../mockApi/authApi"
import recipes from "../../testData/recipes.json"

jest.mock("@auth0/auth0-react")

beforeAll(() => {
  server.listen()
})

afterAll(() => {
  server.close()
})

describe("Auth0App, when user is authenticated", () => {
  const user = {
    email: "johndoe@me.com",
    name: "John Doe",
    email_verified: true, // eslint-disable-line camelcase
    sub: "google-oauth2|2147627834623744883746",
  }

  beforeEach(() => {
    useAuth0.mockReturnValue({
      isAuthenticated: true,
      user,
      getAccessTokenSilently: jest.fn(() => "accessToken")
    })
    render(<Auth0App config={ config } getLatestData={ getLatestData } submit={ submit } />)
  })

  it("contains the log out button", async () => {
    await waitForElementToBeRemoved(screen.queryByText("Loading ..."))
    expect(screen.getByText("Log Out")).toBeInTheDocument()
  })

  it("contains the user profile", async () => {
    await waitForElementToBeRemoved(screen.queryByText("Loading ..."))
    expect(screen.getByText("John Doe")).toBeInTheDocument()
    expect(screen.getByText("johndoe@me.com")).toBeInTheDocument()
  })

  it("contains the expected recipe titles", async () => {
    await waitForElementToBeRemoved(screen.queryByText("Loading ..."))
    recipes.forEach(recipe => {
      expect(screen.getByText(recipe.name)).toBeInTheDocument()
    })
  })
})

describe("Auth0App, when user is not authenticated", () => {
  beforeEach(() => {
    useAuth0.mockReturnValue({
      isAuthenticated: false
    })
    render(<Auth0App config={ config } getLatestData={ getLatestData } submit={ submit } />)
  })

  it("contains the login button", async () => {
    expect(screen.getByText("Log In")).toBeInTheDocument()
  })

  it("contains the please log in hint", () => {
    expect(screen.getByText("Please log in ...")).toBeInTheDocument()
  })
})
