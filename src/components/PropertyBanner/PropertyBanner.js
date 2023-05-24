import React, { useState } from "react";
import { Link } from "gatsby";
import loadable from "@loadable/component";
import './assets/styles/_index.scss';
import PlayVideo from "../PlayVideo/PlayVideo";
import SocialShare from "../SocialShare/SocialShare";
// import PropertyBannerImg from "../../images/property_details_large_img.png";
import ImageModule from "../../modules/image-render";
import PropertyDetailImgPopup from "../PropertyDetailImgPopup/PropertyDetailImgPopup"
import NoImage from "../../images/no-image.png"
const Slider = loadable(() => import("react-slick"));

const NOIMAGE = [NoImage]

const PropertyBanner = (props) => {

    // Video play
    const [isPlay, setPlay] = useState(false)
    // Video play

    const [currentSlide, setCurrentSlide] = useState("");
    // Handle scroll
    const handleClickScrollLoc = () => {
        const element = document.querySelector(".property-details-map-wrapper");

        if (element) {
            window.scrollTo({
                behavior: 'smooth',
                top:
                    element.getBoundingClientRect().top -
                    document.body.getBoundingClientRect().top -
                    150,
            })
        }
    }
    // Handle scroll

    // Slider settings

    const handleAfterChange = (index) => {
        setCurrentSlide(index);
    };

    let settings = {
        dots: false,
        arrows: true,
        infinite: false,
        speed: 600,
        slidesToShow: 1,
        slidesToScroll: 1,
        centerMode: false,
        afterChange: handleAfterChange
    }
    // Slider settings

    const shareurl = typeof window !== 'undefined' ? window.location.href : ''

    const trackerShare = (event) => {
        window.dataLayer = window.dataLayer || [];
        window.dataLayer.push({
            'event': 'click',
            'formType': shareurl,
            'formId': event,
            'formName': event,
            'formLabel': event
        });
    }

    return (
        <div className="property-banner-wrapper">
            <div className="property-banner-img-zoom img-wrapper">
                {/* <img src={PropertyBannerImg} className="img-fluid" alt="" /> */}
                <Slider className="property-banner-slider" {...settings}>
                    {(props?.images?.strapi_json_value)?.map((image, i) =>
                        image.url ? <div className="property-banner-slide">
                            <div className="property-banner-img-zoom">
                                <ImageModule
                                    ImageSrc={image}
                                    altText={`image`}
                                    imagetransforms={props?.processedImages}
                                    renderer=""
                                    lazyLoading={i == 0 ? false : true}
                                    imagename={props?.imagename}
                                    strapi_id={props?.strapi_id} classNames="img-fluid position-static"
                                />
                            </div>
                        </div> :
                            <div className="property-banner-slide">
                                <div className="property-banner-img-zoom">
                                    <img src={NoImage} className="img-fluid" alt="" />
                                </div>
                            </div>
                    )}
                </Slider>
                <ul className="list-inline property-banner-list">
                    <li className="list-inline-item">
                        <PropertyDetailImgPopup
                            currentSlide={currentSlide}
                            propImg={props.propImg.length > 0 ? props.propImg : NOIMAGE}
                        />
                    </li>
                    {props?.floorPlanImg?.length > 0 &&
                        <li className="list-inline-item">
                            <PropertyDetailImgPopup
                                tag="floorplan"
                                propImg={props?.floorPlanImg}
                            />
                        </li>}
                    <li className="list-inline-item">
                        <Link to="#!" onClick={handleClickScrollLoc}>Map</Link>
                    </li>
                    {props?.video_tour?.strapi_json_value?.length > 0 &&
                        <li className="list-inline-item d-xl-inline-block d-none">
                            <button onClick={() => {setPlay(true);trackerShare('Video Click')}} className="">Video</button>
                            {isPlay && (
                                <PlayVideo
                                    isOpen={isPlay}
                                    stopPlay={setPlay}
                                    videoId=""
                                    isCloseFunction={setPlay}
                                    videourl={props?.video_tour?.strapi_json_value[0]?.url}
                                    htmlink={""}
                                />
                            )}
                        </li>
                    }
                    <li className="list-inline-item d-xl-inline-block d-none">
                        <SocialShare
                            iconClass="icon icon-property-share"
                            shareText="Share"
                        />
                    </li>
                </ul>
            </div>
        </div>
    )
}

export default PropertyBanner