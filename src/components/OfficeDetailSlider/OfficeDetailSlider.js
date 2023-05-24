import React from "react";
import loadable from "@loadable/component";
import { Container, Row, Col } from "react-bootstrap";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { sliderSettings2 } from "../SliderSettings/SliderSettings";
import './assets/styles/_index.scss';

const Slider = loadable(() => import("react-slick"));
const PeopleCard = loadable(() => import("../PeopleCard/PeopleCard"));

const OfficeDetailSlider = (props) => {
    return (
        <section className="office-detail-slider-wrapper">
            <Container>
                <Row className="d-flex align-items-center office-detail-heading-wrapper">
                    <Col md={3}></Col>
                    <Col md={6} className="text-center">
                        <h2>Other insights that <span>may interest you</span></h2>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Slider className="office-detail-slider" {...sliderSettings2}>
                            {/* <PeopleCard />
                            <PeopleCard />
                            <PeopleCard />
                            <PeopleCard /> */}
                        </Slider>
                    </Col>
                </Row>
            </Container>
        </section>
    )
}

export default OfficeDetailSlider