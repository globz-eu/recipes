import { shallow } from "enzyme"
import React from "react"
import Instructions from "../../src/components/instructions"
import InstructionsText from "../../src/components/instructionsText"
import InstructionsTitle from "../../src/components/InstructionsTitle"

describe("InstructionBlock", () => {
  let instructions

  beforeEach(() => {
    instructions = shallow(<Instructions instructions="Recipe instructions" />)
  })

  it("displays an instruction title component", () => {
    expect(instructions).toContainMatchingElement(InstructionsTitle)
  })

  it("displays instructions text", () => {
    expect(instructions.find(InstructionsText)).toHaveText("Recipe instructions")
  })
})
