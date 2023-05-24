import React from "react";
// import { Link } from "gatsby";
// import { Container, Row, Col, Form } from "react-bootstrap";
import loadable from "@loadable/component";
import Layout from "../components/layout";

const BreadcrumbModule = loadable(() => import("../components/BreadcrumbModule/BreadcrumbModule"));
const NewHomesDetailsBannerModule = loadable(() => import("../components/NewHomesDetailsBannerModule/NewHomesDetailsBannerModule"));
const NewHomesDetailsDesc = loadable(() => import("../components/NewHomesDetailsDesc/NewHomesDetailsDesc"));
const NewHomesDetailsAvailability = loadable(() => import("../components/NewHomesDetailsAvailability/NewHomesDetailsAvailability"));
const PropertyDetailsGallery = loadable(() => import("../components/PropertyDetailsGallery/PropertyDetailsGallery"));
const PropertyDetailsMap = loadable(() => import("../components/PropertyDetailsMap/PropertyDetailsMap"));
const FeaturedProperties = loadable(() => import("../components/FeaturedProperties/SimilarProperties"));
const PatternBanner = loadable(() => import("../components/PatternBanner/PatternBannerPropertyDetails"));
const FooterContactMobile = loadable(() => import("../components/FooterContactMobile/FooterContactMobile"));

const NewHomesDetail = (props) => {
    return (
        <Layout layout={""} footertag={"footer-contact"} >
            <div className="layout-padding-top"></div>

            <BreadcrumbModule />

            <NewHomesDetailsBannerModule />

            <NewHomesDetailsDesc />

            <NewHomesDetailsAvailability />

            {/* <PropertyDetailsGallery /> */}

            <PropertyDetailsMap
                lat={53.7401385}
                lng={-2.2464526}
            />

            <FeaturedProperties
                tag="property-details"
            />

            <PatternBanner
                tag="brown"
                title="start your journey"
                desc="Our team of estate agents are experienced, passionate and creative people who are well connected in their local community."
            />

            <div className="d-md-none">
                <FooterContactMobile />
            </div>
        </Layout>
    )
}

export default NewHomesDetail