import React from "react";
import { Link } from "gatsby";
import { Container, Row, Col } from "react-bootstrap";
import ScrollAnimation from 'react-animate-on-scroll';
import GoogleReview from "../GoogleReview/GoogleReview";
import './assets/styles/_index.scss';
import ImageModule from "../../modules/image-render";
const { CTALink } = require("@starberry/gatsby-theme-utils/Modules/CTALinkModule")
const { ContentModule } = require("@starberry/gatsby-theme-utils/Modules/ContentModule")


const Banner = (props) => {

    var imagename = "page.banner_section_banner_image.landing_banner_image";

    let processedImages = JSON.stringify({});
    if (props?.imagetransforms) {
        processedImages = props?.imagetransforms;
    }

    return (
        <section className="banner d-xl-flex align-items-center">
            <ImageModule ImageSrc={props?.image} altText={`${props?.image?.alternativeText ? props?.image?.alternativeText : props.banner_title ? props.banner_title : props.title} banner`} imagetransforms={processedImages} renderer="bgImg" imagename={imagename} strapi_id={props?.id} classNames="img-fluid banner-img" />
            {/* <img src={props.bannerImg} className="img-fluid banner-img" alt="" /> */}
            <div className="overlay-bg"></div>

            <Container className="banner-search-container">
                <Row>
                    <Col xl={5}>
                        {props.banner_title && <ScrollAnimation delay={100} animateIn="animate__slideInUp" animateOnce><h1><ContentModule Content={props.banner_title} /></h1></ScrollAnimation>}
                        {
                            props.officetag === "office-details" ?
                                <div className="office-details-wrapper">
                                    <ScrollAnimation animateIn="animate__slideInUp" delay={300} animateOnce offset={10}>
                                        <div className="office-landing-card-mobile">
                                            <a href={`tel:`}>07891 219 374</a>
                                        </div>
                                        <div className="office-landing-card-email">
                                            <Link to={``} className="link-underline">location@mira.co.uk</Link>
                                        </div>
                                        <div className="office-landing-card-text">Mira, High Street, LN1 2AB</div>
                                    </ScrollAnimation>
                                </div>
                                :
                                (props.banner_content && <ScrollAnimation animateIn="animate__slideInUp" delay={300} animateOnce offset={10}><ContentModule Content={props.banner_content?.data?.banner_content} /></ScrollAnimation>)
                        }

                        {
                            // props.banner_content && <ContentModule Content={props.banner_content?.data?.banner_content} />
                        }

                        <ul className="list-inline button-list">
                            {props.cta_1_title && props.cta_1_link &&
                                <li className="list-inline-item">
                                    <ScrollAnimation animateIn="animate__slideInUp" delay={400} animateOnce offset={10}>
                                        <CTALink class="button button-primary " link={props.cta_1_link} title={props.cta_1_title} target_window={props.cta_1_link.target_window} />
                                    </ScrollAnimation>
                                </li>
                            }
                            {props.cta_2_title && props.cta_2_link &&
                                <li className="list-inline-item">
                                    <ScrollAnimation animateIn="animate__slideInUp" delay={500} animateOnce offset={10}>
                                        <CTALink class="button button-primary" link={props.cta_2_link} title={props.cta_2_title} target_window={props.cta_2_link.target_window} />
                                    </ScrollAnimation>
                                </li>
                            }
                        </ul>
                        <ScrollAnimation animateIn="animate__slideInUp" delay={600} animateOnce offset={10}>
                            <GoogleReview />
                        </ScrollAnimation>
                    </Col>
                </Row>
            </Container>
        </section>
    )
}

export default Banner