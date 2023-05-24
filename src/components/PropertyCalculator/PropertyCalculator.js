import React from "react";
// import { Link } from "gatsby";
// import { Container, Row, Col } from "react-bootstrap";
import MortgageCalculator from "./MortgageCalculator";
import StampDutyCalculator from "./StampDutyCalculator";
import './assets/styles/_index.scss';

const PropertyCalculator = (props) => {
    return (
        <div className="property-calc">
            <MortgageCalculator propertyPrice={props?.prop_price ? props?.prop_price : "500000"}/>

            <div className="property-calc-divider"></div>

            <StampDutyCalculator propertyValue={props?.prop_price ? props?.prop_price : "500000"}/>
        </div>
    )
}

export default PropertyCalculator