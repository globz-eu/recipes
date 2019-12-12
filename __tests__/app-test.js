import { shallow } from "enzyme"
import React from "react"
import App from "../src/app"
import Recipe from "../src/components/recipe"
import testRecipes from "../testData/recipes.json"

jest.mock("../src/updateData")

describe("App", () => {
  let app
  let useEffect

  const mockUseEffect = () => {
    useEffect.mockImplementationOnce(f => f())
  }

  beforeEach(() => {
    useEffect = jest.spyOn(React, "useEffect")

    mockUseEffect()
    app = shallow(<App />)
  })

  it("contains the expected number of Recipe components", () => {
    expect(app).toContainMatchingElements(testRecipes.length, Recipe)
  })

  it("Recipe components have the expected title prop", () => {
    testRecipes.forEach((recipe, i) => {
      expect(app.find(Recipe).get(i).props.title).toEqual(recipe.name)
    })
  })

  it("Recipe components have the expected servings prop", () => {
    testRecipes.forEach((recipe, i) => {
      expect(app.find(Recipe).get(i).props.servings).toEqual(recipe.servings)
    })
  })

  it("Recipe components have the expected instructions prop", () => {
    testRecipes.forEach((recipe, i) => {
      expect(app.find(Recipe).get(i).props.instructions).toEqual(recipe.instructions)
    })
  })
})
