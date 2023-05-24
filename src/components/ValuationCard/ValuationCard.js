import React from "react";
import { Link } from "gatsby";
import './assets/styles/_index.scss';
import ImageModule from "../../modules/image-render";
const { ContentModule } = require("@starberry/gatsby-theme-utils/Modules/ContentModule")
const { CTALink } = require("@starberry/gatsby-theme-utils/Modules/CTALinkModule")

const ValuationCard = (props) => {
    var imagename = "page.valuation_section_tile_image.valuation_tile_image";

    let processedImages = JSON.stringify({});
    if (props?.imagetransforms?.valuation_section_tile_image_Transforms) {
        processedImages = props?.imagetransforms?.valuation_section_tile_image_Transforms;
    }
    return (
        <div className="valuation-card-wrapper">
            <div className="valuation-card-img-zoom img-wrapper">
                <ImageModule ImageSrc={props?.image} altText={props?.image?.alternativeText} imagetransforms={processedImages} renderer="srcSet" imagename={imagename} strapi_id={props?.id} classNames="img-fluid" />
                {/* <img src={props.img} className="img-fluid" alt="" /> */}
            </div>
            <div className="valuation-text-wrapper">
                <h1><span>{props.text}</span></h1>
                {props.content && <ContentModule Content={props.content?.data?.content} />}
                {props.cta_link &&
                    <div className="valuation-btn">
                        <CTALink class="button-sec button-sec-primary-filled" link={props.cta_link} title={props.cta_title} target_window={props.cta_link.target_window} />
                    </div>
                }
            </div>
        </div>
    )
}

export default ValuationCard