import React from "react";
import { Link, navigate } from "gatsby";
import { Row, Col, Container } from "react-bootstrap";
import './assets/styles/_index.scss';

const PropertyHistoryBack = (props) => {
    return (
        <div className="property-history-back-wrapper d-flex align-items-center">
            <Container>
                <Row>
                    <Col>
                        <div className="history-back">
                            <a href="javascript:;" onClick={() => navigate(-1)} className=""><i className="icon icon-history-back"></i> <span>Back to Search Results</span></a>
                        </div>
                    </Col>
                </Row>
            </Container>
        </div>
    )
}

export default PropertyHistoryBack