import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import loadable from "@loadable/component";
import Layout from "../components/layout";

import OfficeImg_1 from "../images/office_img_1.png";
import OfficeImg_2 from "../images/office_img_2.png";

const OfficeLandingIntro = loadable(() => import("../components/OfficeLandingIntro/OfficeLandingIntro"));
const OfficeLandingCard = loadable(() => import("../components/OfficeLandingCard/OfficeLandingCard"));
const PatternBanner = loadable(() => import("../components/PatternBanner/PatternBanner"));

const OfficeLanding = (props) => {
    return (
        <Layout>
            <div className="layout-padding-top"></div>

            <OfficeLandingIntro />

            <Container>
                <Row>
                    <Col md={6}>
                        <OfficeLandingCard img={OfficeImg_1} />
                    </Col>
                    <Col md={6}>
                        <OfficeLandingCard img={OfficeImg_2} />
                    </Col>
                </Row>
            </Container>

            <PatternBanner 
                tag = "brown"
                title = "start your journey"
                desc= "Our team of estate agents are experienced, passionate and creative people who are well connected in their local community."
            />
        </Layout>
    )
}

export default OfficeLanding