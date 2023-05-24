import React, { useState } from "react";
import { Container } from "react-bootstrap";
import ScrollAnimation from 'react-animate-on-scroll';
import loadable from "@loadable/component";
import './assets/styles/_index.scss';
import ImageModule from "../../modules/image-render";

const PropertyDetailImgPopup = loadable(() => import("../PropertyDetailImgPopup/PropertyDetailImgPopup"));
const FsLightbox = loadable(() => import("fslightbox-react"));

const PropertyDetailsGallery = (props) => {
    const { propImg, processedImages, imagename, prop_id } = props

    // Lightbox image popup
    const [propertyImage, setPropertyImage] = useState(false);
    const [index, setIndex] = useState(0)
    // Lightbox image popup

    return (
        <Container>
            <div className="property-details-gallery-wrapper">
                {(props?.images?.strapi_json_value)?.slice(0, 6)?.map((image, i) =>
                    image.url &&
                    <div className="property-details-card-img-zoom img-wrapper more-img" key={i} onClick={() => { setPropertyImage(!propertyImage); setIndex(i) }}>
                        <ScrollAnimation animateIn="animate__slideInUp" delay={i*100} animateOnce offset={50}>
                            {/* <img src={data} alt="Gallery-Img" /> */}
                            <ImageModule
                                ImageSrc={image}
                                altText={"details"}
                                imagetransforms={processedImages}
                                renderer="srcSet"
                                imagename={imagename}
                                strapi_id={prop_id}
                                classNames="img-fluid" />
                            {6 == i + 1 && (
                                <PropertyDetailImgPopup
                                    propImg={propImg}
                                    class={"more-img-btn"}
                                    label={"More Photos"}
                                    tag="detail-gallery"
                                />
                            )}
                        </ScrollAnimation>
                    </div>
                )}
            </div>
            <FsLightbox
                type="image"
                toggler={propertyImage}
                sources={propImg}
                sourceIndex={index}
            />
        </Container>
    )
}

export default PropertyDetailsGallery