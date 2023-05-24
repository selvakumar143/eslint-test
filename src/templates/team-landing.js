import React from "react";
import { graphql } from 'gatsby'
import { Container } from "react-bootstrap";
import loadable from "@loadable/component";
import Layout from "../components/layout";
import SEO from "../components/seo"
const TeamLandingModule = loadable(() => import("../components/TeamLanding/TeamLanding"));


const PeopleLanding = ({ data }, props) => {
    const PageData = data?.strapiPage
    const team = data?.allStrapiTeam.edges
    return (
        <Layout popularSearch={PageData?.select_popular_search?.title}>
            <div className="layout-padding-top"></div>

            <div className="inner-wrapper">
                <Container>
                    <TeamLandingModule title={PageData.title} data={team} />
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

export default PeopleLanding


export const query = graphql`
query ($page_id: String) {
    strapiPage(id: {eq: $page_id}) {
        ...PageFragment
        Add_Page_Modules {
          ... on STRAPI__COMPONENT_PAGE_MODULES_GLOBAL_MODULE {
            ...GlobalModuleFragment
          }
          ... on STRAPI__COMPONENT_PAGE_MODULES_IMAGE_AND_CONTENT {
            ...ImageAndContentFragment
          }
          ... on STRAPI__COMPONENT_PAGE_MODULES_PLAIN_CONTENT {
            ...PlainContentFragment
          }
        }
    }
    allStrapiTeam(filter: {publish: {eq: true}}) {
        edges {
          node {
            ...TeamFragment
            slug
            category {
              strapi_json_value
            }
          }
        }
    }
  }
`