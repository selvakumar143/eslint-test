import React from "react";
import './assets/styles/_index.scss';
const { ContentModule } = require("@starberry/gatsby-theme-utils/Modules/ContentModule")

const CareerDetailDesc = (props) => {
    return (
        <div className="career-detail-desc-wrapper">
            <ContentModule Content={props.job_details?.data?.job_details} />
        </div>
    )
}

export default CareerDetailDesc