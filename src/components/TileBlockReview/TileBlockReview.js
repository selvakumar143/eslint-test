import React, { useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
// import PlayVideo from "../PlayVideo/PlayVideo";
import './assets/styles/_index.scss';

const TileBlockReview = (props) => {

    // Video play
    const [isPlay, setPlay] = useState(false)
    // Video play

    return (
        <section className={`tile-block-review-wrapper section-p ${props.tag}`}>
            <Container>
                <Row className="d-flex align-items-center">
                    {/* <Col xl={5}>
                        <div className="img-wrapper tile-review-img-wrapper">
                            <img src={props.reviewImg} className="img-fluid" alt="" />
                            {
                                props.tag === "landing-page" ?
                                <div className="review-play">
                                    <button onClick={() => setPlay(true)} className="review-play-button">
                                        <div className="review-play-btn d-flex align-items-center justify-content-center">
                                            <i className="icon icon-play"></i>
                                        </div>
                                    </button>
                                    {isPlay && (
                                        <PlayVideo
                                            isOpen={isPlay}
                                            stopPlay={setPlay}
                                            videoId=""
                                            isCloseFunction={setPlay}
                                            videourl={"https://youtu.be/6stlCkUDG_s"}
                                            htmlink={""}
                                        />
                                    )}
                                </div>
                                : ""
                            }
                        </div>
                    </Col> */}
                    {/* <Col xl={1}></Col> */}
                    <Col xl={12}>
                        <div className="text-center">
                            <ul className="list-inline review-list">
                                <li className="list-inline-item"><i className="icon icon-star-primary"></i></li>
                                <li className="list-inline-item"><i className="icon icon-star-primary"></i></li>
                                <li className="list-inline-item"><i className="icon icon-star-primary"></i></li>
                                <li className="list-inline-item"><i className="icon icon-star-primary"></i></li>
                                <li className="list-inline-item"><i className="icon icon-star-primary"></i></li>
                            </ul>
                            <p className="review-text">{props.reviewtext}</p>
                            <div className="secondary-text review-name">{props.reviewauthor}</div>
                        </div>
                    </Col>
                </Row>
            </Container>
        </section>
    )
}

export default TileBlockReview