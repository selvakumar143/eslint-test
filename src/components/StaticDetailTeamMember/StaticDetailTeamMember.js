import React from "react";
import { Link } from "gatsby";
import loadable from "@loadable/component";
import './assets/styles/_index.scss';
import { PageLinks } from "../../common/site/page-static-links";
const ImageModule = loadable(() => import("../../modules/image-render"));

const StaticDetailTeamMember = (props) => {
    var imagename = "team.image.propdetails_image";

    let processedImages = JSON.stringify({});
    if (props?.imagetransforms?.image_Transforms) {
        processedImages = props?.imagetransforms?.image_Transforms;
    }
    return (
        <ul className="list-inline static-team-member-list d-flex align-items-center">
            <li className="list-inline-item">
                <div className="static-team-member-img">
                    <ImageModule ImageSrc={props?.image} altText={props?.image?.alternativeText} imagetransforms={processedImages} renderer="srcSet" imagename={imagename} strapi_id={props?.strapi_id} classNames="img-fluid" />
                    
                    {/* <img src={StaticTeamImg} className="img-fluid" alt="" /> */}
                </div>
            </li>
            <li className="list-inline-item">
                <div className="static-team-member-text">
                    by <Link to={`/${PageLinks.team}/${props.slug}/`}>{props.name}</Link>
                </div>
            </li>
        </ul>
    )
}

export default StaticDetailTeamMember