import { render, screen, waitForElementToBeRemoved } from "@testing-library/react"
import React from "react"
import App from "../src/app"
import { server } from "../mockApi/api"
import recipes from "../testData/recipes.json"

beforeAll(() => {
  server.listen()
})

afterAll(() => {
  server.close()
})

describe("App", () => {
  beforeEach(() => {
    render(<App />)
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
