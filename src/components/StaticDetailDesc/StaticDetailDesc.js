import React, { useEffect, useState } from "react";
import loadable from "@loadable/component";
import { Container, Row, Col } from "react-bootstrap";
import StaticDetailSidebar from "../StaticDetailSidebar/StaticDetailSidebar";
import './assets/styles/_index.scss';
import StaticDetailImg_1 from "../../images/static_img_1.png";
import StaticDetailImg_2 from "../../images/static_img_2.png";
const ImageModule = loadable(() => import("../../modules/image-render"));
const { ContentModule } = require("@starberry/gatsby-theme-utils/Modules/ContentModule")

const StaticDetailDesc = (props) => {

    // Sticky scroll
    const [scroll, setScroll] = useState(false)

    useEffect(() => {
        window.addEventListener("scroll", () => {
            setScroll(window.scrollY > 250)
        })
    }, [])
    // Sticky scroll
    var imagename = "blog.banner_image.details";

    let processedImages = JSON.stringify({});
    if (props?.imagetransforms?.banner_image_Transforms) {
        processedImages = props?.imagetransforms?.banner_image_Transforms;
    }


    return (
        <section className="static-detail-desc-wrapper">
            <Container>
                <Row>
                    <Col xl={7}>
                        <div className="static-detail-desc">
                            {props?.banner_image &&
                                <div className="static-detail-img img-wrapper">
                                    <ImageModule ImageSrc={props?.banner_image} altText={props?.banner_image?.alternativeText} imagetransforms={processedImages} renderer="srcSet" imagename={imagename} strapi_id={props?.strapi_id} classNames="img-fluid" />
                                </div>
                            }


                            {props?.add_blog_content?.length > 0 && props.add_blog_content?.map((module, index) => {
                                return (
                                    <>
                                        {module.strapi_component === "page-modules.plain-content" && <ContentModule Content={module.content?.data?.content} />}
                                        {module.strapi_component === "page-modules.image" &&
                                            <div className="news-detail-img">
                                                <ImageModule ImageSrc={module?.image} altText={props?.image?.alternativeText} imagetransforms={processedImages} renderer="srcSet" imagename={imagename} strapi_id={props?.strapi_id} classNames="img-fluid" />
                                            </div>}
                                    </>
                                )
                            }
                            )}
                        </div>
                    </Col>
                    <Col xl={1}></Col>
                    <Col xl={4} className="d-xl-block d-none">
                        {props.tag !== "static" && <div className={`static-detail-sidebar position-sticky ${scroll ? "scrolled" : ""}`}>
                            <StaticDetailSidebar date={props.date} category={props.category}/>
                        </div> }
                    </Col>
                </Row>
            </Container>
        </section>
    )
}

export default StaticDetailDesc