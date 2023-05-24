import React from "react";
import { Link } from "gatsby";
import { useStaticQuery, graphql } from "gatsby"
import ScrollAnimation from 'react-animate-on-scroll';
import { Container, Row, Col } from "react-bootstrap";
import StatsModule from "../StatsModule/StatsModule";
import './assets/styles/_index.scss';
const { ContentModule } = require("@starberry/gatsby-theme-utils/Modules/ContentModule")
const { CTALink } = require("@starberry/gatsby-theme-utils/Modules/CTALinkModule")

const PatternBannerPropertyDetails = (props) => {
    const data = useStaticQuery(graphql`
        query {
            strapiSiteConfig {
              property_details_footer_module {
                ...TextModuleFragment
              }
            }
        }
    `);

    const footerDetails = data.strapiSiteConfig?.property_details_footer_module;
    var color_tag = "blue"
    if (footerDetails.layout === "background_primary_color") {
        color_tag = "brown"
    }

    return (
        <section className={`pattern-banner-wrapper section-p ${color_tag}`}>
            <Container>
                <Row className="d-flex justify-content-center">
                    <Col xl={8}>
                        <div className="text-center">
                            <ScrollAnimation animateIn="animate__slideInUp" delay={100} animateOnce offset={10}><div className="secondary-text">{footerDetails.title}</div></ScrollAnimation>
                            {footerDetails.short_description && <ScrollAnimation animateIn="animate__slideInUp" delay={200} animateOnce offset={10}><ContentModule Content={footerDetails.short_description?.data?.short_description} /></ScrollAnimation>}
                            <ul className="list-inline pattern-list">
                                {footerDetails.add_new && footerDetails.add_new.map((item, index) => {
                                    return (
                                        <li className="list-inline-item">
                                            <ScrollAnimation animateIn="animate__slideInUp" delay={index * 400} animateOnce offset={50}>
                                                <CTALink class="button button-white" link={item.link} title={item.title} target_window={item.link.target_window}>{item.title}</CTALink>
                                            </ScrollAnimation>
                                        </li>
                                    )
                                })}
                            </ul>
                        </div>
                    </Col>
                </Row>

                {
                    footerDetails.Statistics && footerDetails.Statistics.length > 0 &&
                    <StatsModule stats={footerDetails.Statistics} />
                }
            </Container>
        </section>
    )
}

export default PatternBannerPropertyDetails