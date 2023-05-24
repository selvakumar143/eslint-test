import React from "react";
import { graphql } from 'gatsby'
import { Container } from "react-bootstrap";
import loadable from "@loadable/component";
import Layout from "../components/layout";
import SEO from "../components/seo"
const NewsLandingModule = loadable(() => import("../components/NewsLanding/NewsLanding"));

const NewsLanding = ({ data }, props) => {
    const PageData = data?.strapiPage
    const allNews = data?.allStrapiBlog.edges
    return (
        <Layout popularSearch={PageData?.select_popular_search?.title}>
            <div className="layout-padding-top"></div>

            <div className="inner-wrapper">
                <Container>
                    <NewsLandingModule title={PageData.title} data={allNews} />
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

export default NewsLanding



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
    allStrapiBlog(filter: {publish: {eq: true}}, sort: {fields: date, order: DESC}) {
        edges {
          node {
            date(formatString: "DD MMM, yyyy")
            title
            slug
            strapi_id
            tile_image {
              alternativeText
              url
            }
            category {
                strapi_json_value
            }
            imagetransforms {
              tile_image_Transforms
            }
          }
        }
    }
  }
`