import React from "react"
import formHook from "../src/formHook"
import { submit, inputChange } from "../src/handlers"

jest.mock("../src/handlers")
jest.mock("react")

describe("formHook", () => {
  let callback
  let event
  let mockInputs
  let setInputs

  beforeEach(() => {
    callback = "callback"
    event = "event"
    mockInputs = "inputs"
    setInputs = "setInputs"
    React.useState.mockImplementation(() => [mockInputs, setInputs])
    submit.mockImplementation((e, i, c) => ({ e, i, c }))
    inputChange.mockImplementation((e, i, s) => ({ e, i, s }))
  })

  it("should return handleSubmit with the expected signature", () => {
    const { handleSubmit } = formHook(callback)
    handleSubmit(event)
    expect(submit.mock.calls[0]).toEqual(["event", "inputs", "callback"])
  })

  it("should return handleInputChange with the expected signature", () => {
    const { handleInputChange } = formHook(callback)
    handleInputChange(event)
    expect(inputChange.mock.calls[0]).toEqual(["event", "inputs", "setInputs"])
  })

  it("should return inputs", () => {
    const { inputs } = formHook(callback)
    expect(inputs).toBe(mockInputs)
  })
})
