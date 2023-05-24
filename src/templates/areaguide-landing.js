import React from "react";
import { graphql } from 'gatsby'
import { Container, Row, Col } from "react-bootstrap";
import loadable from "@loadable/component";
import Layout from "../components/layout";
import SEO from "../components/seo"

import AreaGuideImg1 from "../images/area_guide_img_1.png";
import AreaGuideImg2 from "../images/area_guide_img_2.png";
import AreaGuideImg3 from "../images/area_guide_img_3.png";
import AreaGuideImg4 from "../images/area_guide_img_4.png";
import AreaGuideImg5 from "../images/area_guide_img_5.png";
import AreaGuideImg6 from "../images/area_guide_img_6.png";
import AreaGuideImg7 from "../images/area_guide_img_7.png";
import AreaGuideImg8 from "../images/area_guide_img_8.png";

const InnerIntroModule = loadable(() => import("../components/InnerIntroModule/InnerIntroModule"));
const AreaGuideLanding = loadable(() => import("../components/AreaGuideLanding/AreaGuideLanding"));
const PatternBanner = loadable(() => import("../components/PatternBanner/PatternBanner"));

const AreaGuides = ({ data }, props) => {
    const PageData = data?.strapiPage
    const allNews = data?.allStrapiAreaGuide.edges
    return (
        <Layout>
            <div className="layout-padding-top"></div>

            <div className="inner-wrapper">
                <Container>
                    <Row>
                        <Col md={12}>
                            <h3 className="inner-intro-heading">{PageData?.title}</h3>
                        </Col>
                    </Row>

                    {PageData?.Add_Page_Modules?.length > 0 && PageData.Add_Page_Modules?.map((module, index) => {
                        return (
                            <>
                                {module.strapi_component === "page-modules.global-module" && module.select_module === "area_guide" && <AreaGuideLanding data={allNews} />}

                            </>
                        )
                    })}
                </Container>
            </div>

        </Layout>
    )
}


export const Head = ({ data }) => {
  const PageData = data?.strapiPage
  return (
    <SEO title={PageData?.seo?.metaTitle ? PageData?.seo?.metaTitle : PageData?.title} description={PageData?.seo?.metaDescription ? PageData?.seo?.metaDescription : PageData?.title} />
  )
}
export default AreaGuides


export const query = graphql`
query ($page_id: String) {
    strapiPage(id: {eq: $page_id}) {
        ...PageFragment
        Add_Page_Modules {
            ... on STRAPI__COMPONENT_PAGE_MODULES_GLOBAL_MODULE {
              ...GlobalModuleFragment
            }
            ... on STRAPI__COMPONENT_PAGE_MODULES_PLAIN_CONTENT {
              ...PlainContentFragment
            }
        }
    }
    allStrapiAreaGuide(filter: {publish: {eq: true}}) {
      edges {
        node {
          slug
          strapi_id
          title
          tile_image {
            alternativeText
            url
          }
        }
      }
    }
  }
`