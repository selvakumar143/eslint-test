import React, { useState, useEffect } from "react";
import { Link } from "gatsby";
import { useLocation } from "@reach/router";
import { Container, Row, Col, Tab, Tabs } from "react-bootstrap";
import loadable from "@loadable/component"
import ImageModule from "../../modules/image-render";
import { ApiRequest } from "../../common/utils/api_request_utils";
import FeaturedPropertiesCard from "../FeaturedPropertiesCard/FeaturedPropertiesCard";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import './assets/styles/_index.scss';
const Slider = loadable(() => import("react-slick"));
const { Site_Vars } = require("../../common/site/config");

const AreaGuideProperties = (props) => {

    const location = useLocation();
    const [propItems, setPropItems] = useState([])
    const [propItemsLet, setPropItemsLet] = useState([])
    // Slider settings
    let settings = {
        dots: false,
        arrows: false,
        infinite: false,
        speed: 800,
        slidesToShow: 3,
        slidesToScroll: 1,
        centerMode: false,
        responsive: [
            {
                breakpoint: 1200,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 1,
                    infinite: false,
                    arrows: false,
                    dots: false,
                },
            },
            {
                breakpoint: 992,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                    infinite: false,
                    arrows: false,
                    dots: true,
                },
            },
            {
                breakpoint: 767,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    infinite: false,
                    speed: 400,
                    arrows: false,
                    dots: true,
                },
            },
        ],
    }
    // Slider settings
    useEffect(() => {
        ApiRequest({
            method: "GET",
            url: `${process.env.GATSBY_STRAPI_SRC}/api/properties?filters[display_address][$contains]=${props.areaname}&filters[department][$eq]=residential&filters[search_type][$eq]=sales&pagination[pageSize]=8`
        }, (result) => {
            if (result) {
                setPropItems(result.data)
            }
        })
        ApiRequest({
            method: "GET",
            url: `${process.env.GATSBY_STRAPI_SRC}/api/properties?filters[display_address][$contains]=${props.areaname}&filters[department][$eq]=residential&filters[search_type][$eq]=lettings&pagination[pageSize]=8`
        }, (result) => {
            if (result) {
                setPropItemsLet(result.data)
            }
        })
    }, [props]);


    return (
        <React.Fragment>
            {((propItems && propItems.length > 0) || (propItems && propItemsLet.length > 0)) && <section className="featured-properties-wrapper section-p">
                <Container>
                <Row className="d-flex align-items-center featured-heading-wrapper">
                        <Col className="text-center">
                            <h2 className={props.tag === "areaguide-properties" ? "" : `text-center`}>Featured Properties in <span>{props.areaname}</span></h2>
                            <Tabs
                                defaultActiveKey="forsale"
                                className="areaguide-detail-tab"
                            >
                                {propItems && propItems.length > 0 &&
                                    <Tab eventKey="forsale" title="For Sale">
                                        <Slider className="featured-properties-slider" {...settings}>
                                            {propItems && propItems.map((item, index) => {
                                                let details_path = '/property-for-sale'
                                                if (item.attributes.search_type == "lettings") {
                                                    details_path = '/property-to-rent'
                                                }
                                                let processedImages = JSON.stringify({});
                                                if (item?.attributes?.imagetransforms?.images_Transforms) {
                                                    processedImages = item?.attributes?.imagetransforms?.images_Transforms;
                                                }
                                                var imagename = "property.images.results";
                                                var image_all = item.attributes?.images && item.attributes?.images.length > 0 ? item.attributes?.images : ''
                                                return (
                                                    <FeaturedPropertiesCard
                                                        details_path={details_path}
                                                        {...item.attributes}
                                                        img={image_all}
                                                        processedImages={processedImages}
                                                        status={"Under Offer"}
                                                        address={item.attributes.display_address}
                                                        priceTag={"Guide Price"}
                                                        price={item?.attributes?.price?.toLocaleString()}
                                                        title={item.attributes?.title}
                                                    />
                                                )
                                            })}
                                        </Slider>
                                    </Tab>}
                                {propItemsLet && propItemsLet.length > 0 &&
                                    <Tab eventKey="torent" title="To Rent">
                                        <Slider className="featured-properties-slider" {...settings}>
                                            {propItemsLet && propItemsLet.map((item, index) => {
                                                let details_path = '/property-for-sale'
                                                if (item.attributes.search_type == "lettings") {
                                                    details_path = '/property-to-rent'
                                                }
                                                let processedImages = JSON.stringify({});
                                                if (item?.attributes?.imagetransforms?.images_Transforms) {
                                                    processedImages = item?.attributes?.imagetransforms?.images_Transforms;
                                                }
                                                var imagename = "property.images.results";
                                                var image_all = item.attributes?.images && item.attributes?.images.length > 0 ? item.attributes?.images : ''
                                                return (
                                                    <FeaturedPropertiesCard
                                                        details_path={details_path}
                                                        {...item.attributes}
                                                        id={item.id}
                                                        img={image_all}
                                                        processedImages={processedImages}
                                                        status={"Under Offer"}
                                                        address={item.attributes.display_address}
                                                        priceTag={"Guide Price"}
                                                        price={item?.attributes?.price?.toLocaleString()}
                                                        title={item.attributes?.title}
                                                    />
                                                )
                                            })}
                                        </Slider>
                                    </Tab>}
                            </Tabs>
                        </Col>
                    </Row>
                </Container>
            </section> }
        </React.Fragment>
    )
}

export default AreaGuideProperties