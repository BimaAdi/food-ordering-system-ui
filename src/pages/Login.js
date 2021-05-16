import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import {
  CButton,
  CCard,
  CCardBody,
  CCardGroup,
  CCol,
  CContainer,
  CForm,
  CInput,
  CInputGroup,
  CInputGroupPrepend,
  CInputGroupText,
  CRow
} from '@coreui/react';
import CIcon from '@coreui/icons-react';
import axios from 'axios';
import API from '../config';

const Login = () => {
  // redux and routerdom state
  const dispatch = useDispatch();
  const history = useHistory();

  // state
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isError, setIsError] = useState(false);

  // event
  let onLogin = async () => {
    try {
      let data = {
        email: email,
        password: password
      }
      let res = await axios.post(`${API.url}/login`, data, API.defaultHeader());

      setIsError(false);
      dispatch({
        type: 'LOGIN',
        payload: {
          username: res.data.name,
          email: res.data.email,
          role: res.data.role
        }
      });
      window.localStorage.setItem('token', res.data.token);

      history.push('/order-active');
    } catch (error) {
      setIsError(true);
    }
  }

  return (
    <div className="c-app c-default-layout flex-row align-items-center">
      <CContainer>
        <CRow className="justify-content-center">
          <CCol md="8">
            <CCardGroup>
              <CCard className="p-4">
                <CCardBody>
                  <CForm>
                    <h1>Login</h1>
                    <p className="text-muted">Sign In to your account</p>
                    <CInputGroup className="mb-3">
                      <CInputGroupPrepend>
                        <CInputGroupText>
                          <CIcon name="cil-user" />
                        </CInputGroupText>
                      </CInputGroupPrepend>
                      <CInput type="email" placeholder="Email" autoComplete="email" onChange={(e) => setEmail(e.target.value)}/>
                    </CInputGroup>
                    <CInputGroup className="mb-4">
                      <CInputGroupPrepend>
                        <CInputGroupText>
                          <CIcon name="cil-lock-locked" />
                        </CInputGroupText>
                      </CInputGroupPrepend>
                      <CInput type="password" placeholder="Password" autoComplete="current-password" onChange={(e) => setPassword(e.target.value)}/>
                    </CInputGroup>
                      {isError ? <p className="text-danger">Invalid credentials</p> : ''}
                    <CRow>
                      <CCol xs="6">
                        <CButton color="primary" className="px-4" onClick={(e) => onLogin()}>Login</CButton>
                      </CCol>
                    </CRow>
                  </CForm>
                </CCardBody>
              </CCard>
              <CCard className="text-white bg-primary py-5 d-md-down-none" style={{ width: '44%' }}>
                <CCardBody className="text-center">
                  <div>
                    <h2>Food Ordering System</h2>
                  </div>
                </CCardBody>
              </CCard>
            </CCardGroup>
          </CCol>
        </CRow>
      </CContainer>
    </div>
  )
}

export default Login
