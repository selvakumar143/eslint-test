import React from "react";
import { Link } from "gatsby";
import StaticShare from "../StaticShare/StaticShare";
import { PageLinks } from "../../common/site/page-static-links";
import './assets/styles/_index.scss';

const CareerDetailSidebar = (props) => {
    return (
        <div className="career-detail-sidebar-wrapper">
            <div className="career-detail-text-wrapper">
                <h3>Interested in this Job?</h3>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                
                <div className="career-detail-btn-wrapper">
                    <Link to={`/${PageLinks.job_apply}/`} className="button-sec button-sec-primary-filled">Apply for this job</Link>
                </div>
                <div className="career-detail-btn-wrapper career-btm">
                    <Link to={`/${PageLinks.contact}/`} className="button-sec button-sec-primary-outline-dark">Contact us</Link>
                </div>
            </div>
            <div className="d-xl-block d-none">
                <StaticShare />
            </div>
        </div>
    )
}

export default CareerDetailSidebar