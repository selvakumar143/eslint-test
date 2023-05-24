import React from "react";
import { graphql } from 'gatsby'
import SEO from "../components/seo"
import { Container } from "react-bootstrap";
import loadable from "@loadable/component";
import Layout from "../components/layout";

import BannerImg from "../images/review_banner_img.png";

const Banner = loadable(() => import("../components/Banner/Banner"));
const ReviewsSlider = loadable(() => import("../components/ReviewsSlider/ReviewsSlider"));
const PatternBanner = loadable(() => import("../components/PatternBanner/PatternBanner"));

const Reviews = ({ data }, props) => {
    const PageData = data?.strapiPage
    return (
        <Layout popularSearch={PageData?.select_popular_search?.title}>

            <div className="layout-padding-top"></div>

            {PageData.banner && <Banner title={PageData.title} {...PageData.banner} id={PageData.strapi_id} />}


            {PageData?.Add_Page_Modules?.length > 0 && PageData.Add_Page_Modules?.map((module, index) => {
                return (
                    <>
                        {module.strapi_component === "page-modules.video-review" && <ReviewsSlider /> }

                        {module.strapi_component === "page-modules.text-module" && <PatternBanner
                            tag={module.layout === "background_secondary_color" ? "blue" : module.layout === "background_primary_color" ? "brown" : ''}
                            {...module}
                        />}
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

export default Reviews



export const query = graphql`
query ($page_id: String) {
    strapiPage(id: {eq: $page_id}) {
        ...PageFragment
        Add_Page_Modules {
            ... on STRAPI__COMPONENT_PAGE_MODULES_GLOBAL_MODULE {
              ...GlobalModuleFragment
            }
            ... on STRAPI__COMPONENT_PAGE_MODULES_VIDEO_REVIEW {
              ...VideoReviewFragment
            }
            ... on STRAPI__COMPONENT_PAGE_MODULES_TEXT_MODULE {
              ...TextModuleFragment
            }
        }
    }
  }
`