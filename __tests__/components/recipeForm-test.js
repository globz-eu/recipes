import { render, fireEvent, screen } from "@testing-library/react"
import React from "react"
import { rest } from "msw"
import { setupServer } from "msw/node"
import RecipeForm from "../../src/components/recipeForm"

describe("RecipeForm", () => {
  it("contains the expected elements", () => {
    const backend = "http://recipes.com/api/recipes/"
    render(<RecipeForm updateData={ () => {} } backend={ backend } />)
    expect(screen.getByLabelText("Title")).toBeInTheDocument()
    expect(screen.getByLabelText("Servings")).toBeInTheDocument()
    expect(screen.getByLabelText("Instructions")).toBeInTheDocument()
  })

  it("contains the expected data", async () => {
    const backend = "http://recipes.com/api/recipes/"
    const updateData = jest.fn()
    render(<RecipeForm updateData={ updateData } backend={ backend } />)

    fireEvent.change(screen.getByLabelText("Title"), { target: { value: "Lekker" } })
    fireEvent.change(screen.getByLabelText("Servings"), { target: { value: 4 } })
    fireEvent.change(screen.getByLabelText("Instructions"), { target: { value: "Stir well" } })
    expect(screen.getByLabelText("Title")).toHaveValue("Lekker")
    expect(screen.getByLabelText("Servings")).toHaveValue(4)
    expect(screen.getByLabelText("Instructions")).toHaveValue("Stir well")
  })
})
