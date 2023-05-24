import React from "react";
import { Form } from "react-bootstrap";
import ContactTerms from "../ContactTerms/ContactTerms";
import './assets/styles/_index.scss';

const JobForm = (props) => {
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
                <Form.Label>Upload your CV</Form.Label>
                <Form.Control
                    className="form-upload" 
                    required
                    type="file" 
                    placeholder=""
                    maxLength={13}
                />
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

export default JobForm