import { render, screen } from "@testing-library/react"
import React from "react"
import Title from "../../src/components/title"

test("Title component displays title text", () => {
  const testTitle = "Recipe Title"
  render(<Title title={ testTitle } />)
  expect(screen.getByText(testTitle)).toBeInTheDocument()
})
