import React, { useEffect, useState } from "react";
import { graphql } from 'gatsby'
import { Container, Row, Col } from "react-bootstrap";
import loadable from "@loadable/component";
import Seo from "../components/seo"
import Layout from "../components/layout";
import { PageLinks } from "../common/site/page-static-links";

const BreadcrumbModule = loadable(() => import("../components/BreadcrumbModule/BreadcrumbModule"));
const PeopleDetailIntro = loadable(() => import("../components/PeopleDetailIntro/PeopleDetailIntro"));
const PeopleDetailDesc = loadable(() => import("../components/PeopleDetailDesc/PeopleDetailDesc"));
const PeopleDetailSidebar = loadable(() => import("../components/PeopleDetailSidebar/PeopleDetailSidebar"));

const PeopleDetail = ({ data }, props) => {
    const PageData = data?.strapiTeam

    // Sticky scroll
    const [scroll, setScroll] = useState(false)

    useEffect(() => {
        window.addEventListener("scroll", () => {
            setScroll(window.scrollY > 80)
        })
    },[])
    // Sticky scroll

    
    let breadcrumData;

    if (PageLinks?.team_parent_label) {
        breadcrumData = { parentlabel: PageLinks.team_parent_label, parentlink: PageLinks.team_parent, subparentlabel: PageLinks.team_label, subparentlink: PageLinks.team, title: PageData.name }
    } else {
        breadcrumData = { parentlabel: PageLinks.team_label, parentlink: PageLinks.team, title: PageData.name }
    }

    return (
        <Layout>
            <div className="layout-padding-top"></div>

            <BreadcrumbModule {...breadcrumData} />

            <div className="people-detail-wrapper">
                <Container>
                    <Row>
                        <Col xl={8} className="order-xl-1 order-2">
                            <PeopleDetailIntro {...PageData} />

                            <PeopleDetailDesc {...PageData} />
                        </Col>
                        <Col xl={1} className="order-xl-2"></Col>
                        <Col xl={3} className="order-xl-3 order-1">
                            <div className={`people-sidebar position-sticky ${scroll ? "scrolled" : ""}`}>
                                <PeopleDetailSidebar {...PageData}/>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </div>
        </Layout>
    )
}

export default PeopleDetail

export const Head = ({ data }) => {
  const PageData = data?.strapiTeam
  return (
    <Seo title={`${PageData.name} ${PageData.designation ? ' | '+PageData.designation : ''}`} description={`Get to know about ${PageData.title} here. Contact one of our estate agents for assistance in finding the right property for you.`} />
  )
}

export const query = graphql`
query ($page_id: Int) {
    strapiTeam(strapi_id: {eq: $page_id}) {
      ...TeamFragment
        content {
          data {
            content
          }
        }
    }
  }
`