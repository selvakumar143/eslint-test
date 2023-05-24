import React, { useState, useEffect } from "react";
import { Link } from "gatsby";
import loadable from "@loadable/component"
import { Container, Row, Col } from "react-bootstrap";
import { PageLinks } from "../../common/site/page-static-links";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { sliderSettings } from "../SliderSettings/SliderSettings";
import FeaturedPropertiesCard from "../FeaturedPropertiesCard/FeaturedPropertiesCard";
import './assets/styles/_index.scss';
const Slider = loadable(() => import("react-slick"));
const { Site_Vars } = require("../../common/site/config");

const FeaturedProperties = (props) => {
    return (
        <React.Fragment>
            {props.properties.length > 0 && <section className="featured-properties-wrapper section-p">
                <Container>
                    <Row className="d-flex align-items-center featured-heading-wrapper">
                        <Col md={12} className="text-center">
                            <h2 className={props.tag}>Other properties that <span>may interest you</span></h2>
                        </Col>
                    </Row>

                    <Row>
                        <Col>
                            <Slider className="featured-properties-slider" {...sliderSettings}>
                            {props.properties && props.properties.map(({ node }, index) => {
                                let details_path = '/new-home-for-sale'
                                var imagename = "new-developments.images.results";

                                let processedImages = JSON.stringify({});
                                if (node?.imagetransforms?.images_Transforms) {
                                    processedImages = node?.imagetransforms?.images_Transforms;
                                }

                                // var image_all = JSON.parse(node.images.replace('\"', '"'))
                                return (
                                        <FeaturedPropertiesCard
                                            details_path={details_path}
                                            {...node}
                                            img={node.images && node.images.length > 0 ? node.images : ''}
                                            processedImages={processedImages}
                                            status={"Under Offer"}
                                            address={node.display_address}
                                            priceTag={"Guide Price"}
                                            price={node?.price?.toLocaleString()}
                                            title={node.title}
                                        />

                                    )
                                }
                                )}
                            </Slider>
                        </Col>
                    </Row>
                </Container>
            </section>}
        </React.Fragment>
    )
}

export default FeaturedProperties