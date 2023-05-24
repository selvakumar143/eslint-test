import React from "react";
import { Link } from "gatsby";
import { Row, Col } from "react-bootstrap";
import { PageLinks } from "../../common/site/page-static-links";
import './assets/styles/_index.scss';

const PropertyCardBadge = (props) => {
    return (
        <div className="property-card-badge">
            <Row className="d-flex justify-content-center">
                <Col lg={10} className="d-flex justify-content-between property-badge-content">
                    <Row className="w-100 text-xl-left text-center">
                        <Col xl={7}>
                            <div className="badge-text">Do you need to <span>Sell or Let</span> your property?</div>
                        </Col>
                        <Col xl={5}>
                            <ul className="list-inline badge-list">
                                <li className="list-inline-item">
                                    <Link to={`/${PageLinks.valuation}/`} className="button button-white">Book a Valuation</Link>
                                </li>
                                <li className="list-inline-item">
                                    <Link to={`/${PageLinks.contact}/`} className="button button-white">Contact Us</Link>
                                </li>
                            </ul>
                        </Col>
                    </Row>
                </Col>
            </Row>
        </div>
    )
}

export default PropertyCardBadge