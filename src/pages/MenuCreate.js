import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { 
    CCard,
    CCardHeader,
    CCardBody,
    CFormGroup,
    CLabel,
    CInput,
    CSelect,
    CSwitch,
    CButton
} from '@coreui/react';
import axios from 'axios';
import API from '../config';

const MenuCreate = () => {
    // redux and routerdom state
    const history = useHistory();

    // State
    const [Name, setName] = useState('');
    const [Price, setPrice] = useState('');
    const [ImageUrl, setImageUrl] = useState('');
    const [IsAvailable, setIsAvailable] = useState(true);
    const [Type, setType] = useState(1);

    // Method
    let addMenu = () => {
        axios.post(`${API.url}/menu`, {
            name: Name,
            price: Price,
            image_url: ImageUrl.trim() === '' ? null : ImageUrl.trim(),
            is_available: IsAvailable,
            type_menu_id: Type
        },{
            headers: API.defaultHeader()
        })
        .then(() => history.push('/menu'))
        .catch((err) => console.error(err));
    }

    return (
        <CCard>
            <CCardHeader><h5>Add Menu</h5></CCardHeader>
            <CCardBody>
                <CFormGroup>
                    <CLabel>Name</CLabel>
                    <CInput placeholder="Chicken BBQ" value={Name} onChange={(e) => setName(e.target.value)}/>
                </CFormGroup>
                <CFormGroup>
                    <CLabel >Price</CLabel>
                    <CInput type="number" placeholder="30000" value={Price} onChange={(e) => setPrice(e.target.value)}/>
                </CFormGroup>
                <CFormGroup>
                    <CLabel >Image Url</CLabel>
                    <CInput placeholder="https://www.imgurl.com/" value={ImageUrl} onChange={(e) => setImageUrl(e.target.value)}/>
                </CFormGroup>
                <CFormGroup>
                    <CLabel >Is Available?</CLabel>
                    <CSwitch
                      className="ml-2"
                      color="dark"
                      shape="pill"
                      variant="opposite"
                      defaultChecked
                      onChange={(e) => setIsAvailable(e.target.checked)}
                    />
                </CFormGroup>
                <CFormGroup>
                    <CLabel >Type</CLabel>
                    <CSelect custom name="select" id="select" value={Type} onChange={(e) => setType(e.target.value)}>
                      <option value="1">Food</option>
                      <option value="2">Drink</option>
                    </CSelect>
                </CFormGroup>
                <div className="d-flex flex-row-reverse">
                    <Link to="/menu" className="btn btn-secondary">Cancel</Link>
                    <CButton color="success" className="mr-2" onClick={() => addMenu()}>Add Menu</CButton>
                </div>
            </CCardBody>
        </CCard>
    );
}

export default MenuCreate;