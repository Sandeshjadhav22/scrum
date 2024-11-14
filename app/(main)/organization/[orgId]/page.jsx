import React from 'react'

const Organization = ({params}) => {
    const {orgId} = params
  return (
    <div>Organization id {orgId}</div>
  )
}

export default Organization