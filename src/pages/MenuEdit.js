import React, { useState, useEffect } from 'react';
import { Link, useHistory, useParams } from 'react-router-dom';
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

const MenuEdit = () => {
    // redux and routerdom state
    const history = useHistory();
    const { id } = useParams();

    // State
    const [Name, setName] = useState('');
    const [Price, setPrice] = useState('');
    const [ImageUrl, setImageUrl] = useState('');
    const [IsAvailable, setIsAvailable] = useState(true);
    const [Type, setType] = useState(1);

    // Effect
    useEffect(() => {
        axios.get(`${API.url}/menu/${id}/`, {
            headers: API.defaultHeader()
        })
        .then((res) => {
            console.log(res.data);
            let data = res.data;
            setName(data.name);
            setPrice(data.price);
            setImageUrl(data.image_url === undefined ? '': data.image_url);
            setIsAvailable(data.is_available === 1 ? true : false);
            setType(data.type_menu_id);
        })
        .catch(err => console.error(err));
    }, []);

    // Method
    let editMenu = () => {
        axios.put(`${API.url}/menu/${id}/`, {
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
            {console.log(ImageUrl)}
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
                      checked={IsAvailable}
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
                    <CButton color="success" className="mr-2" onClick={() => editMenu()}>Edit Menu</CButton>
                </div>
            </CCardBody>
        </CCard>
    );
}

export default MenuEdit;