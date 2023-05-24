import React from "react";
import { Form } from "react-bootstrap";
import ContactTerms from "../ContactTerms/ContactTerms";
import './assets/styles/_index.scss';

const AreaGuideDetailEnquiry = (props) => {
    return (
        <div className="area-guide-detail-enquiry-wrapper">
            <h4>Enquire Now</h4>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
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
                <Form.Label>Message</Form.Label>
                <Form.Control as="textarea" rows={5} className="form-textarea" placeholder="Write your message here..." />
            </Form.Group>

            <button className="button-sec button-sec-primary-filled enquiry-btn" type="submit">Subscribe</button>

            <ContactTerms />
        </div>
    )
}

export default AreaGuideDetailEnquiry