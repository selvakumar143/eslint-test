import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import { Link } from "gatsby";
import ScrollAnimation from 'react-animate-on-scroll';
import { PageLinks } from "../../common/site/page-static-links";
import './assets/styles/_index.scss';
import ImageModule from "../../modules/image-render";
const { CTALink } = require("@starberry/gatsby-theme-utils/Modules/CTALinkModule")
const { ContentModule } = require("@starberry/gatsby-theme-utils/Modules/ContentModule")

const AreaGuideDetailsBanner = (props) => {

    var areaimagename = "area-guide.banner_image.details";

    let processedImages = JSON.stringify({});
    if (props?.imagetransforms) {
        processedImages = props?.imagetransforms;
    }
    return (
        <section className="area-guide-details-banner-wrapper">
            <Container>
                <Row>
                    <Col>
                        <div className="area-guide-details-banner-img">
                            <ImageModule ImageSrc={props?.image} altText={`${props?.image?.alternativeText ? props?.image?.alternativeText : props.banner_title ? props.banner_title : props.title} banner`} imagetransforms={processedImages} renderer="bgImg" imagename={areaimagename} strapi_id={props?.id} classNames="img-fluid area-guide-banner-img" />
                            <div className="overlay-bg"></div>
                            <div className="area-guide-details-banner-content">
                                {props.banner_title && <ScrollAnimation animateIn="animate__slideInUp" animateOnce><h1 className="area-guide-details-banner-title">{props.banner_title}</h1></ScrollAnimation>}
                                <ScrollAnimation animateIn="animate__slideInUp" animateOnce delay={200} offset={10}>{props.banner_content && <div className="area-guide-details-banner-text"><ContentModule Content={props.banner_content?.data?.banner_content} /></div>}</ScrollAnimation>


                                <ScrollAnimation animateIn="animate__slideInUp" animateOnce delay={300} offset={10}>
                                    <ul className="list-inline area-guide-details-banner-list">
                                        {PageLinks.results_sales && <li className="list-inline-item">
                                            <Link className="button button-white" to={`/${PageLinks.results_sales}/`}>Property For Sale</Link>
                                        </li>}
                                        {PageLinks.results_lettings && <li className="list-inline-item">
                                            <Link className="button button-white" to={`/${PageLinks.results_lettings}/`}>Property To Rent</Link>
                                        </li>}
                                    </ul>
                                </ScrollAnimation>


                            </div>
                        </div>
                    </Col>
                </Row>
            </Container>
        </section>
    )
}

export default AreaGuideDetailsBanner