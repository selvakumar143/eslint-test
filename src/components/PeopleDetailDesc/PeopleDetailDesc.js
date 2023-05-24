import React from "react";
import './assets/styles/_index.scss';
const { ContentModule } = require("@starberry/gatsby-theme-utils/Modules/ContentModule")

const PeopleDetailDesc = (props) => {
    return (
        <div className="people-detail-desc-wrapper">
            {props.content &&
                <ContentModule Content={props.content?.data?.content} />
            }
        </div>
    )
}

export default PeopleDetailDesc