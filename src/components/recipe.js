import React from "react"
import styled from "styled-components"
import Instructions from "./instructions"
import Servings from "./servings"
import Title from "./title"

const Container = styled.div`
  width: 50vw;
  margin-bottom: 1em;
  border: 1px solid;
`

export default props =>
  <Container>
    <Title title={ props.title } />
    <Servings servings={ props.servings } />
    <Instructions instructions={ props.instructions } />
  </Container>
