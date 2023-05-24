import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import ScrollAnimation from 'react-animate-on-scroll';
import CareersPositionCard from "../CareersPositionCard/CareersPositionCard";
import './assets/styles/_index.scss';

const CareersPosition = (props) => {
    return (
        <div className="careers-position-wrapper">
            <Container>
                <Row className="d-flex justify-content-center">
                    <Col xl={8}>
                        <ScrollAnimation animateIn="animate__slideInUp" delay={100} animateOnce offset={50}><h2 className="text-center careers-position-heading">Positions we’re on the lookout for</h2>
                        </ScrollAnimation>
                        <ScrollAnimation animateIn="animate__slideInUp" delay={200} animateOnce offset={50}><p className="text-center">Looking for your next career opportunity? Explore our open positions and apply today.</p>
                        </ScrollAnimation>
                        {props.data?.map(({ node }, index) => {
                            return (
                                <ScrollAnimation animateIn="animate__slideInUp" delay={index * 100} animateOnce offset={50}>
                                    <CareersPositionCard
                                        position={node.title}
                                        salary={node.salary}
                                        slug={node.slug}
                                    />
                                </ScrollAnimation>
                            )
                        })}

                    </Col>
                </Row>
            </Container>
        </div>
    )
}

export default CareersPosition