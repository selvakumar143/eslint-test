import React, { useEffect, useState } from "react";
import { graphql } from 'gatsby'
import Seo from "../components/seo"
import { Container, Row, Col } from "react-bootstrap";
import loadable from "@loadable/component";
import Layout from "../components/layout";
import { PageLinks } from "../common/site/page-static-links";

const BreadcrumbModule = loadable(() => import("../components/BreadcrumbModule/BreadcrumbModule"));
const CareerDetailIntro = loadable(() => import("../components/CareerDetailIntro/CareerDetailIntro"));
const CareerDetailDesc = loadable(() => import("../components/CareerDetailDesc/CareerDetailDesc"));
const CareerDetailSidebar = loadable(() => import("../components/CareerDetailSidebar/CareerDetailSidebar"));
const FooterContactMobile = loadable(() => import("../components/FooterContactMobile/FooterContactMobile"));

const CareerDetail = ({ data }, props) => {
    const PageData = data?.strapiCareer

    // Sticky scroll
    const [scroll, setScroll] = useState(false)

    useEffect(() => {
        window.addEventListener("scroll", () => {
            setScroll(window.scrollY > 80)
        })
    }, [])
    // Sticky scroll

    return (
        <Layout
            footertag={"career-contact"}
        >
            <div className="layout-padding-top"></div>

            <BreadcrumbModule parentlabel={PageLinks.about_label} parentlink={PageLinks.about} subparentlabel={PageLinks.career_label} subparentlink={PageLinks.career} title={PageData.title} />

            <div className="career-detail-wrapper">
                <Container>
                    <Row>
                        <Col xl={8}>
                            <CareerDetailIntro {...PageData} />

                            <CareerDetailDesc {...PageData} />
                        </Col>

                        <Col xl={1}></Col>

                        <Col xl={3} className="d-xl-block d-none">
                            <div className={`career-sidebar position-sticky ${scroll ? "scrolled" : ""}`}>
                                <CareerDetailSidebar />
                            </div>
                        </Col>
                    </Row>
                </Container>
            </div>

            <div className="d-xl-none">
                <FooterContactMobile
                    tag="career-detail"
                />
            </div>
        </Layout>
    )
}

export const Head = ({ data }) => {
    const PageData = data?.strapiCareer
    const metaDescription = `Join our dynamic team as a ${PageData.title} at ${process.env.GATSBY_SITE_NAME}. Take the first step towards a rewarding real estate career with our established agency. Apply now!`

    return (
        <Seo title={PageData.title} description={metaDescription} />
    )
}
export default CareerDetail


export const query = graphql`
query ($page_id: Int) {
    strapiCareer(strapi_id: {eq: $page_id}) {
      ...CareerFragment
        job_details {
          data {
            job_details
          }
        }
        image {
          alternativeText
          url
        }
        imagetransforms {
          image_Transforms
        }
    }
  }
`