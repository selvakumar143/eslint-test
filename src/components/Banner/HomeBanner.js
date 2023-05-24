import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import GoogleReview from "../GoogleReview/GoogleReview";
import HomeBannerImage from "./HomeBannerImage";
import './assets/styles/_index.scss';
const { CTALink } = require("@starberry/gatsby-theme-utils/Modules/CTALinkModule")
const { ContentModule } = require("@starberry/gatsby-theme-utils/Modules/ContentModule")

const Banner = (props) => {
    return (
        <section className="banner d-xl-flex align-items-center">
            <HomeBannerImage />
            <div className="overlay-bg"></div>

            <Container className="banner-search-container">
                <Row>
                    <Col xl={5}>
                        {props.banner_title && <h1><ContentModule Content={props.banner_title} /></h1>}
                        {props.banner_content && <ContentModule Content={props.banner_content?.data?.banner_content} />}
                        <ul className="list-inline button-list">
                            {props.cta_1_title && props.cta_1_link &&
                                <li className="list-inline-item">
                                    <CTALink class="button button-primary" link={props.cta_1_link} title={props.cta_1_title} target_window={props.cta_1_link.target_window} />
                                </li>
                            }
                            {props.cta_2_title && props.cta_2_link &&
                                <li className="list-inline-item">
                                    <CTALink class="button button-primary" link={props.cta_2_link} title={props.cta_2_title} target_window={props.cta_2_link.target_window} />
                                </li>
                            }
                        </ul>
                        <GoogleReview tag="home-page" />
                    </Col>
                </Row>
            </Container>
        </section>
    )
}

export default Banner