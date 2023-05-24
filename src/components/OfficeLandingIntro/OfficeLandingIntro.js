import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import { Link } from "gatsby";
import GoogleReview from "../GoogleReview/GoogleReview";
import './assets/styles/_index.scss';

const OfficeLandingIntro = (props) => {
    return (
        <section className="office-landing-intro-wrapper">
            <Container>
                <Row>
                    <Col xl={7}>
                        <h1>Whether you <span>need a valuation</span> or <span>advice</span>, we're here to help.</h1>
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum quis suscipit odio.</p>
                        <ul className="list-inline button-list">
                            <li className="list-inline-item">
                                <Link className="button button-primary" to="">Book a valuation</Link>
                            </li>
                            <li className="list-inline-item">
                                <Link className="button button-primary" to="">Get in touch</Link>
                            </li>
                        </ul>
                        <GoogleReview tag={"office-landing"} />
                    </Col>
                </Row>
            </Container>
        </section>
    )
}

export default OfficeLandingIntro