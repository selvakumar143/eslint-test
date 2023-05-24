import React, { useEffect, useState } from "react";
import loadable from "@loadable/component";
import { useStaticQuery, graphql } from "gatsby"
import { Link } from "gatsby";
import { Container, Row, Col } from "react-bootstrap";
import FooterPopularSearch from "../FooterPopularSearch/FooterPopularSearch";
import FooterMenuListSocial from "../FooterMenuListSocial/FooterMenuListSocial";
import FooterSiteByList from "../FooterSiteByList/FooterSiteByList";
import './assets/styles/_index.scss';
import { PageLinks } from "../../common/site/page-static-links";
const { CTALink } = require("@starberry/gatsby-theme-utils/Modules/CTALinkModule")
// const FooterNewsLetter = loadable(() => import("../FooterNewsLetter/FooterNewsLetter"));
const FooterNewsLetter = React.lazy(() => import("../FooterNewsLetter/FooterNewsLetter"));

const Footer = (props) => {
    const data = useStaticQuery(graphql`
        query {
            strapiSiteConfig {
                add_contact_details {
                  address
                  email
                  title
                  phone
                }
                Footer_Links {
                  title
                  add_link {
                    title
                    link {
                      ...MenuFragment
                    }
                  }
                }
            }
        }
    `);

    const contactdetails = data.strapiSiteConfig?.add_contact_details;
    const footerLinks = data.strapiSiteConfig?.Footer_Links;


    const [renderComponent, setRenderComponent] = useState(false);
    useEffect(() => {
        window.addEventListener("mousemove", () => {
            if (renderComponent === false) {
                setRenderComponent(true)
            }
        })
        window.addEventListener("touchmove", () => {
            if (renderComponent === false) {
                setRenderComponent(true)
            }
        })
        window.addEventListener("keypress", () => {
            if (renderComponent === false) {
                setRenderComponent(true)
            }
        })

    }, [])


    return (
        <footer className={`footer ${props.footertag}`}>
            <Container>
                <Row>
                    <Col>
                        <FooterPopularSearch popularSearch={props.popularSearch} />
                    </Col>
                </Row>
                <Row>
                    <Col xl={4} md={6}>
                        {footerLinks.map((item, index) => (
                            <div className="footer-menu">
                                {item.title && <div className="footer-menu-title">{item.title}</div>}
                                <ul className="footer-menu-list list-unstyled">
                                    {item.add_link.map((child, index) => (
                                        <li>
                                            <CTALink {...child} />
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </Col>
                    <Col xl={4} md={6}>
                        <div className="footer-menu">
                            <div className="footer-menu-title">Contact</div>
                            <ul className="footer-menu-list list-unstyled">
                                {contactdetails.phone && <li>
                                    <a href={`tel:${contactdetails.phone}`}>{contactdetails.phone}</a>
                                </li>}
                                {contactdetails.email && <li>
                                    <Link to={`/${PageLinks.enquiry}`} className="email">{contactdetails.email}</Link>
                                </li>}
                                {contactdetails.address && <li>
                                    <p>{contactdetails.address}</p>
                                </li>}
                            </ul>
                        </div>
                    </Col>
                    <Col xl={4} md={12}>
                        <div className="footer-menu">
                            <div className="footer-menu-title">Newsletter</div>
                            {renderComponent && <FooterNewsLetter /> }
                        </div>
                    </Col>
                </Row>

                <Row className="footer-siteby">
                    <Col xl={6} className="order-xl-1 order-2">
                        <FooterSiteByList />
                    </Col>
                    <Col xl={6} className="d-xl-flex justify-content-end order-xl-2 order-1">
                        <FooterMenuListSocial />
                    </Col>
                </Row>
            </Container>
        </footer>
    )
}

export default Footer