import { render, fireEvent, waitFor, screen } from "@testing-library/react"
import React from "react"
import RecipeForm from "../../src/components/recipeForm"
import recipes from "../../testData/recipes.json"

describe("RecipeForm", () => {
  it("contains the expected elements", () => {
    render(<RecipeForm onSubmit={ () => {} } recipe={ recipes[0] } />)
    expect(screen.getByLabelText("Title")).toBeInTheDocument()
    expect(screen.getByLabelText("Servings")).toBeInTheDocument()
    expect(screen.getByLabelText("Instructions")).toBeInTheDocument()
  })

  it("contains the expected data", async () => {
    render(<RecipeForm onSubmit={ () => {} } recipe={ recipes[0] } />)

    expect(screen.getByLabelText("Title")).toHaveValue("Lekker")
    expect(screen.getByLabelText("Servings")).toHaveValue(3)
    expect(screen.getByLabelText("Instructions")).toHaveValue("Stir well")
  })

  it("contains the expected updated data", async () => {
    render(<RecipeForm onSubmit={ () => {} } recipe={ recipes[0] } />)

    fireEvent.change(screen.getByLabelText("Title"), { target: { value: "Lekkerer" } })
    fireEvent.change(screen.getByLabelText("Servings"), { target: { value: 3 } })
    fireEvent.change(screen.getByLabelText("Instructions"), { target: { value: "Stir a bit" } })
    expect(screen.getByLabelText("Title")).toHaveValue("Lekkerer")
    expect(screen.getByLabelText("Servings")).toHaveValue(3)
    expect(screen.getByLabelText("Instructions")).toHaveValue("Stir a bit")
  })

  it("submits the expected data", async () => {
    const onSubmit = jest.fn()
    render(<RecipeForm onSubmit={ onSubmit } recipe={ recipes[0] } />)

    fireEvent.change(screen.getByLabelText("Title"), { target: { value: "Lekkerer" } })
    fireEvent.change(screen.getByLabelText("Servings"), { target: { value: 4 } })
    fireEvent.change(screen.getByLabelText("Instructions"), { target: { value: "Stir well" } })
    fireEvent.click(screen.getByText("Submit"))

    await waitFor(() => expect(onSubmit).toHaveBeenCalledTimes(1))
    expect(onSubmit.mock.calls[0][0]).toStrictEqual({
      instructions: "Stir well",
      name: "Lekkerer",
      servings: "4"
    })
  })
})
