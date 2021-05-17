import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {
    CContainer
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

    // method
    let deleteMenu = async (id) => {
        console.log(id);
        try {
            await axios.delete(`${API.url}/menu/${id}`, {
                headers: API.defaultHeader()
            });
            let res = await axios.get(`${API.url}/menu`, {
                headers: API.defaultHeader()
            });
            setMenus(res.data.data);
        } catch (err) {
            console.error(err);
        }
    }

    return (
        <div className="docs-example-row">
            <CContainer>

                <div className="d-flex flex-row-reverse mb-2">
                    <Link to="/menu/create" className="btn btn-primary">Add Menu</Link>
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
                            deleteMenu={deleteMenu}
                        />
                    ))}
                </div>
                
            </CContainer>
        </div>
    );
}

export default Menu;