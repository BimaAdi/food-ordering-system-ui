import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import {
  // CBadge,
  CDropdown,
  CDropdownItem,
  CDropdownMenu,
  CDropdownToggle
} from '@coreui/react'
// import CIcon from '@coreui/icons-react'
import axios from 'axios';
import API from '../config';

const TheHeaderDropdown = () => {
  const dispatch = useDispatch();
  const AuthUser = useSelector(state => state.authUserReducer);
  const history = useHistory();

  let logout = async () => {
    try {
      let res = await axios.post(`${API.url}/logout`, {},{
          headers: API.defaultHeader
      });
      dispatch({
        type: 'LOGOUT'
      });
      window.localStorage.removeItem('token');
      history.push('/login');
      console.log('logout success')
    } catch (error) {
        console.error(error);
    }
  }

  return (
    <CDropdown
      inNav
      className="c-header-nav-items mx-2"
      direction="down"
    >
      <CDropdownToggle className="c-header-nav-link" caret={false}>
        <div>
          {AuthUser.email}
        </div>
      </CDropdownToggle>
      <CDropdownMenu className="pt-0" placement="bottom-end">
        <CDropdownItem onClick={() => logout()}>
          {/* <CIcon name="cil-bell" className="mfe-2" /> */}
          Logout
          {/* <CBadge color="info" className="mfs-auto">42</CBadge> */}
        </CDropdownItem>
      </CDropdownMenu>
    </CDropdown>
  )
}

export default TheHeaderDropdown
