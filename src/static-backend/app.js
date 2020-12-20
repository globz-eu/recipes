import React, { useState } from "react"
import getLatestData from "./getLatestData"
import Page from "../components/page"
import submitStatic from "./submit"

export default props => {
  const [data, setData] = useState(null)
  React.useEffect(() => {
    async function updateData() {
      const updatedData = await getLatestData(props.config.recipesData)
      setData({ ...updatedData, config: props.config })
    }
    updateData()
  }, [props.config])

  return (
    <Page
      config={ props.config }
      data={ data }
      submitData={ formData => submitStatic(formData, props.config, data.recipes, setData) } />
  )
}
