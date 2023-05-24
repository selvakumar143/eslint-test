import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import StaticDetailTeamMember from "../StaticDetailTeamMember/StaticDetailTeamMember";
import StaticDetailSidebar from "../StaticDetailSidebar/StaticDetailSidebar";
import './assets/styles/_index.scss';

const StaticDetailIntro = (props) => {
    return (
        <section className="static-detail-intro-wrapper">
            <Container>
                <Row>
                    <Col xl={7}>
                        <h1>{props.title}</h1>
                        {props.author && <StaticDetailTeamMember {...props.author}/> }

                        {props.tag !== "static" && <div className="d-xl-none">{props.tag}
                            <StaticDetailSidebar date={props.date} category={props.category}/>
                        </div> }
                    </Col>
                </Row>
            </Container>
        </section>
    )
}

export default StaticDetailIntro