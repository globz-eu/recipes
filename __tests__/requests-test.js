import { rest } from "msw"
import { setupServer } from "msw/node"
import { getFromUrl, postToUrl } from "../src/requests"

const config = { backend: "https://recipes.eu/recipes" }
const data = { data: "data" }

const server = setupServer(
  rest.get("/config.json", (req, res, ctx) => res(
    ctx.json(config), ctx.status(200),
  )),
  rest.post(config.backend, (req, res, ctx) => res(
    ctx.json(data), ctx.status(201)
  )),
)

beforeAll(() => {
  server.listen()
})

afterAll(() => {
  server.close()
})

describe("getFromUrl", () => {
  it("returns the correct data", async () => {
    const response = await getFromUrl("config.json")
    expect(response).toEqual(config)
  })

  it("catches errors", async () => {
    server.use(
      rest.get("/config.json", (req, res, ctx) => res.once(
        ctx.status(404),
      )),
    )
    const response = await getFromUrl("config.json")
    expect(response).toEqual(null)
  })
})

describe("postToUrl", () => {
  it("returns the expected response", async () => {
    const response = await postToUrl(config.backend, data)
    expect(response).toEqual(data)
  })

  it("catches errors", async () => {
    server.use(
      rest.post(config.backend, (req, res, ctx) => res.once(
        ctx.status(400)
      ))
    )
    const response = await postToUrl(config.backend, data)
    expect(response).toEqual(null)
  })
})
