import React, { useEffect, useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import OfficeDetailMap from "../OfficeDetailMap/OfficeDetailMap";
import OfficeDetailSidebar from "../OfficeDetailSidebar/OfficeDetailSidebar";
import './assets/styles/_index.scss';

const OfficeDetailDesc = (props) => {

    // Sticky scroll
    const [scroll, setScroll] = useState(false)

    useEffect(() => {
        window.addEventListener("scroll", () => {
            setScroll(window.scrollY > 100)
        })
    }, [])
    // Sticky scroll

    return (
        <section className="office-detail-desc-wrapper">
            <Container>
                <Row>
                    <Col xl={7}>
                        <div className="secondary-text office-detail-text">Kent Estate Agents</div>
                        <div className="office-detail-desc">
                            <p>At Mira Estate Agents, we go out of our way to help clients with their property requirements, and have been doing so since 1988.</p>
                            <p>We pride ourselves on offering honest advice and guidance to all, combining our unrivalled local insight in the Kent property market with the strength and reach of Sirius.<br /><br />
And it’s not just sales we offer. Our multidisciplinary service line expands across every aspect of residential and rural property, including finance, planning, development, and valuation, so whatever your needs, we’re here to help you every step of the way.</p>
                        </div>

                        <div className="secondary-text office-detail-text">The Local Area</div>
                        <div className="office-detail-desc-text">
                            <p>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla diam mi, malesuada id felis vitae, placerat ullamcorper justo. Proin commodo maximus orci, quis rhoncus magna euismod quis. Vivamus congue, ex in auctor dignissim, neque tortor dignissim arcu, non dignissim lacus sapien in ante. Duis ultrices ligula in commodo gravida. <br /><br />
Proin dignissim quam eu porta bibendum. Curabitur metus libero, semper a magna quis, convallis aliquam massa. Maecenas vehicula lorem ex, eget molestie purus eleifend in. Quisque bibendum, metus ultrices fermentum blandit, odio leo fringilla nunc, in pharetra sem purus nec augue. Vestibulum sit amet bibendum dui. Pellentesque vitae augue nisl. Donec ac sagittis erat.
                            </p>
                        </div>

                        <div className="divider-line"></div>

                        <OfficeDetailMap />
                    </Col>
                    <Col xl={1}></Col>
                    <Col xl={4}>
                        <div className={`office-detail-sidebar position-sticky ${scroll ? "scrolled" : ""}`}>
                            <OfficeDetailSidebar />
                        </div>
                    </Col>
                </Row>
            </Container>
        </section>
    )
}

export default OfficeDetailDesc