import React from "react"
import Instructions from "./instructions"
import InstructionsTitle from "./InstructionsTitle"

export default props =>
  <div>
    <InstructionsTitle>Instructions:</InstructionsTitle>
    <Instructions>
      { props.instructions }
    </Instructions>
  </div>
