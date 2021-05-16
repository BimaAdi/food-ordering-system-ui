import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import {
    CContainer,
    CButton,
    CInput
} from '@coreui/react';
import CardMenuOrder from '../component/CardMenuOrder';
import axios from 'axios';
import API from '../config';

const OrderCreate = () => {
    // redux and routerdom state
    const history = useHistory();

    // state
    const [tableNumber, setTableNumber] = useState('');
    const [isError, setIsError] = useState(false);
    const [menus, setMenus] = useState([]);

    // effect
    useEffect(() => {
        axios.get(`${API.url}/menu`, {
            headers: API.defaultHeader()
        })
        .then((res) => {
            let data = res.data.data.map((item) => {
                return {...item, counter: 0}
            });
            setMenus(data);
        })
        .catch(e => console.error(e));
    }, [])

    // method
    let incrementCounter = (id) => {
        let newMenusState = menus.map((item) => {
            if (item.id === id) {
                return {...item, counter: item.counter + 1}
            }
            return item;
        });
        setMenus(newMenusState);
    };

    let decrementCounter = (id) => {
        let newMenusState = menus.map((item) => {
            if (item.id === id && item.counter !== 0) {
                return {...item, counter: item.counter - 1}
            }
            return item;
        });
        setMenus(newMenusState);
    };

    let createOrder = () => {
        // validation
        let isValid = true
        if (tableNumber.trim() === ''){
            setIsError(true);
            isValid = false;
        } 
        // Order not all zero
        if (menus.filter((x) => x.counter !== 0).length === 0) {
            isValid = false;
        }

        if (isValid === true) {
            let requestJson = {
                table_number: tableNumber.trim(),
                order_menu: menus
                    .filter(x => x.counter !== 0)
                    .map((x) => {
                        return { menu_id:x.id, qty: x.counter}
                    })
            }
            axios.post(`${API.url}/order`, requestJson, {
                headers: API.defaultHeader()
            })
            .then((res) => {
                history.push('/order-active');
            })
            .catch((err) => {console.error(err)});
        }
    };

    return (
        <div className="docs-example-row">
            <CContainer>
            <div className="d-flex flex-row-reverse mb-2">
                <Link to="/order-active" className="btn btn-secondary ml-2">Cancel</Link>
                <CButton color="success" className="ml-2" onClick={(e) => createOrder()}>Create Order</CButton>
                <CInput 
                    placeholder="Tabel Number" 
                    className="ml-2" 
                    style={{width: '120px'}} 
                    onChange={(e) => setTableNumber(e.target.value)}
                />
                {isError ? <p className="text-danger" >table number required</p> : ''}
            </div>
            <div style={{
                    display: 'grid',
                    gridTemplateColumns: '1fr 1fr 1fr',
                    gridGap: '20px'
                }}>
                {menus.map((item) => (
                    <CardMenuOrder 
                        key={item.id}
                        id={item.id}
                        imgUrl={item.img_url}
                        name={item.name}
                        price={item.price}
                        counter={item.counter}
                        incrementCounter={incrementCounter}
                        decrementCounter={decrementCounter}
                    />
                ))}
            </div>
            </CContainer>
        </div>
    );
}

export default OrderCreate;