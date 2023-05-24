import React, { useEffect, useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
// import ReadMore from "../ReadMore/ReadMore";
import NewHomesDetailsSidebar from "../NewHomesDetailsSidebar/NewHomesDetailsSidebar";
import './assets/styles/_index.scss';
const { ContentModule } = require("@starberry/gatsby-theme-utils/Modules/ContentModule")

const NewHomesDetailsDesc = (props) => {

    // Sticky scroll
    const [scroll, setScroll] = useState(false)
    const [renderComponent, setRenderComponent] = useState(false);
    useEffect(() => {
        window.addEventListener("scroll", () => {
            setScroll(window.scrollY > 750)
        })
        window.addEventListener("mousemove", () => {
            if (renderComponent === false) {
                setRenderComponent(true)
            }
        })
        window.addEventListener("touchmove", () => {
            if (renderComponent === false) {
                setRenderComponent(true)
            }
        })
        window.addEventListener("keypress", () => {
            if (renderComponent === false) {
                setRenderComponent(true)
            }
        })
    }, [])
    // Sticky scroll

    return (
        <section className="property-desc-wrapper new-homes-desc-wrapper">
            <Container>
                <Row>
                    <Col xl={6}>
                        <div className="secondary-text text-sm-heading">About this Development</div>
                        {props.content &&
                            <div className="property-desc">
                                <ContentModule Content={props.content} />
                            </div>}
                    </Col>
                    <Col xl={1}></Col>
                    <Col xl={5} className="d-xl-block d-none">
                        <div className={`property-sidebar position-sticky ${scroll ? "scrolled" : ""}`}>
                            <NewHomesDetailsSidebar {...props}/>
                        </div>
                    </Col>
                </Row>
            </Container>
        </section>
    )
}

export default NewHomesDetailsDesc