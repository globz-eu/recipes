import React from "react"
import styled from "styled-components"

const Title = styled.div`
  padding: 1em;
  font-size: 1.5em;
`

export default props =>
  <Title>{ props.title }</Title>
