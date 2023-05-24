import React from "react";
import { Form } from "react-bootstrap";
import Select from "react-select";
import { customStyles } from "../SelectDropdownStyle/SelectDropdownStyle";
import ContactTerms from "../ContactTerms/ContactTerms";
import './assets/styles/_index.scss';

const ContactForm = (props) => {

    const enquiryOptions = [
        { value: 'general-enquiry', label: 'General Enquiry' },
        { value: 'enquiry', label: 'Enquiry' }
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
                <Form.Label>Phone</Form.Label>
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
                <Form.Label>Subject</Form.Label>
                <div className="dropdown-select d-flex align-items-center">
                    <Select
                        options={enquiryOptions}
                        isSearchable={false}
                        placeholder={"General Enquiry"}
                        className={"select-control"}
                        classNamePrefix={"react-select"}
                        styles={customStyles}
                        components={{ DropdownIndicator:() => <i className="icon icon-select-dropdown-dark"></i>, IndicatorSeparator:() => null }}
                    />
                </div>
            </Form.Group>

            <Form.Group className="theme-form-group">
                <Form.Label>Message</Form.Label>
                <Form.Control as="textarea" rows={5} className="form-textarea" placeholder="Write your message here..." />
            </Form.Group>

            <button className="button-sec button-sec-primary-filled contact-btn" type="submit">Submit Details</button>

            <ContactTerms />
        </div>
    )
}

export default ContactForm