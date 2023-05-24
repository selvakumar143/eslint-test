import React from "react";
import { Link } from "gatsby";
import './assets/styles/_index.scss';

const ContactTerms = (props) => {
    return (
        <p className="contact-terms">By clicking Submit, you agree to our <Link to="">Terms & Conditions</Link> and <Link to="">Privacy Policy</Link>.</p>
    )
}

export default ContactTerms