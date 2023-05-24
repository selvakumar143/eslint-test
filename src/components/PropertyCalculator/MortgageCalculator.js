import React, { useEffect, useState } from "react";
import { Link } from "gatsby";
import { Row, Col, Form, InputGroup } from "react-bootstrap";
import { calculateMonthlyPayment } from "./mortgage"
import { Site_Vars } from "../../common/site/config";
import { PageLinks } from "../../common/site/page-static-links";

const { filterNumber, numberFormat, pmt } = require("@starberry/gatsby-theme-utils/Common/Utils")

// User project specific const
const durationOptions = [10, 15, 20, 25, 30, 35]

const MortgageCalculator = (props) => {

    const {
        propertyPrice,
        depositAmount,
        loadDuration,
        interestRate,
        currency,
        defaultResult,
        pricePrefix,
    } = props

    const prefix = ""
    const [validated, setValidated] = useState(false)
    const [showerror, setShowerror] = useState(false)
    const [monthlyPayment, setMonthlyPayment] = useState(0);

    const [purchasePrice, setPurchasePrice] = useState(
        prefix + numberFormat(propertyPrice)
    )
    let dep_price = (propertyPrice / 100) * 10
    const [deposit, setDeposit] = useState(prefix + numberFormat(dep_price))
    const [duration, setDuration] = useState(25)
    // const [duration, setDuration] = useState(loadDuration)
    const [interest, setInterest] = useState(3)
    const [loan, setLoan] = useState("")
    const [result, setResult] = useState("")
    const [depositError, setDepError] = useState(false)

    const handlePrice = event => {
        let val = filterNumber(event.target.value)
        if (event.target.value !== "£" && event.target.value !== "£0" && event.target.value !== "0" && event.target.value !== "") {
            setPurchasePrice(prefix + numberFormat(val))
            if (parseInt(filterNumber(deposit)) && parseInt(val)) {
                let loan = parseInt(val) - parseInt(filterNumber(deposit))
                setLoan(prefix + numberFormat(loan))
            } else {
                setLoan(prefix + 0)
            }
            setMonthlyPayment(
                calculateMonthlyPayment(
                    parseInt(filterNumber(event.target.value)),
                    parseFloat(interest),
                    parseInt(filterNumber(deposit)),
                    duration
                )
            );
            setShowerror(false)
        }
        else {
            setPurchasePrice('')
            setLoan()
            setMonthlyPayment(0)
        }
    }

    const handleDeposit = event => {
        let d = filterNumber(event.target.value)
        if (event.target.value !== '£' && event.target.value !== "£0" && event.target.value !== '0' && event.target.value !== "") {
            setDeposit(prefix + numberFormat(d))

            if (parseInt(filterNumber(purchasePrice)) && parseInt(d)) {
                let loan2 = parseInt(filterNumber(purchasePrice)) - parseInt(d)
                setLoan(prefix + numberFormat(loan2))
            } else {
                setLoan(prefix + 0)
            }
            var par = purchasePrice.replace('£', '').replace(/,/g, '')
            var dep = event.target.value.replace('£', '').replace(/,/g, '')
            var par1 = parseInt(par)
            var dep1 = parseInt(dep)
            if (par1 < dep1 || par1 === dep1) {
                setDepError(true)
                setMonthlyPayment(0)
            }
            else {
                setDepError(false)
                // setMonthlyPayment(
                //   calculateMonthlyPayment(
                //     parseInt(filterNumber(purchasePrice)),
                //     parseFloat(interest),
                //     parseInt(filterNumber(event.target.value)),
                //     duration
                //   )
                // );

            }
            setShowerror(false)
        }
        else {
            setLoan('')
            setDeposit('')
            setMonthlyPayment(0)
        }
    }

    const handleDuration = event => {
        setDuration(filterNumber(event.target.value))
        // setMonthlyPayment(
        //   calculateMonthlyPayment(
        //     parseInt(filterNumber(purchasePrice)),
        //     parseFloat(interest),
        //     parseInt(filterNumber(deposit)),
        //     event.value
        //   )
        // );
    }

    const handleInterest = event => {
        setInterest(event.target.value.replace(/[^\d.]/g, ""))
        // setMonthlyPayment(
        //   calculateMonthlyPayment(
        //     parseInt(filterNumber(purchasePrice)),
        //     parseFloat(event.target.value),
        //     parseInt(filterNumber(deposit)),
        //     duration
        //   )
        // );
    }

    const handleLoan = event => {
        setLoan(prefix + numberFormat(filterNumber(event.target.value)))
    }

    const getResult = (interest, duration, loan) => {
        let result = -pmt(
            interest / 100 / 12,
            filterNumber(duration) * 12,
            filterNumber(loan),
            0,
            1
        )
        setResult(numberFormat(Math.round(result)))
    }

    const handleSubmit = event => {
        const form = event.currentTarget
        event.preventDefault()
        event.stopPropagation()
        window.dataLayer = window.dataLayer || [];
        window.dataLayer.push({
          'event': 'formSubmit',
          'formType': "Mortage calculator",
          'formId': "Mortage calculator",
          'formName': "Mortage calculator",
          'formLabel': "Mortage calculator"
        });

        setMonthlyPayment(
            calculateMonthlyPayment(
                parseInt(filterNumber(purchasePrice)),
                parseFloat(interest),
                parseInt(filterNumber(deposit)),
                duration
            )
        );
    }

    useEffect(() => {
        if (defaultResult) {
            if (
                parseInt(filterNumber(purchasePrice)) &&
                parseInt(filterNumber(deposit))
            ) {
                let loan =
                    parseInt(filterNumber(purchasePrice)) -
                    parseInt(filterNumber(deposit))
                setLoan(prefix + numberFormat(loan))
            }
            getResult(interest, duration, loan)
            setMonthlyPayment(
                calculateMonthlyPayment(
                    parseInt(filterNumber(purchasePrice)),
                    parseFloat(interest),
                    parseInt(filterNumber(deposit)),
                    duration
                )
            );

        }
    }, [defaultResult, purchasePrice, deposit, loan, interest, duration, prefix])

    useEffect(() => {
        if (
            parseInt(filterNumber(purchasePrice)) &&
            parseInt(filterNumber(deposit))
        ) {
            let loan =
                parseInt(filterNumber(purchasePrice)) -
                parseInt(filterNumber(deposit))
            setLoan(prefix + numberFormat(loan))
        }
        getResult(interest, duration, loan)
        setMonthlyPayment(
            calculateMonthlyPayment(
                parseInt(filterNumber(purchasePrice)),
                parseFloat(interest),
                parseInt(filterNumber(deposit)),
                duration
            )
        );
    }, [])

    // DO NOT DO ANY CHNAGES - END
    var monthly_payment = Math.round(monthlyPayment);
    var selectvalues = []
    { durationOptions.map(val => selectvalues.push({ value: val, label: val })) }

    return (
        <div className="mortgage-calc-wrapper">
            <div className="secondary-text text-sm-heading">Mortgage Repayment Calculator</div>

            <Form
                name="MortgageCalc"
                noValidate
                validated={validated}
                onSubmit={handleSubmit}
                autoComplete="off"
                className="calculator"
            >
                {showerror && (
                    <div className="alert alert-danger">
                        <p>Highlighted fields are required</p>
                    </div>
                )}
                {depositError && (
                    <div className="alert alert-danger">
                        <p>Please enter deposit amount less than the property amount.</p>
                    </div>
                )}
                <Row>
                    <Col md="6">
                        <Form.Group className="calc-form-group">
                            <Form.Label>Property Price</Form.Label>
                            <Form.Control
                                required
                                type="text"
                                placeholder=""
                                value={purchasePrice}
                                onChange={handlePrice}
                                maxLength={13}
                                disabled
                            />
                        </Form.Group>
                    </Col>
                    <Col md="6">
                        <Form.Group className="calc-form-group">
                            <Form.Label>Deposit</Form.Label>
                            <Form.Control
                                required
                                type="text"
                                placeholder=""
                                value={deposit}
                                onChange={handleDeposit}
                                maxLength={13}
                            />
                        </Form.Group>
                    </Col>
                </Row>
                <Row>
                    <Col md="6">
                        <Form.Group className="calc-form-group">
                            <Form.Label>Interest Rate</Form.Label>
                            <InputGroup>
                                <Form.Control
                                    required
                                    type="text"
                                    placeholder=""
                                    value={interest}
                                    maxLength={4}
                                    onChange={handleInterest}
                                />
                                <InputGroup.Text>%</InputGroup.Text>
                            </InputGroup>
                        </Form.Group>
                    </Col>
                    <Col md="6">
                        <Form.Group className="calc-form-group">
                            <Form.Label>Repayment Period</Form.Label>
                            <InputGroup>
                                <Form.Control
                                    required
                                    type="number"
                                    placeholder=""
                                    minLength={2}
                                    value={duration}
                                    maxLength={4}
                                    onChange={handleDuration}
                                    
                                />
                                <InputGroup.Text>years</InputGroup.Text>
                            </InputGroup>
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
                        <div className="calc-title-sm">Monthly Repayments:</div>
                        <div className="calc-price">{Site_Vars.default_currency}{numberFormat(monthly_payment)} per month.</div>
                        <div className="calc-info">Need more info? <Link to={`/${PageLinks.contact}`}>Contact us</Link></div>
                        <p className="calc-desc">These results are for a repayment mortgage and are only intended as a guide. Make sure you obtain accurate figures from your lender before committing to any mortgage. Your home may be repossessed if you do not keep up repayments on a mortgage.</p>
                    </Col>
                </Row>
            </Form>
        </div>
    )
}

export default MortgageCalculator