import React, { useState, useEffect } from 'react';
// import { useSelector } from 'react-redux';
// import { Link } from 'react-router-dom';
import { 
    CCard,
    CCardHeader,
    CCardBody,
    CDataTable,
    CButton,
    CModal,
    CModalHeader,
    CModalTitle,
    CModalBody,
    CModalFooter
} from '@coreui/react';
import axios from 'axios';
import API from '../config';

const fields = ['order_number','tabel_number', 'waiter', 'action']

const OrderHistory = () => {
    // state
    const [tableData, setTableData] = useState([]);
    const [order, setOrder] = useState({
        table_number: '',
        waiter_name: '',
        order_number: '',
        orders: []
    });
    const [modal, setModal] = useState(false);

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
    let openModalSummary = (id) => {
        axios.get(`${API.url}/order/${id}/`, {
            headers: API.defaultHeader()
        })
        .then((res) => {
            let data = res.data;
            let orderMenus = res.data.order_menus;
            let menus = res.data.menus;
            let summary = orderMenus.map((x) => {
                return {...x, menu: menus.filter(y => y.id === x.menu_id)[0]}
            });
            let selectedOrder = {
                table_number: data.table_number,
                waiter_name: data.user.name,
                order_number: data.order_number,
                orders: summary
            }
            
            setOrder(selectedOrder);
            setModal(true);
        })
        .catch(err => console.error(err));
    }

    return (
        <CCard>
            <CModal 
              show={modal} 
              onClose={setModal}
            >
                <CModalHeader closeButton>
                    <CModalTitle>Order Summary</CModalTitle>
                </CModalHeader>
                <CModalBody>
                    Order Number: {order.order_number} <br/>
                    Tabel Number: {order.table_number} <br/>
                    Waiter: {order.waiter_name} <br/><br />
                    {order.orders.map((item) => {
                        return (<>{item.menu.name} - {item.menu.price} x{item.qty}<br/></>);
                    })}
                </CModalBody>
                <CModalFooter>
                    <CButton 
                    color="secondary" 
                    onClick={() => setModal(false)}
                    >Close</CButton>
                </CModalFooter>
            </CModal>
            <CCardHeader>
                <h5>List Order History</h5>
            </CCardHeader>
            <CCardBody>
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
                            <CButton color="secondary" className="ml-2" onClick={() => openModalSummary(item.action)}>Summary</CButton>
                        </td>
                      )
                }}
                />
            </CCardBody>
        </CCard>
    );
}

export default OrderHistory;