import axios from "axios"
import { getFromUrl, postToUrl } from "../src/requests"

const config = { backend: "http://localhost:8000/recipes/" }

describe("getFromUrl", () => {
  beforeEach(() => {
    axios.get = jest.fn().mockResolvedValue({ data: config })
  })

  it("returns the correct data", async () => {
    const response = await getFromUrl("config.json")
    expect(response).toEqual(config)
    expect(axios.get).toBeCalledWith("config.json")
  })

  it("catches errors", async () => {
    axios.get.mockRejectedValue()
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
