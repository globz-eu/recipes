import { handleSubmit, inputChange } from "../src/handlers"

describe("submit", () => {
  let event
  let callback
  let inputs

  beforeEach(() => {
    event = { preventDefault: jest.fn() }
    callback = jest.fn()
    inputs = { inputName: "input" }
  })

  it("should prevent event default when there is an event", () => {
    handleSubmit(event, inputs, callback)
    expect(event.preventDefault.mock.calls.length).toBe(1)
  })

  it("should call callback with inputs when there is an event", () => {
    handleSubmit(event, inputs, callback)
    expect(callback.mock.calls[0][0]).toBe(inputs)
  })

  it("should call callback even when there is no event", () => {
    event = null
    handleSubmit(event, inputs, callback)
    expect(callback.mock.calls[0][0]).toBe(inputs)
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
