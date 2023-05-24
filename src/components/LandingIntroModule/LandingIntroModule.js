import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import ScrollAnimation from 'react-animate-on-scroll';
import './assets/styles/_index.scss';
const { ContentModule } = require("@starberry/gatsby-theme-utils/Modules/ContentModule")
const { CTALink } = require("@starberry/gatsby-theme-utils/Modules/CTALinkModule")

const LandingIntroModule = (props) => {
    return (
        <section className="landing-intro-module-wrapper section-p">
            <Container>
                <Row className="d-flex justify-content-center">
                    <Col xl={8}>
                        <div className="landing-intro-text-wrapper">
                            <ScrollAnimation animateIn="animate__slideInUp" delay={100} animateOnce offset={50}><div className="secondary-text landing-text-sm">{props.title}</div></ScrollAnimation>
                            {props.short_description && <ScrollAnimation animateIn="animate__slideInUp" delay={300} animateOnce offset={50}><ContentModule Content={props.short_description?.data?.short_description} /></ScrollAnimation>}
                        </div>
                    </Col>
                </Row>
            </Container>
        </section>
    )
}

export default LandingIntroModule