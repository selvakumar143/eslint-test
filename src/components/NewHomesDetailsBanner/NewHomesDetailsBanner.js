import React, { useState } from "react";
import { Link } from "gatsby";
import loadable from "@loadable/component";
import './assets/styles/_index.scss';
import PlayVideo from "../PlayVideo/PlayVideo";
import SocialShare from "../SocialShare/SocialShare";
import PropertyBannerImg from "../../images/property_details_large_img.png";
import ImageModule from "../../modules/image-render";
import PropertyDetailImgPopup from "../PropertyDetailImgPopup/PropertyDetailImgPopup"
import NoImage from "../../images/no-image.png"
const Slider = loadable(() => import("react-slick"));

const NOIMAGE = [NoImage]

const NewHomesDetailsBanner = (props) => {
    // Video play
    const [isPlay, setPlay] = useState(false)
    // Video play
    const [propertyImage, setPropertyImage] = useState(false);

    const [currentSlide, setCurrentSlide] = useState("");

    let propertyFloorImg = [];
    // for (let i = 0; i < props?.floorplan.strapi_json_value.length; i++) {
    if (props?.floorplan?.strapi_json_value.length > 0) {
        propertyFloorImg.push(props?.floorplan?.strapi_json_value[0].srcUrl);
    }
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

    return (
        <div className="property-banner-wrapper new-homes-banner-wrapper">
            <div className="property-banner-img-zoom img-wrapper">
                <Slider className="property-banner-slider" {...settings}>
                    {(props.images.strapi_json_value).map((image, i) =>
                        image.url &&
                        <div className="property-banner-slide">
                            <div className="property-banner-img-zoom">
                                {/* <ImageModule
                                ImageSrc={image}
                                altText={`image`}
                                imagetransforms={props?.processedImages}
                                renderer=""
                                lazyLoading={i == 0 ? false : true}
                                imagename={props?.imagename}
                                strapi_id={props?.strapi_id} classNames="img-fluid"
                            /> */}
                                <img src={image.srcUrl} className="img-fluid" alt="" />
                            </div>
                        </div>
                    )}
                </Slider>
                <ul className="list-inline property-banner-list">
                    <li className="list-inline-item">
                        <PropertyDetailImgPopup
                            currentSlide={propertyImage}
                            propImg={props.propImg}
                        />
                    </li>
                    {propertyFloorImg.length > 0 && <li className="list-inline-item">
                        <PropertyDetailImgPopup
                            tag="floorplan"
                            propImg={propertyFloorImg}
                        />
                    </li> }
                    <li className="list-inline-item">
                        <Link to="#!">Location</Link>
                    </li>
                    {/* <li className="list-inline-item">
                        <Link to="#!">Gallery</Link>
                    </li> */}
                    {/* <li className="list-inline-item d-xl-inline-block d-none">
                        <button onClick={() => setPlay(true)} className="">Video</button>
                        <PlayVideo
                            isOpen={isPlay}
                            stopPlay={setPlay}
                            videoId=""
                            isCloseFunction={setPlay}
                            videourl={""}
                            htmlink={""}
                        />
                    </li> */}
                    {/* <li className="list-inline-item">
                        <Link to="#!">Siteplan</Link>
                    </li> */}
                    <li className="list-inline-item">
                        <Link to="#!" onClick={handleClickScrollLoc}>Map</Link>
                    </li>
                </ul>
            </div>
        </div>
    )
}

export default NewHomesDetailsBanner