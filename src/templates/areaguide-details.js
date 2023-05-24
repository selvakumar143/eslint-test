import React from "react";
import { graphql } from 'gatsby'
import loadable from "@loadable/component";
import Layout from "../components/layout";
import { PageLinks } from "../common/site/page-static-links";
import Seo from "../components/seo"

import AreaGuideBannerImg from "../images/area_guide_detail_banner_img.png";
import AreaGuideDetailImg1 from "../images/area_guide_detail_img_1.png";
import AreaGuideDetailImg2 from "../images/area_guide_detail_img_2.png";
import AreaGuideDetailImg3 from "../images/area_guide_detail_img_3.png";

const BreadcrumbModule = loadable(() => import("../components/BreadcrumbModule/BreadcrumbModule"));
const AreaGuideDetailsBanner = loadable(() => import("../components/AreaGuideDetailsBanner/AreaGuideDetailsBanner"));
const AreaGuideDetailDesc = loadable(() => import("../components/AreaGuideDetailDesc/AreaGuideDetailDesc"));
const PropertyDetailsMap = loadable(() => import("../components/PropertyDetailsMap/PropertyDetailsMap"));
const FeaturedProperties = loadable(() => import("../components/FeaturedProperties/AreaGuideProperties"));
const PatternBanner = loadable(() => import("../components/PatternBanner/PatternBannerPropertyDetails"));

const AreaGuidesDetail = ({ data }, props) => {
    const PageData = data?.strapiAreaGuide

    let breadcrumData;

    if (PageLinks?.areaguide_parent_label) {
        breadcrumData = { parentlabel: PageLinks.areaguide_parent_label, parentlink: PageLinks.areaguide_parent, subparentlabel: PageLinks.areaguide_label, subparentlink: PageLinks.areaguide, title: PageData.title }
    } else {
        breadcrumData = { parentlabel: PageLinks.areaguide_label, parentlink: PageLinks.areaguide, title: PageData.title }
    }

    return (
        <Layout>
            <div className="layout-padding-top"></div>

            <BreadcrumbModule {...breadcrumData} />

            <AreaGuideDetailsBanner title={PageData.title} banner_title={`${PageData.title} Area Guide`} image={PageData.banner_image} banner_content={PageData.banner_content} id={PageData.strapi_id} imagetransforms={PageData.imagetransforms?.banner_section_banner_image_Transforms} page="areaguide" />

            <AreaGuideDetailDesc {...PageData} />

            {PageData.latitude && PageData.longitude && <PropertyDetailsMap
                lat={PageData.latitude}
                lng={PageData.longitude}
            />}

            <FeaturedProperties tag="landing-page" areaname={PageData.title} />

            <PatternBanner
                tag="brown"
                title="start your journey"
                desc="Our team of estate agents are experienced, passionate and creative people who are well connected in their local community."
            />
        </Layout>
    )
}

export const Head = ({ data }) => {
    const PageData = data?.strapiAreaGuide  
    return (
        <Seo title={PageData.title} description={PageData.title} />
    )
}

export default AreaGuidesDetail


export const query = graphql`
query ($page_id: Int) {
    strapiAreaGuide(strapi_id: {eq: $page_id}) {
        ...AreaGuideFragment
        banner_content {
            data {
            banner_content
            }
        }
        banner_image {
          alternativeText
          url
        }
        latitude
        longitude
        add_content {
            ... on STRAPI__COMPONENT_PAGE_MODULES_PLAIN_CONTENT {
                ...PlainContentFragment
            }
            ... on STRAPI__COMPONENT_PAGE_MODULES_IMAGE {
                ...ImageFragment
            }
        }
    }
    
  }
`