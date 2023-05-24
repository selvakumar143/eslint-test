import React, { useState } from "react";
import loadable from "@loadable/component";
import './assets/styles/_index.scss';
const FsLightbox = loadable(() => import("fslightbox-react"));

const PropertyDetailImgPopup = (props) => {

    // Lightbox image popup
    const [propertyImage, setPropertyImage] = useState(false);
    // Lightbox image popup

    return (
        <>
            {
                props.tag === "detail-gallery" ?
                <button onClick={ () => setPropertyImage(!propertyImage) } className={props.class}>{props.label}</button>
                : props.tag === "floorplan" ?
                <button onClick={ () => setPropertyImage(!propertyImage) }>Floorplans</button>
                : props.tag === "property-nav-sticky" ?
                <button onClick={ () => setPropertyImage(!propertyImage) }>{props.btnName}</button>
                :
                <button onClick={ () => setPropertyImage(!propertyImage) }><i className="icon icon-property-gallery"></i> {props?.currentSlide + 1}/{(props?.propImg)?.length}</button>
            }

            {/* Property Lightbox popup */}
            <FsLightbox
                type="image"
                toggler={ propertyImage }
                sources={ props.propImg }
            />
            {/* Property Lightbox popup */}
        </>
    )
}

export default PropertyDetailImgPopup