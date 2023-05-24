import React from "react";
import { Link } from "gatsby";
import './assets/styles/_index.scss';
import ImageModule from "../../modules/image-render";
const { Site_Vars } = require("../../common/site/config");

const FeaturedPropertiesCard = (props) => {
    var imagename = "property.images.results";
    return (
        <div className="featured-properties-slide">
            <div className="featured-properties-img-zoom img-wrapper">
                <Link to={props.details_path + '/' + props.slug + '/' + (props.id ? props.id : '') + '/'}>
                    <ImageModule ImageSrc={props.img[0]} altText={""} imagetransforms={props.processedImages} renderer="srcSet" imagename={imagename} strapi_id={props?.id} classNames="img-fluid" />
                    {
                        props.status &&
                        <div className="featured-status secondary-text">{props.status}</div>
                    }
                </Link>
            </div>
            <div className="featured-properties-text-wrapper d-flex justify-content-between">
                <div className="featured-text-left">
                    <div className="address"><Link to={props.details_path + '/' + props.slug + '/' + (props.id ? props.id : '') + '/'}>{props.address}</Link></div>
                    <div className="secondary-text d-md-none">{props.priceTag} {Site_Vars.default_currency}{props.price}</div>
                    <div className="title">{props.title}</div>
                </div>
                <div className="featured-text-right d-md-block d-none text-md-end text-start">
                    <div className="price-qualifier secondary-text">{props.priceTag}</div>
                    <div className="price secondary-text">{Site_Vars.default_currency}{props.price}</div>
                </div>
            </div>
        </div>
    )
}

export default FeaturedPropertiesCard