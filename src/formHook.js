import { useState } from "react"

export default callback => {
  const [inputs, setInputs] = useState({})
  const handleSubmit = event => {
    if (event) {
      event.preventDefault()
    }
    callback(inputs)
  }
  const handleInputChange = event => {
    event.persist()
    setInputs({ ...inputs, [event.target.name]: event.target.value })
  }
  return {
    handleSubmit,
    handleInputChange,
    inputs
  }
}
