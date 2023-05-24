import React from "react";
import { Link } from "gatsby";
import './assets/styles/_index.scss';

const OfficeLandingCard = (props) => {
    return (
        <div className="office-landing-card-wrapper">
            <div className="office-landing-card-img">
                <Link to={``}>
                    <img src={props.img} className="img-fluid" alt=""/>
                </Link>
            </div>
            <div className="office-landing-card-text-wrapper">
                <div className="office-landing-card-title">
                    <Link to={``}>Location Estate Agents</Link>
                </div>
                <div className="office-landing-card-text">Mira, High Street, LN1 2AB</div>
                <div className="office-landing-card-mobile">
                    <a href={`tel:`}>07891 219 374</a>
                </div>
                <div className="office-landing-card-email">
                    <Link to={``} className="link-underline">location@mira.co.uk</Link>
                </div>
            </div>
        </div>
    )
}

export default OfficeLandingCard