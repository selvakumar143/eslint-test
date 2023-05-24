import React, { useEffect, useState } from "react";
import { Link, navigate, useStaticQuery, graphql } from "gatsby";
import { Row, Col, Container } from "react-bootstrap";
import PropertyDetailImgPopup from "../PropertyDetailImgPopup/PropertyDetailImgPopup";
import PlayVideo from "../PlayVideo/PlayVideo";
import NoImage from "../../images/no-image.png";
import './assets/styles/_index.scss';

const NOIMAGE = [NoImage];

const PropertyNavSticky = (props) => {

    const { site } = useStaticQuery(
        graphql`
          query {
            site {
              siteMetadata {
                mailVars {
                  company_phone
                }
              }
            }
          }
        `
    )

    const company_phone = site?.siteMetadata?.mailVars?.company_phone
    const href = { href: `tel: ${company_phone}` }
    const url = typeof window !== 'undefined' ? window.location.href : ''

    // Video play
    const [isPlay, setPlay] = useState(false)
    // Video play
    
    // Sticky scroll
    const [scroll, setScroll] = useState(false);

    useEffect(() => {
        window.addEventListener("scroll", () => {
            setScroll(window.scrollY > 750)
        })
    }, [])
    // Sticky scroll

    // Handle scroll
    const handleClickScrollDetails = () => {
        const element = document.querySelector(".property-desc");

        if (element) {
            window.scrollTo({
                behavior: 'smooth',
                top:
                    element.getBoundingClientRect().top -
                    document.body.getBoundingClientRect().top -
                    100,
            })
        }
    }

    const handleClickScrollLoc = () => {
        const element = document.querySelector(".property-details-map-wrapper");

        if (element) {
            window.scrollTo({
                behavior: 'smooth',
                top:
                    element.getBoundingClientRect().top -
                    document.body.getBoundingClientRect().top -
                    100,
            })
        }
    }
    // Handle scroll

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
        <>
            {
                scroll ?
                <section className="property-nav-sticky-wrapper d-flex align-items-center fixed-top d-lg-flex d-none">
                    <Container>
                        <Row className="d-flex align-items-center">
                            <Col lg={7}>
                                <ul className="list-inline property-nav-sticky-list-first">
                                    <li className="list-inline-item">
                                        <Link to="#!" onClick={handleClickScrollDetails}>Details</Link>
                                    </li>
                                    {
                                        props.propImg.length > 0 &&
                                        <li className="list-inline-item">
                                            <PropertyDetailImgPopup
                                                propImg={props.propImg.length > 0 ? props.propImg : NOIMAGE}
                                                tag="property-nav-sticky"
                                                btnName="Gallery"
                                            />
                                        </li>
                                    }

                                    {
                                        props?.video_tour?.strapi_json_value?.length > 0 &&
                                        <li className="list-inline-item">
                                            {/* <Link to="#!">Video</Link> */}
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

                                    {
                                        props?.floorPlanImg?.length > 0 &&
                                        <li className="list-inline-item">
                                            <PropertyDetailImgPopup
                                                tag="floorplan"
                                                propImg={props?.floorPlanImg}
                                            />
                                        </li>
                                    }
                                    <li className="list-inline-item">
                                        <Link to="#!" onClick={handleClickScrollLoc}>Location</Link>
                                    </li>
                                </ul>
                            </Col>
        
                            <Col lg={5} className="d-flex justify-content-end">
                                <ul className="list-inline property-nav-sticky-list-second">
                                    <li className="list-inline-item">
                                        <div className="property-nav-sticky-call">
                                            Call <Link {...href}>{company_phone}</Link>
                                        </div>
                                    </li>
                                    <li className="list-inline-item">
                                        <a className="button-sec button-sec-primary-outline" onClick={() => { navigate('/book-a-viewing/', localStorage.setItem('property_id', props.crm_id), localStorage.setItem('property_address', props.display_address), localStorage.setItem('property_pageurl', url), localStorage.setItem('property_image', props.propImg && props.propImg.length > 0 ? props.propImg[0] : '')) }}>Request Details</a>
                                        {/* <Link to="" className="button-sec button-sec-primary-outline">Request Details</Link> */}
                                    </li>
                                </ul>
                            </Col>
                        </Row>
                    </Container>
                </section>
                : ""
            }
        </>
    )
}

export default PropertyNavSticky