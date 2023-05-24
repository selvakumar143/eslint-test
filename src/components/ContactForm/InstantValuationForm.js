import React, { useState } from "react";
import { Row, Col, Form } from "react-bootstrap";
import Select from "react-select";
import { customStyles } from "../SelectDropdownStyle/SelectDropdownStyle";
import ContactTerms from "../ContactTerms/ContactTerms";
// import DatePicker from "react-datepicker";
// import "react-datepicker/dist/react-datepicker.css";
import './assets/styles/_index.scss';

const InstantValuationForm = (props) => {

    // Date picker
    const [startDate, setStartDate] = useState(new Date());
    // Date picker

    const enquiryOptions = [
        { value: 'sell', label: 'Sell' },
        { value: 'rent', label: 'Rent' }
    ]

    return (
        <div className="contact-form-wrapper">
            <Form.Group className="theme-form-group">
                <Form.Label>Full Name</Form.Label>
                <Form.Control 
                    required
                    type="text" 
                    placeholder=""
                    maxLength={13}
                />
            </Form.Group>

            <Form.Group className="theme-form-group">
                <Form.Label>Email Address</Form.Label>
                <Form.Control 
                    required
                    type="email" 
                    placeholder=""
                    maxLength={13}
                />
            </Form.Group>

            <Form.Group className="theme-form-group">
                <Form.Label>Phone</Form.Label>
                <Form.Control 
                    required
                    type="text" 
                    placeholder=""
                    maxLength={13}
                />
            </Form.Group>

            <Form.Group className="theme-form-group">
                <Form.Label>Proeprty Postcode</Form.Label>
                <Form.Control 
                    required
                    type="text" 
                    placeholder=""
                    maxLength={13}
                />
            </Form.Group>

            <Form.Group className="theme-form-group">
                <Form.Label>Do you want to Sell or Let the property</Form.Label>
                <div className="dropdown-select d-flex align-items-center">
                    <Select
                        options={enquiryOptions}
                        isSearchable={false}
                        placeholder={"Sell"}
                        className={"select-control"}
                        classNamePrefix={"react-select"}
                        styles={customStyles}
                        components={{ DropdownIndicator:() => <i className="icon icon-select-dropdown-dark"></i>, IndicatorSeparator:() => null }}
                    />
                </div>
            </Form.Group>

            <Row>
                <Col md={6}>
                    <Form.Group className="theme-form-group date-picker">
                        <Form.Label>Preferred Date</Form.Label>
                        {/* <DatePicker
                            selected={startDate}
                            onChange={date => setStartDate(date)}
                            minDate={new Date()}
                            placeholderText={`Select your preferred date`}
                            className={"form-control"}
                        /> */}
                    </Form.Group>
                </Col>
                <Col md={6}>
                    <Form.Group className="theme-form-group time-picker">
                        <Form.Label>Preferred Time</Form.Label>
                        {/* <DatePicker
                            selected={startDate}
                            onChange={(date) => setStartDate(date)}
                            showTimeSelect
                            showTimeSelectOnly
                            timeIntervals={15}
                            timeCaption="Time"
                            dateFormat="h:mm aa"
                            className={"form-control"}
                        /> */}
                    </Form.Group>
                </Col>
            </Row>

            <button className="button-sec button-sec-primary-filled contact-btn" type="submit">Submit Details</button>

            <ContactTerms />
        </div>
    )
}

export default InstantValuationForm