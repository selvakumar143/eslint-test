import React from "react";
import { useStaticQuery, graphql } from "gatsby"
import ScrollAnimation from 'react-animate-on-scroll';
import { Link } from "gatsby";
import loadable from "@loadable/component";
import { Container, Row, Col } from "react-bootstrap";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { sliderSettings } from "../SliderSettings/SliderSettings";
import FeaturedSliderCard from "../FeaturedSliderCard/FeaturedSliderCard";
import { PageLinks } from "../../common/site/page-static-links";
import './assets/styles/_index.scss';
const Slider = loadable(() => import("react-slick"));

const FeaturedSlider = (props) => {
    const data = useStaticQuery(graphql`
        query {
            allStrapiBlog(sort: {fields: date, order: DESC}, limit: 6) {
                edges {
                  node {
                    date
                    strapi_id
                    slug
                    title
                    tile_image {
                      alternativeText
                      url
                    }
                    imagetransforms {
                      tile_image_Transforms
                    }
                    category {
                      strapi_json_value
                    }
                  }
                }
            }
        }
    `);

    const blogs = data.allStrapiBlog.edges;
    let all_news = props.tag === "details" ? props.data : blogs
    return (
        <section className="featured-slider-wrapper">
            <Container>
                <Row className="d-flex align-items-center featured-heading-wrapper">
                    <Col md={3}></Col>
                    <Col md={6} className="text-center">
                        <ScrollAnimation animateIn="animate__slideInUp" delay={100} animateOnce offset={50}>
                            {
                                props.tag === "static-detail" ?
                                    <h2>Other insights that <span>may interest you</span></h2>
                                    :
                                    <h2>From the <span>journal</span></h2>
                            }
                        </ScrollAnimation>
                    </Col>
                    {
                        props.tag === "static-detail" ? "" :
                            <Col md={3} className="d-md-flex justify-content-end text-center">
                                <ScrollAnimation animateIn="animate__slideInUp" delay={100} animateOnce offset={50}>
                                    <Link to={`/${PageLinks.news}/`} className="button button-primary" aria-hidden="true">View More</Link>
                                </ScrollAnimation>
                            </Col>
                    }
                </Row>

                <Row>
                    <Col>
                        <Slider className="featured-slider" {...sliderSettings}>
                            {all_news?.map(({ node }, index) => {
                                return (
                                    <ScrollAnimation animateIn="animate__slideInUp" delay={(index + 1) * 100} animateOnce offset={50}>
                                        <FeaturedSliderCard data={node} />
                                    </ScrollAnimation>
                                )
                            }
                            )}
                        </Slider>
                    </Col>
                </Row>
            </Container>
        </section>
    )
}

export default FeaturedSlider