import React from 'react'
import { useDispatch } from 'react-redux'
import {
  CHeader,
  CToggler,
  CHeaderBrand,
  CHeaderNav
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { 
  TheHeaderDropdown
}  from './index'

const TheHeader = () => {
  const dispatch = useDispatch();

  const toggleSidebar = () => {
    dispatch({type: 'TOGGLE_SIDEBAR', payload: {}});
  }

  const toggleSidebarMobile = () => {
    dispatch({type: 'TOGGLE_SIDEBAR', payload: {}});
  }

  return (
    <CHeader withSubheader>
      <CToggler
        inHeader
        className="ml-md-3 d-lg-none"
        onClick={toggleSidebarMobile}
      />
      <CToggler
        inHeader
        className="ml-3 d-md-down-none"
        onClick={toggleSidebar}
      />
      <CHeaderBrand className="mx-auto d-lg-none" to="/">
        <CIcon name="logo" height="48" alt="Logo"/>
      </CHeaderBrand>

      <CHeaderNav className="d-md-down-none mr-auto">
        
      </CHeaderNav>

      <CHeaderNav className="px-3">
        <TheHeaderDropdown/>
      </CHeaderNav>

    </CHeader>
  )
}

export default TheHeader
