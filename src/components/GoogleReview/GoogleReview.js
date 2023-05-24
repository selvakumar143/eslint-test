import React from "react";
import './assets/styles/_index.scss';
import ReviewImg from "../../images/google_reviews.svg";

const GoogleReview = (props) => {
    return (
        <div className={`google-review-wrapper d-md-flex align-items-center ${props.tag==="office-landing" || props.tag==="home-page" ? "d-flex" : "d-none"}`}>
            <img src={ReviewImg} className="review-img" alt="" />
            <ul className="list-inline review-list">
                <li className="list-inline-item"><i className="icon icon-star-dark"></i></li>
                <li className="list-inline-item"><i className="icon icon-star-dark"></i></li>
                <li className="list-inline-item"><i className="icon icon-star-dark"></i></li>
                <li className="list-inline-item"><i className="icon icon-star-dark"></i></li>
                <li className="list-inline-item"><i className="icon icon-star-dark"></i></li>
            </ul>
            <div className="reviews-text"><span>4.9/5</span> from 316 Reviews</div>
        </div>
    )
}

export default GoogleReview