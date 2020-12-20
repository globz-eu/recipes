import React, { useState } from "react"
import Page from "./components/page"

export default props => {
  const [data, setData] = useState(null)
  React.useEffect(() => {
    async function updateData() {
      const updatedData = await props.getLatestData(props.config.backend)
      setData({ ...updatedData, config: props.config })
    }
    updateData()
  }, [props.config])

  return (
    <Page
      config={ props.config }
      data={ data }
      submitData={
        formData =>
          props.submit({
            formData,
            config: props.config,
            setData,
            recipes: data.recipes
          })
      } />
  )
}
