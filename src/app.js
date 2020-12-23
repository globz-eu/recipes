import React, { useState } from "react"
import Loading from "./components/loading"
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

  const submitData = formData =>
    props.submit({ formData, config: props.config, setData, recipes: data.recipes })

  return (
    <div>
      <Loading loading={ data == null } />
      <Page data={ data } submitData={ submitData } />
    </div>
  )
}
