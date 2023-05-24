import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import { Link } from "gatsby";
import Seo from "../components/seo";
import Layout from "../components/layout";

const NotFoundPage = () => (
    <Layout>
        <div className="layout-padding-top"></div>
        <div className="grey-bg">
            <div className="error-page-wrapper d-flex align-items-center">
            <Container>
                <Row className="d-flex justify-content-center">
                    <Col xl={7} className="text-center">
                        <h1><span>Something’s</span> gone wrong!</h1>
                        <p>Proin euismod dignissim nisl a convallis. Donec pretium libero libero. In eget dolor ligula. Sed enim massa, efficitur nec quam interdum.</p>
                        <ul className="list-inline">
                            <li className="list-inline-item">
                                <Link to="/" className="button button-primary">Homepage</Link>
                            </li>
                            <li className="list-inline-item">
                                <Link to="/contact/" className="button button-primary">Contact us</Link>
                            </li>
                        </ul>
                    </Col>
                </Row>
            </Container>
            </div>
        </div>
    </Layout>
)

export const Head = () => <Seo title="404: Not Found" />

export default NotFoundPage