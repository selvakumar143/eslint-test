import React from "react";
import loadable from "@loadable/component";
import { Container, Row, Col } from "react-bootstrap";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { sliderSettings } from "../SliderSettings/SliderSettings";
import ReviewsCard from "../ReviewsCard/ReviewsCard";
import './assets/styles/_index.scss';
import ReviewsImg from "../../images/landing_review_img.png";
const Slider = loadable(() => import("react-slick"));

const ReviewsSlider = (props) => {
    return (
        <div className="reviews-slider-wrapper section-p">
            <Container>
                <Row>
                    <Col>
                        <Slider className="reviews-slider" {...sliderSettings}>
                            <ReviewsCard 
                                img={ReviewsImg}
                            />

                            <ReviewsCard 
                                img={ReviewsImg}
                            />

                            <ReviewsCard 
                                img={ReviewsImg}
                            />
                        </Slider>
                    </Col>
                </Row>
            </Container>
        </div>
    )
}

export default ReviewsSlider