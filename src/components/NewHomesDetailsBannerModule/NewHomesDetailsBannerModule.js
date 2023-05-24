import React from "react";
import { Link } from "gatsby";
import { Container, Row, Col } from "react-bootstrap";
import NewHomesDetailsBanner from "../NewHomesDetailsBanner/NewHomesDetailsBanner";
import './assets/styles/_index.scss';
const { Site_Vars } = require("../../common/site/config");

const NewHomesDetailsBannerModule = (props) => {
    return (
        <section className="property-banner-module-wrapper new-homes-banner-module">
            <Container>
                <Row className="d-flex align-items-center">
                    <Col xl={7}>
                        <NewHomesDetailsBanner propImg={props.propImg} images={props.images}/>
                    </Col>
                    <Col xl={1}></Col>
                    <Col xl={4}>
                        <h1 className="property-address">{props.display_address}</h1>
                        <div className="property-price">{props.price_qualifier} {Site_Vars.default_currency}{props?.price?.toLocaleString()} {props?.max_price ? ` - ${Site_Vars.default_currency}${props?.max_price?.toLocaleString()}` : ''}</div>
                        <div className="property-title">{props.title}</div>
                        <div className="property-btn d-md-block d-none">
                            <a className="button-sec button-sec-primary-filled">Enquire now</a>
                        </div>
                        <div className="property-contact d-md-block d-none">or call <Link to="">+44(0) 1342 123 456</Link> or <Link to="">Whatsapp</Link></div>
                    </Col>
                </Row>
            </Container>
        </section>
    )
}

export default NewHomesDetailsBannerModule