import { render, screen } from "@testing-library/react"
import React from "react"
import Recipe from "../../src/components/recipe"

describe("Recipe", () => {
  beforeEach(() => {
    render(<Recipe title="title" servings={ 4 } instructions="stir well" />)
  })

  it("displays title text", () => {
    expect(screen.getByText("title")).toBeInTheDocument()
  })

  it("displays servings", () => {
    expect(screen.getByText("4 servings")).toBeInTheDocument()
  })

  it("displays instructions", () => {
    expect(screen.getByText("stir well")).toBeInTheDocument()
  })
})
