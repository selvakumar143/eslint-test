import React from "react";
import './assets/styles/_index.scss';
const { ContentModule } = require("@starberry/gatsby-theme-utils/Modules/ContentModule")

const ContactIntro = (props) => {
    return (
        <div className="contact-intro-wrapper">
            {props.banner_title && <h1><ContentModule Content={props.banner_title} />{props.name ? ' '+props.name : ''}</h1>}
            {props.banner_content && <ContentModule Content={props.banner_content?.data?.banner_content} />}
        </div>
    )
}

export default ContactIntro