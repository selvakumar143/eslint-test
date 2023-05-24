import React from "react";
import { Container, Row, Col, Breadcrumb } from "react-bootstrap";
import { Link } from "gatsby";
import './assets/styles/_index.scss';

const BreadcrumbModule = (props) => {
    var sublink = ''
    if(props.tag === "menu") {
        if(props.parentlink) {
            sublink = props.parentlink + '/' + props.subparentlink
        }
        else {
            sublink = props.subparentlink
        }
    }
    else {
        sublink = props.subparentlink
    }
    return (
        <div className="breadcrumb-module-wrapper">
            <Container>
                <Row>
                    <Col>
                        <Breadcrumb>
                            <li className="breadcrumb-item">
                                <Link to="/">Home</Link>
                            </li>
                            {props.parentlink && <li className="breadcrumb-item">
                                <Link to={`/${props.parentlink}/`}>{props.parentlabel}</Link>
                            </li> }
                            {props.subparentlink && <li className="breadcrumb-item">
                                <Link to={`/${sublink}/`}>{props.subparentlabel}</Link>
                            </li> }
                            <li className="breadcrumb-item active">
                                {props.title}
                            </li>
                        </Breadcrumb>
                    </Col>
                </Row>
            </Container>
        </div>
    )
}

export default BreadcrumbModule