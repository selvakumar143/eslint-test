import React from "react";
import { Row, Col } from "react-bootstrap";
import ScrollAnimation from 'react-animate-on-scroll';
import './assets/styles/_index.scss';

const StatsModule = (props) => {
    return (
        <div className="stats-module-wrapper">
            <Row>
                {props.stats && props.stats.map((item, i) => (
                    <Col xl={3} xs={6}>
                        <ScrollAnimation animateIn="animate__slideInUp" delay={i * 200} animateOnce offset={50}>
                            <div className="stats-card">
                                <div className="stats-title">{item.stats_title}</div>
                                {item.stats_description && <div className="stats-text">{item.stats_description}</div>}
                            </div>
                        </ScrollAnimation>
                    </Col>
                ))}
            </Row>
        </div>
    )
}

export default StatsModule