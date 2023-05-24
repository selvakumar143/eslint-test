import React, { useEffect, useState } from "react";
import ScrollAnimation from 'react-animate-on-scroll';
import { Container, Row, Col } from "react-bootstrap";
import { useAllStrapiOffice } from "../../hooks/use-all-strapioffice";
import PropertyCalculator from "../PropertyCalculator/PropertyCalculator";
import PropertySidebar from "../PropertySidebar/PropertySidebar";
import ReadMore from "../ReadMore/ReadMore";
import './assets/styles/_index.scss';

const PropertyDescription = (props) => {

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
    let prop_desc = props?.long_description?.data?.long_description
    if (prop_desc === "") {
        prop_desc = props?.description?.data?.description
    }

    var office_data = useAllStrapiOffice()
    office_data = office_data?.allStrapiOffice?.nodes
    let office_key;
    if (props?.office_mapping !== "") {
        for (let k in office_data) {
            if (props?.office_mapping === office_data[k]?.property_office_mapping) {
                office_key = k;
                break;
            }
        }
    }


    return (
        <section className="property-desc-wrapper">
            <Container>
                <Row>
                    <Col xl={6}>
                        <div className="secondary-text text-sm-heading">Property Description</div>
                        <div className="property-desc">
                            <ScrollAnimation animateIn="animate__slideInUp" delay={100} animateOnce offset={50}>
                                <ReadMore
                                    content={prop_desc}
                                    height={270}
                                    className={"property-desc-text"}
                                    parentClassName=".property-desc-wrapper"
                                />
                            </ScrollAnimation>
                        </div>

                        <div className="d-xl-none">
                            <ScrollAnimation animateIn="animate__slideInUp" delay={100} animateOnce offset={50}>
                                <PropertySidebar accomadationSummary={props?.accommodation_summary} />
                            </ScrollAnimation>
                        </div>

                        {props?.search_type === "sales" &&
                            <div className="property-calc-wrapper">
                                <ScrollAnimation animateIn="animate__slideInUp" delay={100} animateOnce offset={50}>
                                    <PropertyCalculator prop_price={props?.price} />
                                </ScrollAnimation>
                            </div>
                        }
                    </Col>
                    <Col xl={1}></Col>
                    <Col xl={5} className="d-xl-block d-none">
                        <div className={`property-sidebar position-sticky ${scroll ? "scrolled" : ""}`}>
                            <ScrollAnimation animateIn="animate__slideInUp" delay={100} animateOnce offset={50}>
                                <PropertySidebar accomadationSummary={props?.accommodation_summary} />
                            </ScrollAnimation>
                        </div>
                    </Col>
                </Row>
            </Container>
        </section>
    )
}

export default PropertyDescription