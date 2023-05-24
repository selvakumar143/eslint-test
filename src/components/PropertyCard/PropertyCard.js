import React from "react";
import { Link } from "gatsby";
import './assets/styles/_index.scss';
import { useLocation } from "@reach/router";
import { StaticImage } from "gatsby-plugin-image";
import ImageModule from "../../modules/image-render";
import NoImage from "../../images/no-image.png"
const { Site_Vars } = require("../../common/site/config");

const PropertyCard = (props) => {
    let details_path = '/property-for-sale'
    const location = useLocation();
    if (props.data.search_type == "lettings") {
        details_path = '/property-to-rent'
    }
    var imagename = "property.images.results";
    let propid = ''
    if(props?.data?.strapi_id)
        propid = props.data.strapi_id
    else if(props?.data?.objectID)
        propid = props.data.objectID
    return (
        <div className="property-card-wrapper">
            <div className="property-card-img-zoom img-wrapper">
                <Link to={details_path + '/' + props.data.slug + '/' + (propid)+'/'}>
                    {props.tag == "no-result" && props.data.images?.strapi_json_value.length > 0 &&
                        <ImageModule ImageSrc={props.data.images?.strapi_json_value[0]} altText={""} imagetransforms={props.processedImages} renderer="srcSet" imagename={imagename} strapi_id={props.data?.strapi_id} classNames="img-fluid" />
                    }
                    {props.tag != "no-result" && props.data?.images.length > 0 &&
                        <img fetchpriority={props.myindexval == 0 ? "low" : "low"} loading={props.myindexval < 6 ? "eager" : "lazy"} src={props.data?.images[0]['416x300']} alt="banner" className="img-fluid" />
                    }
                    {props.tag != "no-result" && props.data?.images.length == 0 &&
                        <img src={NoImage} className="img-fluid" alt="" />
                    }
                    {
                        props.status &&
                        <div className="property-card-status secondary-text">{props.status}</div>
                    }
                </Link>
            </div>
            <div className="property-card-text-wrapper d-flex justify-content-between">
                <div className="property-card-text-left">
                    <div className="address"><Link to={details_path + '/' + props.data.slug + '/' + (propid)+'/'}>{props.data.display_address}</Link></div>
                    <div className="secondary-text d-md-none">{props.data?.price_qualifier} {Site_Vars.default_currency}{props.data?.price?.toLocaleString()}</div>
                    <div className="title">{props.data.title}</div>
                </div>
                <div className="property-card-text-right d-md-block d-none text-md-end text-start">
                    <div className="price-qualifier secondary-text">{props.data?.price_qualifier}</div>
                    <div className="price secondary-text">{Site_Vars.default_currency}{props.data?.price?.toLocaleString()}</div>
                </div>
            </div>
        </div>
    )
}

export default PropertyCard