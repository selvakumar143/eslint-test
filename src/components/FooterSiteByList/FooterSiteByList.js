import React from "react";
import { useStaticQuery, graphql } from "gatsby"
import './assets/styles/_index.scss';
const {CTALink } = require("@starberry/gatsby-theme-utils/Modules/CTALinkModule")

const FooterSiteByList = (props) => {

    // Current year
    const currentYear = new Date().getFullYear()
    // Current year
    const data = useStaticQuery(graphql`
        query {
            strapiSiteConfig {
                Bottom_Navigation {
                  title
                  link {
                    slug
                    link_type
                    target_window
                    external_link
                    strapi_parent {
                      slug
                    }
                  }
                }
            }
        }
    `);

    const menus = data.strapiSiteConfig.Bottom_Navigation;


    return (
        <>
            <ul className="list-inline siteby-list">
                {menus && menus.map((item, i) => (
                    <li className="list-inline-item">
                        <CTALink {...item} />
                    </li>
                ))}
            </ul>
            <div className="footer-copyright">© {currentYear} {process.env.GATSBY_SITE_NAME}. All Rights Reserved</div>
        </>
    )
}

export default FooterSiteByList