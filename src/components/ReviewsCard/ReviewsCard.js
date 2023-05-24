import React, { useState } from "react";
import PlayVideo from "../PlayVideo/PlayVideo";
import './assets/styles/_index.scss';

const ReviewsCard = (props) => {

    // Video play
    const [isPlay, setPlay] = useState(false)
    // Video play

    return (
        <div className="reviews-slide">
            <div className="reviews-img-zoom img-wrapper">
                <img src={props.img} className="img-fluid" alt="" />
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
            </div>
        </div>
    )
}

export default ReviewsCard