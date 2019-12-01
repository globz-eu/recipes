import axios from "axios"
import updateData, { getFromUrl, getData } from "../src/updateData"
import testData from "../testData/recipes.json"

describe("getFromUrl", () => {
  beforeEach(() => {
    const config = { backend: "http://localhost:8080/recipes" }
    axios.get = jest.fn().mockResolvedValue({ data: config })
  })
  
  it("returns the correct data", async () => {
    const config = { backend: "http://localhost:8080/recipes" }
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
    const config = { backend: "http://localhost:8080/recipes" }
    axios.get = jest.fn()
      .mockResolvedValueOnce({ data: config })
      .mockResolvedValueOnce({ data: testData })
  })

  it("returns the expected data", async () => {
    const data = await getData()
    expect(data).toEqual(testData)
  })
})

describe("updateData", () => {
  beforeEach(() => {
    const config = { backend: "http://localhost:8080/recipes" }
    axios.get = jest.fn()
      .mockResolvedValueOnce({ data: config })
      .mockResolvedValueOnce({ data: testData })
  })

  it("calls the callback with the expected data", async () => {
    const mockCallback = jest.fn(data => data)
    await updateData(mockCallback)
    expect(mockCallback.mock.calls.length).toBe(1)
    expect(mockCallback.mock.results[0].value).toBe(testData)
  })
})
