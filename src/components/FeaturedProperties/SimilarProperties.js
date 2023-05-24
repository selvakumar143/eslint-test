import React, { useState, useEffect } from "react";
import { Link } from "gatsby";
import loadable from "@loadable/component"
import { Container, Row, Col } from "react-bootstrap";
import { PageLinks } from "../../common/site/page-static-links";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { sliderSettings } from "../SliderSettings/SliderSettings";
import { ApiRequest } from "../../common/utils/api_request_utils";
import FeaturedPropertiesCard from "../FeaturedPropertiesCard/FeaturedPropertiesCard";
import './assets/styles/_index.scss';
const Slider = loadable(() => import("react-slick"));

const FeaturedProperties = (props) => {
    const [propItems, setPropItems] = useState([])
    useEffect(() => {
        ApiRequest({
            method: "GET",
            url: `${process.env.GATSBY_STRAPI_SRC}/api/stb-lists/item/property-details?pid=${props?.prop_id}`
        }, (result) => {
            if (result.length > 0) {
                setPropItems(result)
            }
        })
    }, []);
    return (
        <React.Fragment>
            {propItems.length > 0 && <section className="featured-properties-wrapper section-p">
                <Container>
                    <Row className="d-flex align-items-center featured-heading-wrapper">
                        <Col md={3}></Col>
                        <Col md={6} className="text-center">
                            {
                                props.tag === "property-details" ?
                                    <h2 className={props.tag}>Other properties that <span>may interest you</span></h2>
                                    :
                                    (
                                        props.tag === "landing-page" ?
                                            <h2><span>Recently Sold</span> Properties</h2>
                                            :
                                            <h2><span>Handpicked</span> Properties</h2>
                                    )
                            }
                        </Col>
                        {
                            props.tag === "property-details" || props.tag === "landing-page" ?
                                "" :
                                <Col md={3} className="d-md-flex justify-content-end text-center">
                                    <Link to={`/${PageLinks.results_sales}/`} className="button button-primary">View More</Link>
                                </Col>
                        }
                    </Row>

                    <Row>
                        <Col>
                            <Slider className="featured-properties-slider" {...sliderSettings}>
                                {propItems?.map((item, i) => {
                                    let details_path = '/property-for-sale'
                                    if (item.search_type == "lettings") {
                                        details_path = '/property-to-rent'
                                    }

                                    let processedImages = JSON.stringify({});
                                    if (item?.imagetransforms?.images_Transforms) {
                                        processedImages = item?.imagetransforms?.images_Transforms;
                                    }

                                    var image_all = JSON.parse(item.images.replace('\"', '"'))

                                    return (
                                        <FeaturedPropertiesCard
                                            details_path={details_path}
                                            {...item}
                                            img={image_all}
                                            processedImages={processedImages}
                                            status={"Under Offer"}
                                            address={item.display_address}
                                            priceTag={"Guide Price"}
                                            price={item?.price?.toLocaleString()}
                                            title={item.title}
                                        />

                                    )
                                }
                                )}
                            </Slider>
                        </Col>
                    </Row>
                </Container>
            </section>}
        </React.Fragment>
    )
}

export default FeaturedProperties