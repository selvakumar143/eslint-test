import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import ScrollAnimation from 'react-animate-on-scroll';
import { graphql } from 'gatsby'
import SEO from "../components/seo"
import loadable from "@loadable/component";
import Layout from "../components/layout";

import ValuationImg_1 from "../images/valuation_img_1.png";
import ValuationImg_2 from "../images/valuation_img_2.png";

const ValuationCard = loadable(() => import("../components/ValuationCard/ValuationCard"));

const ValuationLanding = ({ data }, props) => {
    const PageData = data?.strapiPage
    return (
        <Layout popularSearch={PageData?.select_popular_search?.title}>

            <div className="layout-padding-top"></div>
            {PageData?.Add_Page_Modules?.length > 0 && PageData.Add_Page_Modules?.map((module, index) => {
                return (
                    <>
                        {module.strapi_component === "page-modules.valuation-module" &&

                            <div className="valuation-wrapper">
                                <Container>
                                    <Row className="d-flex justify-content-center">
                                        <Col xl={8}>
                                            <div className="valuation-card-wrapper-main">
                                                {module.add_details && module.add_details.map((item, index) => {
                                                    return (
                                                        <ScrollAnimation animateIn="animate__slideInUp" delay={index * 100} animateOnce offset={50}>
                                                            <ValuationCard
                                                                {...item} id={PageData.strapi_id} imagetransforms={PageData.imagetransforms}
                                                                img={ValuationImg_1}
                                                                text={item.title}
                                                            />
                                                        </ScrollAnimation>
                                                    )
                                                }
                                                )}
                                            </div>
                                        </Col>
                                    </Row>
                                </Container>
                            </div>
                        }
                    </>
                )
            })}
        </Layout>
    )
}

export const Head = ({ data }) => {
    const PageData = data?.strapiPage
    return (
        <SEO title={PageData?.seo?.metaTitle ? PageData?.seo?.metaTitle : PageData?.title} description={PageData?.seo?.metaDescription ? PageData?.seo?.metaDescription : PageData?.title} />
    )
}

export default ValuationLanding

export const query = graphql`
query ($page_id: String) {
    strapiPage(id: {eq: $page_id}) {
        ...PageFragment
        Add_Page_Modules {
            ... on STRAPI__COMPONENT_PAGE_MODULES_VALUATION_MODULE {
              ...ValuationModuleFragment
            }
            ... on STRAPI__COMPONENT_PAGE_MODULES_PLAIN_CONTENT {
              ...PlainContentFragment
            }
        }
    }
  }
`