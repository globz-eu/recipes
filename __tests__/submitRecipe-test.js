import { rest } from "msw"
import { setupServer } from "msw/node"
import { submit, submitLocal } from "../src/submitRecipe"
import recipes from "../testData/recipes.json"

const config = { backend: "https://recipes.eu/recipes" }

const server = setupServer(
  rest.get("/config.json", (req, res, ctx) => res(
    ctx.json(config), ctx.status(200),
  )),
  rest.get(config.backend, (req, res, ctx) => res(
    ctx.json(recipes), ctx.status(200)
  )),
  rest.post(config.backend, (req, res, ctx) => res(
    ctx.json(recipes[1]), ctx.status(201)
  )),
)

beforeAll(() => {
  server.listen()
})

afterAll(() => {
  server.close()
})

describe("submit", () => {
  it("should submit the recipe passed from the form", async () => {
    const formData = recipes[1]
    const mockSetData = jest.fn(data => data)
    await submit(formData, config.backend, mockSetData)
    expect(mockSetData.mock.calls[0][0]).toStrictEqual({ config, recipes })
  })
})

describe("submitLocal", () => {
  it("should store the new data", async () => {
    const localConfig = { backend: "local", recipesData: "recipes" }
    const formData = recipes[1]
    const mockSetData = jest.fn(data => data)
    submitLocal(formData, localConfig, [recipes[0]], mockSetData)
    expect(mockSetData.mock.calls[0][0]).toStrictEqual({ config: localConfig, recipes })
  })
})
