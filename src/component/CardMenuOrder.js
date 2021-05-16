import React from 'react';
import {
    CCard,
    CCardImg,
    CCardBody,
    CCardTitle,
    CCardText
} from '@coreui/react';

const CardMenuOrder = ({id, name, imgUrl, price, counter, incrementCounter, decrementCounter}) => {
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
                <div className="btn-group">
                    <button type="button" class="btn btn-secondary" onClick={(e) => decrementCounter(id)}>-</button>
                    <button type="button" class="btn btn-secondary" disabled>{counter}</button>
                    <button type="button" class="btn btn-secondary" onClick={(e) => incrementCounter(id)}>+</button>
                </div>
            </CCardBody>
        </CCard>
    );
}

export default CardMenuOrder;