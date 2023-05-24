import React from "react";
import { useStaticQuery, graphql } from "gatsby"
import './assets/styles/_index.scss';

const FooterMenuListSocial = (props) => {
    const data = useStaticQuery(graphql`
        query {
            strapiSiteConfig {
              facebook_link
              twitter_link
              instagram_link
              linkedin_link
            }
        }
    `);

    const links = data.strapiSiteConfig;
    const shareurl = typeof window !== 'undefined' ? window.location.href : ''

    const trackerShare = (event) => {
        window.dataLayer = window.dataLayer || [];
        window.dataLayer.push({
            'event': 'click',
            'formType': event + ' - ' + shareurl,
            'formId': 'Share',
            'formName': 'Social Icon Click',
            'formLabel': 'Social Icon Click'
        });
    }
    return (
        <ul className="footer-menu-list-social list-inline">
            {links.facebook_link.length > 5 && <li className="list-inline-item">
                <a href={links.facebook_link} target="_blank" aria-label="facebook" onClick={() => trackerShare('Facebook')}>
                    <i className="icon icon-fb"></i>
                </a>
            </li>}
            {links.twitter_link.length > 5 && <li className="list-inline-item">
                <a href={links.twitter_link} target="_blank" aria-label="twitter" onClick={() => trackerShare('Twitter')}>
                    <i className="icon icon-twitter"></i>
                </a>
            </li>}
            {links.instagram_link.length > 5 && <li className="list-inline-item">
                <a href={links.instagram_link} target="_blank" aria-label="instagram" onClick={() => trackerShare('Instagram')}>
                    <i className="icon icon-insta"></i>
                </a>
            </li>}
            {links.linkedin_link.length > 5 && <li className="list-inline-item">
                <a href={links.linkedin_link} target="_blank" aria-label="linkedin" onClick={() => trackerShare('Linkedin')}>
                    <i className="icon icon-linkedin"></i>
                </a>
            </li>}
            {/* <li className="list-inline-item">
                <Link to="#"><i className="icon icon-youtube"></i></Link>
            </li> */}
        </ul>
    )
}

export default FooterMenuListSocial