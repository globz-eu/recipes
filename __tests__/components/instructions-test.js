import { render, screen } from "@testing-library/react"
import React from "react"
import Instructions from "../../src/components/instructions"

describe("InstructionBlock", () => {
  beforeEach(() => {
    render(<Instructions instructions="Recipe instructions" />)
  })

  it("displays an instruction title component", () => {
    expect(screen.getByText("Instructions:")).toBeInTheDocument()
  })

  it("displays instructions", () => {
    expect(screen.getByText("Recipe instructions")).toBeInTheDocument()
  })
})
