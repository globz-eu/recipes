import { render, screen, waitForElementToBeRemoved } from "@testing-library/react"
import React from "react"
import App from "../../src/app"
import getLatestData from "../../src/restBackend/getLatestData"
import submit from "../../src/restBackend/submit"
import { server, config } from "../../mockApi/api"
import recipes from "../../testData/recipes.json"

beforeAll(() => {
  server.listen()
})

afterAll(() => {
  server.close()
})

describe("App", () => {
  beforeEach(() => {
    render(<App config={ config } getLatestData={ getLatestData } submit={ submit } />)
  })

  it("contains the expected recipe titles", async () => {
    await waitForElementToBeRemoved(screen.queryByText("Loading ..."))
    recipes.forEach(recipe => {
      expect(screen.getByText(recipe.name)).toBeInTheDocument()
    })
  })
})
