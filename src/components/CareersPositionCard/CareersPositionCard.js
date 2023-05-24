import React from "react";
import { Link } from "gatsby";
import { Row, Col, Accordion } from "react-bootstrap";
import { PageLinks } from "../../common/site/page-static-links";
import './assets/styles/_index.scss';

const CareersPositionCard = (props) => {
    return (
        <div className="careers-position-card-wrapper">
            <Accordion className="careers-accordion-card">
                <Accordion.Item eventKey="0">
                    <Accordion.Header>
                        <Row className="d-flex align-items-center g-0 w-100">
                            <Col md={8} xs={11}>
                                <div className="position-card-heading-wrapper">
                                    <div className="position-card-heading">{props.position}</div>
                                    {(props.pricefrom && props.priceto) && <div className="position-card-price d-md-none">{props.pricefrom} - {props.priceto}</div>}
                                </div>
                            </Col>
                            <Col md={3} className="d-md-block d-none">
                                {props.salary && <div className="position-card-price">{props.salary}</div> }
                            </Col>
                            {/* <Col md={1} xs={1} className="d-flex justify-content-end">
                                <div className="position-link">
                                    <Link to="/career-detail/">
                                        <i className="icon icon-plus"></i>
                                    </Link>
                                </div>
                            </Col> */}
                        </Row>
                    </Accordion.Header>
                    <Accordion.Body>
                        <div className="careers-position-desc">
                            <p>A natural born leader? If you can motivate and develop a successful team, you are the perfect fit for us. As a sales or lettings Manager you will need outstanding communication and leadership skills. You will be an expert at rapport building, command trust, inspire confidence and have the natural ability to identify new business opportunities. If you have energy, integrity and a great track record in estate agency then please get in touch.</p>
                            <div className="careers-position-link">
                                <Link to={`/${PageLinks.career}/${props.slug}/`} className="">View Job</Link>
                            </div>
                        </div>
                    </Accordion.Body>
                </Accordion.Item>
            </Accordion>
            {/* <Row className="d-flex align-items-center g-0">
                <Col md={8} xs={11}>
                    <div className="position-card-heading-wrapper">
                        <div className="position-card-heading">{props.position}</div>
                        <div className="position-card-price d-md-none">{props.pricefrom} - {props.priceto}</div>
                    </div>
                </Col>
                <Col md={3} className="d-md-block d-none">
                    <div className="position-card-price">{props.pricefrom} - {props.priceto}</div>
                </Col>
                <Col md={1} xs={1} className="d-flex justify-content-end">
                    <div className="position-link">
                        <Link to="/career-detail/">
                            <i className="icon icon-plus"></i>
                        </Link>
                    </div>
                </Col>
            </Row> */}
        </div>
    )
}

export default CareersPositionCard