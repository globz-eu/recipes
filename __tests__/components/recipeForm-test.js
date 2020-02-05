import axios from "axios"
import { shallow } from "enzyme"
import React from "react"
import RecipeForm from "../../src/components/recipeForm"

describe("RecipeForm", () => {
  it("contains the expected elements", () => {
    const updateData = jest.fn()
    const backend = "http://127.0.0.1:8080/recipes/"
    const recipeForm = shallow(<RecipeForm updateData={ updateData } backend={ backend } />)
    expect(recipeForm.find("input").at(0).prop("name")).toEqual("name")
    expect(recipeForm.find("input").at(1).prop("name")).toEqual("servings")
    expect(recipeForm.find("input").at(2).prop("name")).toEqual("instructions")
  })

  it("submits the expected data", () => {
    const updateData = jest.fn()
    const backend = "http://127.0.0.1:8080/recipes/"
    axios.post = jest.fn().mockResolvedValue({})
    const persist = jest.fn()
    const recipeForm = shallow(<RecipeForm updateData={ updateData } backend={ backend } />)
    recipeForm.find("input").at(0)
      .simulate("change", { target: { name: "title", value: "Lekker" }, persist })
    recipeForm.find("input").at(1)
      .simulate("change", { target: { name: "servings", value: 4 }, persist })
    recipeForm.find("input").at(2)
      .simulate("change", { target: { name: "instructions", value: "Stir well" }, persist })
    recipeForm.find("form").at(0).simulate("submit")
    expect(axios.post.mock.calls.length).toBe(1)
    expect(axios.post.mock.calls[0][0])
      .toEqual(backend, { title: "Lekker", servings: 4, instructions: "Stir well" })
  })
})
