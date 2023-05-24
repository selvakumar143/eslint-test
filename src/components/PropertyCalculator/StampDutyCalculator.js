import React, { useEffect, useState } from "react";
import PropTypes from "prop-types"
import { Link } from "gatsby";
import { Row, Col, Form } from "react-bootstrap";
import loadable from "@loadable/component";
import {
    calculate,
    countries,
} from "uk-ireland-stampduty-calculator"
import { customStyles } from "../SelectDropdownStyle/SelectDropdownStyle";
import { PageLinks } from "../../common/site/page-static-links";

const Select = loadable(() => import("react-select"));
const { Site_Vars } = require("../../common/site/config");
const { filterNumber, numberFormat } = require("@starberry/gatsby-theme-utils/Common/Utils")

const StampDutyCalculator = (props) => {

    const currency = props.currency

    const [result, setResult] = useState(false)

    const [propertyType, setPropertyType] = useState(props.propertyType)
    const [propertyValue, setPropertyValue] = useState(
        currency + numberFormat(filterNumber(props.propertyValue))
    )
    const [buyer, setBuyer] = useState(props.buyerType)


    const calcOptions = [
        { value: 'first', label: 'First Time Buyer' },
        { value: 'home', label: 'I’m buying my home' },
        { value: 'investor', label: 'I’m buying an additional home' },
    ]


    const formatPrice = str => {
        return currency + str.toLocaleString("en-US")
    }

    const doCalculate = (purchase_price_price) => {
        const results = calculate(
            filterNumber(purchase_price_price ? purchase_price_price : propertyValue),
            propertyType,
            countries.ENGLAND,
            buyer
        )
        let effectiveRate = (results.tax / filterNumber(propertyValue)) * 100
        effectiveRate = new Intl.NumberFormat("en-US", {}).format(effectiveRate)
        let summaryBands = []
        results.summaryBands.map(result => {
            summaryBands.push(
                result.adjustedRate +
                "% between " +
                formatPrice(result.start) +
                " and " +
                formatPrice(result.end)
            )
        })
        const result = {
            effectiveRate: effectiveRate + "%",
            summaryBands: summaryBands,
            tax: formatPrice(results.tax),
        }
        setResult(result)
    }

    const handleSubmit = event => {
        event.preventDefault()
        event.stopPropagation()
        window.dataLayer = window.dataLayer || [];
        window.dataLayer.push({
            'event': 'formSubmit',
            'formType': "Stampduty calculator",
            'formId': "Stampduty calculator",
            'formName': "Stampduty calculator",
            'formLabel': "Stampduty calculator"
        });
        doCalculate()
    }

    const handleDeposit = event => {
        var purchase_price_price = currency + numberFormat(filterNumber(event.target.value));
        // doCalculate(purchase_price_price);
        setPropertyValue(purchase_price_price)
    }

    // const handlePropertyType = event => {
    //     setPropertyType(event.target.value)
    // }

    const handleBuyer = event => {
        setBuyer(event.value)
    }

    useEffect(() => {
        doCalculate()
    }, []);

    return (
        <div className="stamp-duty-calc-wrapper">
            <div className="secondary-text text-sm-heading">Stamp Duty Calculator</div>
            <Form
                name="MortgageCalc"
                noValidate
                onSubmit={handleSubmit}
                autoComplete="off"
            >
                <Row>
                    <Col md="6">
                        <Form.Group className="calc-form-group">
                            <Form.Label>Iam</Form.Label>
                            <div className="dropdown-select d-flex align-items-center">
                                <Select
                                    options={calcOptions}
                                    isSearchable={false}
                                    placeholder={"First Time Buyer"}
                                    className={"select-control"}
                                    classNamePrefix={"react-select"}
                                    styles={customStyles}
                                    components={{ DropdownIndicator: () => <i className="icon icon-select-dropdown-dark"></i>, IndicatorSeparator: () => null }}
                                    onChange={handleBuyer}
                                />
                            </div>
                        </Form.Group>
                    </Col>
                    <Col md="6">
                        <Form.Group className="calc-form-group">
                            <Form.Label>Property Price</Form.Label>
                            <Form.Control
                                required
                                type="text"
                                placeholder=""
                                value={propertyValue}
                                onChange={handleDeposit}
                                maxLength={13}
                            />
                        </Form.Group>
                    </Col>
                </Row>

                <Row>
                    <Col md="6">
                        <button className="button-sec button-sec-primary-filled calc-btn" type="submit">Calculate</button>
                    </Col>
                </Row>

                <Row>
                    <Col>
                        <div className="calc-title-sm">Stamp Duty</div>
                        <div className="calc-price">{result.tax}</div>
                        <div className="calc-info">Need more info? <Link to={`/${PageLinks.contact}`}>Contact us</Link></div>
                        {/* <p className="calc-desc">These results are for a repayment mortgage and are only intended as a guide. Make sure you obtain accurate figures from your lender before committing to any mortgage. Your home may be repossessed if you do not keep up repayments on a mortgage.</p> */}
                        <div className="calc-nego-wrapper">
                            <div className="calc-nego-text-card">
                                {result && (
                                    <p className="stampdutytext">
                                        <div className="calc-nego-text stamp-calc-text">You have to pay stamp duty:</div>
                                        {result.summaryBands.map((sm, i) => {
                                            return <div className="calc-nego-text-sm" key={i}>{sm}</div>
                                        })}
                                        {result && result.effectiveRate != "NaN%" && <div className="calc-nego-text-sm">Your effective stamp duty rate is {result.effectiveRate}.</div>}
                                    </p>
                                )}
                            </div>
                        </div>
                    </Col>
                </Row>
            </Form>
        </div>
    )
}


StampDutyCalculator.defaultProps = {
    propertyType: `residential`,
    propertyValue: `0`,
    buyerType: `first`,
    currency: process.env.CURRENCY ? process.env.CURRENCY : Site_Vars.default_currency,
}

StampDutyCalculator.propTypes = {
    propertyType: PropTypes.string,
    propertyValue: PropTypes.any,
    buyerType: PropTypes.string,
    currency: PropTypes.string,
}

export default StampDutyCalculator