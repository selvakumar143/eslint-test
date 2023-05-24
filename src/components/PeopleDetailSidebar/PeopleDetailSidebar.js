import React from "react";
import StaticShare from "../StaticShare/StaticShare";
import './assets/styles/_index.scss';
import PeopleImg_1 from "../../images/people_img_1.png";
import ImageModule from "../../modules/image-render";

const PeopleDetailSidebar = (props) => {
    var imagename = "team.image.tile_image";

    let processedImages = JSON.stringify({});
    if (props?.imagetransforms?.image_Transforms) {
        processedImages = props?.imagetransforms?.image_Transforms;
    }
    return (
        <div className="people-detail-sidebar-wrapper">
            <div className="people-detail-zoom-img img-wrapper">
                <ImageModule ImageSrc={props.image} title={props.name} altText={props.name} imagetransforms={processedImages} renderer="srcSet" imagename={imagename} strapi_id={props.strapi_id} />
            </div>
            <div className="d-xl-block d-none">
                <StaticShare />
            </div>
        </div>
    )
}

export default PeopleDetailSidebar