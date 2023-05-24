import React from "react";
import { Link } from "gatsby";
import './assets/styles/_index.scss';
import ImageModule from "../../modules/image-render";
import { PageLinks } from "../../common/site/page-static-links";

const AreaGuideCard = (props) => {
    let processedImages = JSON.stringify({});
    if (props?.data.imagetransforms?.tile_image_Transforms) {
        processedImages = props?.data.imagetransforms?.tile_image_Transforms;
    }
    return (
        <div className="area-guide-card-wrapper">
            <div className="area-guide-card-img-zoom img-wrapper">
                <Link to={`/${PageLinks.areaguide}/${props.data.slug}/`}>
                <ImageModule ImageSrc={props.data.tile_image} title={props.data.title} altText={props.title} imagetransforms={processedImages} renderer="srcSet" imagename="area-guide.tile_image.small_image" strapi_id={props.data.strapi_id} />
                </Link>
            </div>
            <div className="area-guide-text-wrapper">
                <Link to={`/${PageLinks.areaguide}/${props.data.slug}/`}>{props.data.title}</Link>
            </div>
        </div>
    )
}

export default AreaGuideCard