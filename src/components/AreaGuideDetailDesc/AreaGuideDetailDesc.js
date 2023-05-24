import React, { useEffect, useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import loadable from "@loadable/component";
import AreaGuideDetailEnquiry from "../AreaGuideDetailEnquiry/AreaGuideDetailEnquiry";
import './assets/styles/_index.scss';
import ContactFormFields from "../../../static/forms/contact_form.json";
const ImageModule = loadable(() => import("../../modules/image-render"));
const { ContentModule } = require("@starberry/gatsby-theme-utils/Modules/ContentModule")
const DefaultForm = loadable(() => import("../forms/default-form-layout"))

const AreaGuideDetailDesc = (props) => {

    // Sticky scroll
    const [scroll, setScroll] = useState(false)

    useEffect(() => {
        window.addEventListener("scroll", () => {
            setScroll(window.scrollY > 250)
        })
    }, [])
    // Sticky scroll
    var imagename = "area-guide.banner_image.details1";

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
                            {props?.add_content?.length > 0 && props.add_content?.map((module, index) => {
                                return (
                                    <>
                                        {module.strapi_component === "page-modules.plain-content" && <ContentModule Content={module.content?.data?.content} />}
                                        {module.strapi_component === "page-modules.image" &&
                                            <div className="area-guide-detail-img img-wrapper">
                                                <ImageModule ImageSrc={module?.image} altText={props?.image?.alternativeText} imagetransforms={processedImages} renderer="srcSet" imagename={imagename} strapi_id={props?.strapi_id} classNames="img-fluid" />
                                            </div>
                                        }
                                    </>
                                )
                            }
                            )}
                        </div>
                    </Col>
                    <Col xl={1}></Col>
                    <Col xl={4}>
                        <div className={`static-detail-sidebar position-sticky ${scroll ? "scrolled" : ""}`}>
                            <div className="area-guide-detail-enquiry-wrapper">
                                <h4>Enquire Now</h4>
                                <DefaultForm fields={ContactFormFields} classname="enquiry-form-wrapper" />
                            </div>
                        </div>
                    </Col>
                </Row>
            </Container>
        </section>
    )
}

export default AreaGuideDetailDesc