import React from "react"
import Instructions from "./instructions"
import Servings from "./servings"
import Title from "./title"

export default props =>
  <>
    <Title title={ props.title } />
    <Servings servings={ props.servings } />
    <Instructions instructions={ props.instructions } />
  </>
