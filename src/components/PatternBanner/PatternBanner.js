import React from "react";
import { Link } from "gatsby";
import { Container, Row, Col } from "react-bootstrap";
import ScrollAnimation from 'react-animate-on-scroll';
import StatsModule from "../StatsModule/StatsModule";
import './assets/styles/_index.scss';
const { ContentModule } = require("@starberry/gatsby-theme-utils/Modules/ContentModule")
const { CTALink } = require("@starberry/gatsby-theme-utils/Modules/CTALinkModule")

const PatternBanner = (props) => {
    return (
        <section className={`pattern-banner-wrapper section-p ${props.tag}`}>
            <Container>
                <Row className="d-flex justify-content-center">
                    <Col xl={8}>
                        <div className="text-center">
                            <ScrollAnimation animateIn="animate__slideInUp" delay={100} animateOnce offset={10}><div className="secondary-text">{props.title}</div></ScrollAnimation>
                            {props.short_description && <ScrollAnimation animateIn="animate__slideInUp" delay={200} animateOnce offset={10}><ContentModule Content={props.short_description?.data?.short_description} /></ScrollAnimation>}
                            <ul className="list-inline pattern-list">
                                {props.add_new && props.add_new.map((item, index) => {
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
                    props.Statistics && props.Statistics.length > 0 &&
                    <StatsModule stats={props.Statistics} />
                }
            </Container>
        </section>
    )
}

export default PatternBanner