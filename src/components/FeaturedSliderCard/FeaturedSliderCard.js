import React from "react";
import { Link } from "gatsby";
import './assets/styles/_index.scss';
import ImageModule from "../../modules/image-render";
import { PageLinks } from "../../common/site/page-static-links";

const FeaturedSliderCard = (props) => {
    const ImageRenderList = ({ item, imagename }) => {
        let processedImages = JSON.stringify({});
        if (item?.imagetransforms?.tile_image_Transforms) {
            processedImages = item?.imagetransforms?.tile_image_Transforms;
        }

        return (
            <ImageModule ImageSrc={item.tile_image} title={item.title} altText={item.title} imagetransforms={processedImages} renderer="srcSet" imagename={imagename} strapi_id={item.strapi_id} />
        )
    }
    return (
        <div className="featured-slide">
            <div className="featured-img-zoom img-wrapper">
                <Link to={`/${PageLinks.news}/${props.data.slug}/`} aria-hidden="true">
                    <ImageRenderList item={props?.data} imagename={"blog.tile_image.small_image"} />
                    {/* <div className="news-card-status secondary-text">{props.status}</div> */}
                </Link>
            </div>
            <div className="featured-text-wrapper">
                <div className="address">
                    <Link to={`/${PageLinks.news}/${props.data.slug}/`} aria-hidden="true">
                        {props.data.title}
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default FeaturedSliderCard