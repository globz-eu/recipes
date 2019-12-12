import { shallow } from "enzyme"
import React from "react"
import InstructionsBlock from "../../src/components/instructionsBlock"
import Instructions from "../../src/components/instructions"
import InstructionsTitle from "../../src/components/InstructionsTitle"

describe("InstructionBlock", () => {
  let instructionsBlock

  beforeEach(() => {
    instructionsBlock = shallow(<InstructionsBlock instructions="Recipe instructions" />)
  })

  it("displays an instruction title component", () => {
    expect(instructionsBlock).toContainMatchingElement(InstructionsTitle)
  })

  it("displays instructions text", () => {
    expect(instructionsBlock.find(Instructions)).toHaveText("Recipe instructions")
  })
})
