import React from "react";
// import { Container, Row, Col } from "react-bootstrap";
import loadable from "@loadable/component";
import Layout from "../components/layout";

const Banner = loadable(() => import("../components/Banner/Banner"));
const OfficeDetailDesc = loadable(() => import("../components/OfficeDetailDesc/OfficeDetailDesc"));
const OfficeDetailSlider = loadable(() => import("../components/OfficeDetailSlider/OfficeDetailSlider"));
const PatternBanner = loadable(() => import("../components/PatternBanner/PatternBanner"));

const OfficeDetails = (props) => {
    return (
        <Layout>
            <div className="layout-padding-top"></div>

            {/* <Banner 
                tag="landing"
                officetag={"office-details"}
            /> */}

            <OfficeDetailDesc />

            <OfficeDetailSlider />

            <PatternBanner 
                tag = "brown"
                title = "start your journey"
                desc= "Our team of estate agents are experienced, passionate and creative people who are well connected in their local community."
            />
        </Layout>
    )
}

export default OfficeDetails