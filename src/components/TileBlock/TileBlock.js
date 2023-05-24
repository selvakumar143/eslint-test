import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import ScrollAnimation from 'react-animate-on-scroll';
import './assets/styles/_index.scss';
import ImageModule from "../../modules/image-render";
const { ContentModule } = require("@starberry/gatsby-theme-utils/Modules/ContentModule")
const { CTALink } = require("@starberry/gatsby-theme-utils/Modules/CTALinkModule")

const TileBlock = (props) => {
    var imagename = "page.tile_section_image.tile_image";

    let processedImages = JSON.stringify({});
    if (props?.imagetransforms?.tile_section_image_Transforms) {
        processedImages = props?.imagetransforms?.tile_section_image_Transforms;
    }
    return (
        <section className="tile-block-wrapper section-p">
            <Container>
                <Row className="d-flex align-items-center">
                    <Col xl={5}>
                        {props?.image && <div className="img-wrapper tile-img-wrapper">
                            <ScrollAnimation animateIn="animate__fadeIn" delay={100} animateOnce offset={50}>
                                <ImageModule ImageSrc={props?.image} altText={props?.image?.alternativeText} imagetransforms={processedImages} renderer="srcSet" imagename={imagename} strapi_id={props?.id} classNames="img-fluid" />
                            </ScrollAnimation>
                        </div>}
                    </Col>
                    <Col xl={1}></Col>
                    <Col xl={6}>
                        {props.description && <ScrollAnimation animateIn="animate__slideInUp" delay={100} animateOnce offset={50}><ContentModule Content={props.description?.data?.description} /></ScrollAnimation>}
                        {props.cta_link && <ScrollAnimation animateIn="animate__slideInUp" delay={300} animateOnce offset={50}><CTALink class="button button-primary" link={props.cta_link} title={props.cta_title} target_window={props.cta_link.target_window} /></ScrollAnimation>}
                    </Col>
                </Row>
            </Container>
        </section>
    )
}

export default TileBlock