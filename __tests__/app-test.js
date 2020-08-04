import { render, screen, waitForElementToBeRemoved } from "@testing-library/react"
import React from "react"
import { useAuth0 } from "@auth0/auth0-react"
import App from "../src/app"
import { server, config } from "../mockApi/api"
import recipes from "../testData/recipes.json"

jest.mock("@auth0/auth0-react")

beforeAll(() => {
  server.listen()
})

afterAll(() => {
  server.close()
})

describe("App, when user is authenticated", () => {
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
      getAccessTokenSilently: jest.fn()
    })
    render(<App config={ config } />)
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

  it("contains the expected servings numbers", async () => {
    await waitForElementToBeRemoved(screen.queryByText("Loading ..."))
    recipes.forEach(recipe => {
      expect(screen.getByText(`${recipe.servings} servings`)).toBeInTheDocument()
    })
  })

  it("contains the expected instructions", async () => {
    await waitForElementToBeRemoved(screen.queryByText("Loading ..."))
    recipes.forEach(recipe => {
      expect(screen.getByText(recipe.instructions)).toBeInTheDocument()
    })
  })

  it("contains a recipe form", async () => {
    await waitForElementToBeRemoved(screen.queryByText("Loading ..."))
    expect(screen.getByLabelText("Title")).toBeInTheDocument()
    expect(screen.getByLabelText("Servings")).toBeInTheDocument()
    expect(screen.getByLabelText("Instructions")).toBeInTheDocument()
  })
})

describe("App, when user is not authenticated", () => {
  beforeEach(() => {
    useAuth0.mockReturnValue({
      isAuthenticated: false
    })
    render(<App config={ config } />)
  })

  it("contains the login button", async () => {
    expect(screen.getByText("Log In")).toBeInTheDocument()
  })

  it("contains the please log in hint", () => {
    expect(screen.getByText("Please log in ...")).toBeInTheDocument()
  })
})
