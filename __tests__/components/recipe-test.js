import { shallow } from "enzyme"
import React from "react"
import Instructions from "../../src/components/instructions"
import Recipe from "../../src/components/recipe"
import Servings from "../../src/components/servings"
import Title from "../../src/components/title"

describe("Recipe", () => {
  let recipe

  beforeEach(() => {
    recipe = shallow(<Recipe title="title" servings={ 4 } instructions="stir well" />)
  })

  it("displays a Title component", () => {
    expect(recipe).toContainMatchingElement(Title)
  })

  it("Title component has the expected title prop", () => {
    expect(recipe.find(Title).get(0).props.title).toEqual("title")
  })

  it("displays a Servings component", () => {
    expect(recipe).toContainMatchingElement(Servings)
  })

  it("Servings component has the expected servings prop", () => {
    expect(recipe.find(Servings).get(0).props.servings).toEqual(4)
  })

  it("displays an Instructions component", () => {
    expect(recipe).toContainMatchingElement(Instructions)
  })

  it("Instructions component has the expected instructions prop", () => {
    expect(recipe.find(Instructions).get(0).props.instructions).toEqual("stir well")
  })
})
