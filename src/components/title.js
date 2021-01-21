import React from "react"
import styled from "styled-components"

const Title = styled.div`
  padding: 1em;
  font-size: 1.5em;
`

export default ({ title, onClick }) =>
  <Title onClick={ onClick }>{ title }</Title>
