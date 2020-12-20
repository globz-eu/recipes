import React, { useState } from "react"
import getLatestData from "./getLatestData"
import Page from "../components/page"

export default props => {
  const [data, setData] = useState(null)
  React.useEffect(() => {
    async function updateData() {
      const updatedData = await getLatestData(props.config.backend)
      setData({ ...updatedData, config: props.config })
    }
    updateData()
  }, [props.config])

  return (
    <Page config={ props.config } data={ data } setData={ setData } />
  )
}
