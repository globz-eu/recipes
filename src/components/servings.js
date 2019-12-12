import React from "react"
import styled from "styled-components"

const Servings = styled.div`
  padding: 1em;
  font-size: 1em;
`

export default props =>
  <Servings>{ props.servings } servings</Servings>
