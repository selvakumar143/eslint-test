import React from "react";
import { graphql } from 'gatsby'
import SEO from "../components/seo"
import loadable from "@loadable/component";
import Layout from "../components/layout";

import BannerImg from "../images/careers_banner_img.png";

const Banner = loadable(() => import("../components/Banner/Banner"));
const CareersIntro = loadable(() => import("../components/CareersIntro/CareersIntro"));
const TileBlock = loadable(() => import("../components/TileBlock/TileBlock"));
const TileBlockRight = loadable(() => import("../components/TileBlockRight/TileBlockRight"));
const CareersPosition = loadable(() => import("../components/CareersPosition/CareersPosition"));

const Careers = ({ data }, props) => {
    const PageData = data?.strapiPage
    const Jobs = data?.allStrapiCareer.edges
    return (
        <Layout popularSearch={PageData?.select_popular_search?.title}>

            <div className="layout-padding-top"></div>

            {PageData.banner && <Banner title={PageData.title} {...PageData.banner} id={PageData.strapi_id} />}

            {PageData?.Add_Page_Modules?.length > 0 && PageData.Add_Page_Modules?.map((module, index) => {
                return (
                    <>

                        {module.strapi_component === "page-modules.plain-content" && <CareersIntro headingTitle={PageData.title} content={module.content} />}

                        {module.strapi_component === "page-modules.image-and-content" && module.image_alignment === "left" && <TileBlock {...module} id={PageData.strapi_id} imagetransforms={PageData.imagetransforms} />}

                        {module.strapi_component === "page-modules.image-and-content" && module.image_alignment === "right" && <TileBlockRight  {...module} id={PageData.strapi_id} imagetransforms={PageData.imagetransforms} tag="careers-page" />}
                    </>
                )
            })}

            <CareersPosition data={Jobs} />
        </Layout>
    )
}


export const Head = ({ data }) => {
    const PageData = data?.strapiPage
    return (
        <SEO title={PageData?.seo?.metaTitle ? PageData?.seo?.metaTitle : PageData?.title} description={PageData?.seo?.metaDescription ? PageData?.seo?.metaDescription : PageData?.title} />
    )
}
export default Careers

export const query = graphql`
query ($page_id: String) {
    strapiPage(id: {eq: $page_id}) {
        ...PageFragment
        Add_Page_Modules {
            ... on STRAPI__COMPONENT_PAGE_MODULES_PLAIN_CONTENT {
              ...PlainContentFragment
            }
            ... on STRAPI__COMPONENT_PAGE_MODULES_IMAGE_AND_CONTENT {
              ...ImageAndContentFragment
            }
        }
    }
    
    allStrapiCareer(filter: {publish: {eq: true}}) {
        edges {
            node {
              ...CareerFragment
            }
        }
    }
  }
`