import React from "react"

export default props =>
  <div>
    {
      props.data.map((datum, i) =>
        <div key={ i }>
          {
            datum.name
          }
        </div>
      )
    }
  </div>
