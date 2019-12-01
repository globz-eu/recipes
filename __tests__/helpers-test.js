import axios from "axios"
import { getFromUrl } from "../src/helpers"

describe("getFromUrl", () => {
  beforeEach(() => {
    const expected_response = { data: { backend: "http://localhost:8080/recipes" } }
    axios.get = jest.fn().mockResolvedValue(expected_response)
  })
  
  it("returns the correct data", async () => {
    const expected_response = { data: { backend: "http://localhost:8080/recipes" } }
    const response = await getFromUrl("config.json")
    expect(response).toEqual(expected_response.data)
    expect(axios.get).toBeCalledWith("config.json")
  })
  
  it("catches errors", async () => {
    axios.get.mockRejectedValue()
    const response = await getFromUrl("config.json")
    expect(response).toEqual(null)
  })
})
