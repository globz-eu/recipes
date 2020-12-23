import { rest } from "msw"
import { server, config } from "../mockApi/api"
import newRecipe from "../testData/newRecipe.json"
import { getFromUrl, postToUrl } from "../src/requests"

beforeAll(() => {
  server.listen()
})

afterAll(() => {
  server.close()
})

describe("getFromUrl", () => {
  it("returns the correct data", async () => {
    const response = await getFromUrl("config.json")
    expect(response.status).toEqual(200)
    expect(response.data).toEqual(config)
  })

  it("catches errors", async () => {
    server.use(
      rest.get("/config.json", (req, res, ctx) => res.once(
        ctx.status(404),
      )),
    )
    const response = await getFromUrl("config.json")
    expect(response.status).toEqual(404)
  })
})

describe("postToUrl", () => {
  it("returns the expected response", async () => {
    const response = await postToUrl(config.backend, newRecipe)
    expect(response.status).toEqual(201)
    expect(response.data).toEqual(newRecipe)
  })

  it("catches errors", async () => {
    server.use(
      rest.post(config.backend, (req, res, ctx) => res.once(
        ctx.status(400)
      ))
    )
    const response = await postToUrl(config.backend, newRecipe)
    expect(response.status).toEqual(400)
  })
})
