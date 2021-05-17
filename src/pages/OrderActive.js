import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { 
    CCard,
    CCardHeader,
    CCardBody,
    CDataTable,
    CButton
} from '@coreui/react';
import axios from 'axios';
import API from '../config';

const fields = ['order_number','tabel_number', 'waiter', 'action']

const OrderActive = () => {
    // Redux State
    const AuthUser = useSelector(state => state.authUserReducer);

    // state
    const [tableData, setTableData] = useState([]);

    // effect
    useEffect(() => {
        axios.get(`${API.url}/order`, {
            headers: API.defaultHeader(),
            params: {
                is_done: false
            }
        })
        .then((res) => {
            let data = res.data.map((item) => {
                return {
                    order_number: item.order_number,
                    tabel_number: item.table_number,
                    waiter: item.user.name,
                    action: item.id
                }
            });
            setTableData(data);
        })
        .catch(e => console.error(e));
    }, []);

    // method
    let closeOrder = async (id) => {
        try {
            await axios.put(`${API.url}/order/${id}/done`, {}, {
                headers: API.defaultHeader()
            });
            let res = await axios.get(`${API.url}/order`, {
                headers: API.defaultHeader(),
                params: {
                    is_done: false
                }
            });
            setTableData(res.data.map((item) => {
                return {
                    order_number: item.order_number,
                    tabel_number: item.table_number,
                    waiter: item.user.name,
                    action: item.id
                }
            }));
        } catch (err) {
            console.err(err);
        }
    }

    let deleteOrder = (id) => {
        axios.delete(`${API.url}/order/${id}`, {
            headers: API.defaultHeader()
        })
        .then(() => {
            axios.get(`${API.url}/order`, {
                headers: API.defaultHeader(),
                params: {
                    is_done: false
                }
            })
            .then((res) => {
                let data = res.data.map((item) => {
                    return {
                        order_number: item.order_number,
                        tabel_number: item.table_number,
                        waiter: item.user.name,
                        action: item.id
                    }
                });
                setTableData(data);
            })
            .catch(e => console.error(e));
        })
        .catch((err) => console.error(err));
    }

    return (
        <CCard>
            <CCardHeader>
                <h5>List Order Active</h5>
            </CCardHeader>
            <CCardBody>
                <div className="d-flex flex-row-reverse mb-2">
                    <Link to="/order-active/create" className="btn btn-primary">Create Order</Link>
                </div>
                <CDataTable
                items={tableData}
                fields={fields}
                striped
                itemsPerPage={5}
                pagination
                scopedSlots = {{
                    'action':
                      (item)=>(
                        <td>
                            {AuthUser.role === 'cashier' || AuthUser.role === 'admin' 
                            ? <CButton color="success" onClick={(e) => closeOrder(item.action)}>Close Order</CButton> 
                            : ''}
                            <Link to={`/order-active/${item.action}/edit`} className="btn btn-warning ml-2">Show/Edit</Link>
                            <CButton color="danger" className="ml-2" onClick={(e) => deleteOrder(item.action)}>Delete</CButton>
                        </td>
                      )
                }}
                />
            </CCardBody>
        </CCard>
    );
}

export default OrderActive;