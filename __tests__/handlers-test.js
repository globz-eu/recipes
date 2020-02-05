import axios from "axios"
import { handleSubmit, inputChange } from "../src/handlers"

describe("submit", () => {
  let event
  let setInputs
  let updateData
  const inputs = { inputName: "input" }
  const backend = "http://127.0.0.1:8080/recipes/"

  beforeEach(() => {
    event = { preventDefault: jest.fn() }
    setInputs = jest.fn()
    updateData = jest.fn()
    axios.post = jest.fn().mockResolvedValue({})
  })

  it("should prevent event default when there is an event", async () => {
    await handleSubmit(event, inputs, setInputs, backend, updateData)
    expect(event.preventDefault.mock.calls.length).toBe(1)
  })

  it("should post data to backend", async () => {
    await handleSubmit(event, inputs, setInputs, backend, updateData)
    expect(axios.post.mock.calls[0][0]).toEqual(backend, inputs)
  })

  it("should reset inputs", async () => {
    await handleSubmit(event, inputs, setInputs, backend, updateData)
    expect(setInputs.mock.calls[0][0]).toEqual({})
  })

  it("should update data", async () => {
    await handleSubmit(event, inputs, setInputs, backend, updateData)
    expect(updateData.mock.calls.length).toBe(1)
  })

  it("should handle submit even when there is no event", async () => {
    event = null
    await handleSubmit(event, inputs, setInputs, backend, updateData)
    expect(axios.post.mock.calls[0][0]).toEqual(backend, inputs)
    expect(setInputs.mock.calls[0][0]).toEqual({})
    expect(updateData.mock.calls.length).toBe(1)
  })
})

describe("inputChange", () => {
  let event
  let inputs
  let setInputs

  beforeEach(() => {
    event = {
      persist: jest.fn(),
      target: {
        name: "title",
        value: "Lekker"
      }
    }
    inputs = { servings: 4 }
    setInputs = jest.fn()
  })

  it("should persist event", () => {
    inputChange(event, inputs, setInputs)
    expect(event.persist.mock.calls.length).toBe(1)
  })

  it("should set the expected inputs", () => {
    inputChange(event, inputs, setInputs)
    expect(setInputs.mock.calls[0][0]).toStrictEqual({
      servings: 4,
      title: "Lekker"
    })
  })

  it("should modify existing inputs", () => {
    event.target = { name: "servings", value: 6 }
    inputChange(event, inputs, setInputs)
    expect(setInputs.mock.calls[0][0]).toStrictEqual({
      servings: 6
    })
  })
})
