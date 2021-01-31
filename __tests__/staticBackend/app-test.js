import { render, screen, waitForElementToBeRemoved } from "@testing-library/react"
import React from "react"
import App from "../../src/app"
import getLatestData from "../../src/staticBackend/getLatestData"
import submit from "../../src/staticBackend/submit"
import Database from "../../src/staticBackend/db"
import { server, config } from "../../mockApi/staticApi"
import recipes from "../../testData/recipes.json"

let db

beforeAll(() => {
  db = new Database()
  server.listen()
})

afterAll(() => {
  db.delete()
  server.close()
})

describe("App", () => {
  beforeEach(() => {
    render(<App config={ config } getLatestData={ getLatestData } submit={ submit } db={ db } />)
  })

  it("contains the expected recipe titles", async () => {
    await waitForElementToBeRemoved(screen.queryByText("Loading ..."))
    recipes.forEach(recipe => {
      expect(screen.getByText(recipe.name)).toBeInTheDocument()
    })
  })
})
