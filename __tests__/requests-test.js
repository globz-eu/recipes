import { rest } from "msw"
import { setupServer } from "msw/node"
import { getFromUrl, postToUrl } from "../src/requests"

const config = { backend: "http://localhost:8000/recipes/" }

const server = setupServer(
  rest.get("/config.json", (req, res, ctx) => res(
    ctx.json(config),
  )),
)

describe("getFromUrl", () => {
  beforeAll(() => {
    server.listen()
  })

  afterAll(() => {
    server.close()
  })

  it("returns the correct data", async () => {
    const response = await getFromUrl("config.json")
    expect(response).toEqual(config)
  })

  it("catches errors", async () => {
    server.use(
      rest.get("/config.json", (req, res, ctx) => res.once(
        ctx.status(500),
      )),
    )
    const response = await getFromUrl("config.json")
    expect(response).toEqual(null)
  })
})

describe("postToUrl", () => {
  const postData = { data: "data" }
  const postResponse = { data: { someData: "data" } }

  beforeEach(() => {
    axios.post = jest.fn().mockResolvedValue(postResponse)
  })

  it("returns the expected response", async () => {
    const response = await postToUrl(config.backend, postData)
    expect(response).toEqual(postResponse.data)
    expect(axios.post).toBeCalledWith(config.backend, postData)
  })

  it("catches errors", async () => {
    axios.post.mockRejectedValue()
    const response = await postToUrl(config.backend, postData)
    expect(response).toEqual(null)
  })
})
