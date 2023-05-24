import React from "react";
import { Link, navigate } from "gatsby";
import { Row, Col } from "react-bootstrap";
import StaticShare from "../StaticShare/StaticShare";
import './assets/styles/_index.scss';
import { PageLinks } from "../../common/site/page-static-links";

const PeopleDetailIntro = (props) => {
    return (
        <div className="people-detail-intro-wrapper">
            <Row>
                <Col md={6}>
                    <h3>{props.name}</h3>
                    {props.designation && <div className="position">{props.designation}</div> }
                    <ul className="list-inline people-detail-intro-list">
                        <li className="list-inline-item">
                            <a onClick={() => {navigate(`/${PageLinks.team_contact}/`,localStorage.setItem('team_name', props.name),localStorage.setItem('team_email', props.email) )}} className="button button-primary">Email Me</a>
                        </li>
                        {props.phone && <li className="list-inline-item">
                            <a href={`tel:${props.phone}`} className="button button-primary">Call Me</a>
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

export default PeopleDetailIntro