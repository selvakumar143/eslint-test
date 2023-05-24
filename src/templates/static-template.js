import React from "react";
import { graphql } from 'gatsby'
import SEO from "../components/seo"
import loadable from "@loadable/component";
import Layout from "../components/layout";

const BreadcrumbModule = loadable(() => import("../components/BreadcrumbModule/BreadcrumbModule"));
const StaticDetailIntro = loadable(() => import("../components/StaticDetailIntro/StaticDetailIntro"));
const StaticDetailDesc = loadable(() => import("../components/StaticDetailDesc/StaticContent"));
const { ContentModule } = require("@starberry/gatsby-theme-utils/Modules/ContentModule")

const StaticDetail = ({ data }, props) => {
    const PageData = data?.strapiPage
    return (
        <Layout popularSearch={PageData?.select_popular_search?.title}>
            <div className="layout-padding-top"></div>

            {/* <BreadcrumbModule /> */}

            <StaticDetailIntro tag="static" title={PageData?.title} />

            {PageData?.Add_Page_Modules?.length > 0 && PageData.Add_Page_Modules?.map((module, index) => {
                return (
                    <>
                        {module.strapi_component === "page-modules.plain-content" && <StaticDetailDesc {...module} pagename={PageData.title} tag="static"/>}
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

export default StaticDetail


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
  }
`