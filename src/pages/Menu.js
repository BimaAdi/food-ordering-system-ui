import React, { useEffect, useState } from 'react';
import {
    CContainer,
    CButton
} from '@coreui/react';
import CardMenu from '../component/CardMenu';
import axios from 'axios';
import API from '../config';

const Menu = () => {
    // state
    const [menus, setMenus] = useState([]);

    // effect
    useEffect(() => {
        axios.get(`${API.url}/menu`, {
            headers: API.defaultHeader()
        })
        .then((res) => {
            setMenus(res.data.data);
        })
        .catch(e => console.error(e));
    }, [])

    return (
        <div className="docs-example-row">
            <CContainer>

                <div className="d-flex flex-row-reverse">
                    <CButton color="primary" className="mb-2">
                        Add Menu
                    </CButton>
                </div>

                <div style={{
                    display: 'grid',
                    gridTemplateColumns: '1fr 1fr 1fr',
                    gridGap: '20px'
                }}>
                    {menus.map((item) => (
                        <CardMenu 
                            key={item.id}
                            id={item.id}
                            imgUrl={item.img_url}
                            name={item.name}
                            price={item.price}
                        />
                    ))}
                </div>
                
            </CContainer>
        </div>
    );
}

export default Menu;