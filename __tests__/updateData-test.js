import { rest } from "msw"
import { setupServer } from "msw/node"
import updateData, { getData } from "../src/updateData"
import recipes from "../testData/recipes.json"

const config = { backend: "https://recipes.eu/recipes" }

const server = setupServer(
  rest.get("/config.json", (req, res, ctx) => res(
    ctx.json(config), ctx.status(200),
  )),
  rest.get(config.backend, (req, res, ctx) => res(
    ctx.json(recipes), ctx.status(200),
  )),
)

beforeAll(() => {
  server.listen()
})

afterAll(() => {
  server.close()
})

describe("getData", () => {
  it("returns the expected data", async () => {
    const data = await getData()
    expect(data).toEqual({ config, recipes })
  })
})

describe("updateData", () => {
  it("calls the callback with the expected data", async () => {
    const mockCallback = jest.fn(data => data)
    await updateData(mockCallback)
    expect(mockCallback.mock.calls.length).toBe(1)
    expect(mockCallback.mock.results[0].value).toEqual({ config, recipes })
  })
})
