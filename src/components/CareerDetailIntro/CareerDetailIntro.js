import React from "react";
import { Row, Col } from "react-bootstrap";
import StaticShare from "../StaticShare/StaticShare";
import './assets/styles/_index.scss';

const CareerDetailIntro = (props) => {
    return (
        <div className="career-detail-intro-wrapper">
            <Row>
                <Col>
                    <h3>{props.title}</h3>
                </Col>
            </Row>
            <Row>
                <Col md={6}>
                    <ul className="list-unstyled career-detail-list">
                        {props.location && <li>
                            <p className="career-salary-details">{props.location}</p>
                        </li> }
                        {props.salary && <li>
                            <p className="career-salary-details">Salary - {props.salary}</p>
                        </li> }
                    </ul>
                </Col>
                <Col md={6}>
                    <div className="d-xl-none d-md-block d-flex align-items-center people-share">
                        <StaticShare />
                    </div>
                </Col>
            </Row>
        </div>
    )
}

export default CareerDetailIntro