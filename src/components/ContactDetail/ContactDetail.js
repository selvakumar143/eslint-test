import React from "react";
import { useStaticQuery, graphql } from "gatsby"
import { Link } from "gatsby";
import './assets/styles/_index.scss';

const ContactDetail = (props) => {
    const data = useStaticQuery(graphql`
        query {
            strapiSiteConfig {
              add_contact_details {
                address
                email
                phone
                title
              }
            }
        }
    `);

    const siteData = data.strapiSiteConfig.add_contact_details;

    return (
        <div className="contact-detail-wrapper">
            <div className="secondary-text contact-heading-sm">Contact Details</div>
            <div className="contact-phone"><a href={`tel:${siteData.phone}`}>{siteData.phone}</a></div>
            <div className="contact-email"><a href={`mailto:${siteData.email}`}>{siteData.email}</a></div>
            {siteData.address && <p>{siteData.address}</p> }
        </div>
    )
}

export default ContactDetail