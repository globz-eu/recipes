import { shallow } from "enzyme"
import React from "react"
import App from "../src/app"
import Instructions from "../src/components/instructions"
import Servings from "../src/components/servings"
import Title from "../src/components/title"
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

  it("contains the expected number of Title components", () => {
    expect(app).toContainMatchingElements(testRecipes.length, Title)
  })

  it("Title components have the expected title prop", () => {
    testRecipes.forEach((recipe, i) => {
      expect(app.find(Title).get(i).props.title).toEqual(recipe.name)
    })
  })

  it("contains the expected number of Servings components", () => {
    expect(app).toContainMatchingElements(testRecipes.length, Servings)
  })

  it("Servings components have the expected servings prop", () => {
    testRecipes.forEach((recipe, i) => {
      expect(app.find(Servings).get(i).props.servings).toEqual(recipe.servings)
    })
  })

  it("contains the expected number of Instructions components", () => {
    expect(app).toContainMatchingElements(testRecipes.length, Instructions)
  })

  it("Instructions components have the expected instructions prop", () => {
    testRecipes.forEach((recipe, i) => {
      expect(app.find(Instructions).get(i).props.instructions).toEqual(recipe.instructions)
    })
  })
})
