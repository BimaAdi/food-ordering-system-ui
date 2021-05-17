import React from 'react';
import { Link } from 'react-router-dom';
import {
    CCard,
    CCardImg,
    CCardBody,
    CCardTitle,
    CCardText,
    CButton
} from '@coreui/react';

const CardMenu = ({id, name, imgUrl, price, deleteMenu}) => {
    return (
        <CCard >
            <CCardImg
                component="svg"
                orientation="top"
                className="docs-placeholder-img"
                width="100%"
                height="180"
                xmlns="http://www.w3.org/2000/svg"
                role="img"
                aria-label="Placeholder: Image cap"
                preserveAspectRatio="xMidYMid slice"
                focusable="false"
            >
                <title>Placeholder</title>
                <rect width="100%" height="100%" fill="#868e96"></rect>
                <text x="50%" y="50%" fill="#dee2e6" dy=".3em">
                Image cap
                </text>
            </CCardImg>
            <CCardBody>
                <CCardTitle>{name}</CCardTitle>
                <CCardText>Rp {price}</CCardText>
                <Link to={`/menu/${id}/edit`} className="btn">Edit</Link>
                <CButton onClick={() => deleteMenu(id)}>Delete</CButton>
            </CCardBody>
        </CCard>
    );
}

export default CardMenu;