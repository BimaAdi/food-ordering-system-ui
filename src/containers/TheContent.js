import React, { Suspense } from 'react'
import { CContainer } from '@coreui/react'
  
const loading = (
  <div className="pt-3 text-center">
    <div className="sk-spinner sk-spinner-pulse"></div>
  </div>
)

const TheContent = ({page}) => {
  return (
    <main className="c-main">
      <CContainer fluid>
        <Suspense fallback={loading}>
          { page }
        </Suspense>
      </CContainer>
    </main>
  )
}

export default React.memo(TheContent)
