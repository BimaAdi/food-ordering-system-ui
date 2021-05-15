import React from 'react'
import { CFooter } from '@coreui/react'

const TheFooter = () => {
  return (
    <CFooter fixed={false}>
      <div className="mfs-auto">
        <span className="mr-1">Food Ordering System | ver1.0.0</span>
      </div>
    </CFooter>
  )
}

export default React.memo(TheFooter)
