import React from "react";
import loadable from "@loadable/component";
import { Link } from "gatsby";
import NewsletterFormFields from "../../../static/forms/newsletter_form.json";
import { Form, InputGroup } from 'react-bootstrap';
import './assets/styles/_index.scss';
const DefaultForm = loadable(() => import("../forms/default-form-layout"))

const FooterNewsLetter = (props) => {
    return (
        <DefaultForm fields={NewsletterFormFields} classname="enquiry-form-wrapper" submit="arrow" />
    )
}

export default FooterNewsLetter