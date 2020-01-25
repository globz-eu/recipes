import axios from "axios"
import updateData, { getFromUrl, getData } from "../src/updateData"
import recipes from "../testData/recipes.json"

const config = { backend: "http://localhost:8000/recipes" }

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
