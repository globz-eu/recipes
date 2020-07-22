import axios from "axios"
import updateData, { getData } from "../src/updateData"
import recipes from "../testData/recipes.json"

const config = { backend: "http://localhost:8000/recipes/" }

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
