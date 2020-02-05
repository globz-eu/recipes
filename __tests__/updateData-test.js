import axios from "axios"
import updateData, { getData } from "../src/updateData"
import { getFromUrl, postToUrl } from "../src/requests"
import recipes from "../testData/recipes.json"

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

describe("getData", () => {
  beforeEach(() => {
    axios.get = jest.fn()
      .mockResolvedValueOnce({ data: config })
      .mockResolvedValueOnce({ data: recipes })
  })

  it("returns the expected data", async () => {
    const data = await getData()
    expect(data).toEqual({ config, recipes })
  })
})

describe("updateData", () => {
  beforeEach(() => {
    axios.get = jest.fn()
      .mockResolvedValueOnce({ data: config })
      .mockResolvedValueOnce({ data: recipes })
  })

  it("calls the callback with the expected data", async () => {
    const mockCallback = jest.fn(data => data)
    await updateData(mockCallback)
    expect(mockCallback.mock.calls.length).toBe(1)
    expect(mockCallback.mock.results[0].value).toEqual({ config, recipes })
  })
})
 