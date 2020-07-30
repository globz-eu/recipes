import { render, screen } from "@testing-library/react"
import React from "react"
import Servings from "../../src/components/servings"

test("Servings component displays servings number", () => {
  render(<Servings servings={ 3 } />)
  expect(screen.getByText("3 servings")).toBeInTheDocument()
})
