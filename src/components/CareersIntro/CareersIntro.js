import React from "react";
import { Link } from "gatsby";
import { Container, Row, Col } from "react-bootstrap";
import ScrollAnimation from 'react-animate-on-scroll';
import './assets/styles/_index.scss';
import { PageLinks } from "../../common/site/page-static-links";
const { CTALink } = require("@starberry/gatsby-theme-utils/Modules/CTALinkModule")
const { ContentModule } = require("@starberry/gatsby-theme-utils/Modules/ContentModule")

const CareersIntro = (props) => {
    return (
        <div className="careers-intro-wrapper">
            <Container>
                <Row className="d-flex justify-content-center">
                    <Col xl={10}>
                        <ScrollAnimation animateIn="animate__slideInUp" delay={100} animateOnce offset={50}><ContentModule Content={props.content?.data?.content} /></ScrollAnimation>
                        <ScrollAnimation animateIn="animate__slideInUp" delay={300} animateOnce offset={50}><Link to={`/${PageLinks.team}`} className="button button-primary">Speak to our team</Link></ScrollAnimation>
                    </Col>
                </Row>
            </Container>
        </div>
    )
}

export default CareersIntro