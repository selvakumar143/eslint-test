import React from "react";
import { graphql } from 'gatsby'
import loadable from "@loadable/component";
import Layout from "../components/layout";
import SEO from "../components/seo";
import { PageLinks } from "../common/site/page-static-links";
import ReviewImg from "../images/landing_review_img.png";

const Banner = loadable(() => import("../components/Banner/Banner"));
const LandingIntroModule = loadable(() => import("../components/LandingIntroModule/LandingIntroModule"));
const TileBlockReview = loadable(() => import("../components/TileBlockReview/TileBlockReview"));
const FeaturedProperties = loadable(() => import("../components/FeaturedProperties/FeaturedProperties"));
const TileBlock = loadable(() => import("../components/TileBlock/TileBlock"));
const TileBlockRight = loadable(() => import("../components/TileBlockRight/TileBlockRight"));
const PatternBanner = loadable(() => import("../components/PatternBanner/PatternBanner"));

const LandingPage = ({ data }, props) => {
  const PageData = data?.strapiPage
  return (
    <Layout popularSearch={PageData?.select_popular_search?.title}>

      <div className="layout-padding-top"></div>
      <Banner tag="landing" title={PageData.title} {...PageData.banner} id={PageData.strapi_id} imagetransforms={PageData.imagetransforms?.banner_section_banner_image_Transforms} />


      {PageData?.Add_Page_Modules?.length > 0 && PageData.Add_Page_Modules?.map((module, index) => {
        return (
          <>
            {module.strapi_component === "page-modules.text-module" && module.layout !== "default" ? <PatternBanner
              tag={module.layout === "background_secondary_color" ? "blue" : module.layout === "background_primary_color" ? "brown" : ''}
              {...module}
            /> : module.strapi_component === "page-modules.text-module" && module.layout === "default" ? <LandingIntroModule {...module} /> : ''}

            {module.strapi_component === "page-modules.image-and-content" && module.background_color_transparent && module.image_alignment === "left" && <TileBlock {...module} id={PageData.strapi_id} imagetransforms={PageData.imagetransforms} />}

            {module.strapi_component === "page-modules.image-and-content" && module.background_color_transparent && module.image_alignment === "right" && <TileBlockRight  {...module} id={PageData.strapi_id} imagetransforms={PageData.imagetransforms} />}

            {module.strapi_component === "page-modules.global-module" && module.select_module === "google_reviews_slider" && <TileBlockReview
              reviewtext={"“Imagine if the clothing company Boden diversified into property sales - you'd expect colourful scatter cushions and a chocolate labrador dozing by a fire. That's the welcoming look radiated by Mr and Mrs Clarke. <br /><br />I hadn’t imagined I would be recommending an estate agency. Mr and Mrs Clarke changed my preconceptions. Their whole approach was refreshing and their attention to detail was incredible.”"}
              reviewauthor={"Grace, Brighton"}
              reviewImg={ReviewImg}
              tag={"landing-page"}
            />}


            {module.strapi_component === "page-modules.global-module" && (module.select_module === "featured_properties" || module.select_module === "featured_properties_sales") && <FeaturedProperties tag="landing-page" />}

          </>
        )
      })}
    </Layout>
  )
}

export const Head = ({ data }, props) => {
  const PageData = data?.strapiPage
  var about_path = '/' + PageLinks.about + '/'
  var schema = false
  if (about_path === (typeof window !== 'undefined' ? window.location.pathname : '')) {
    schema = true
  }
  var ldJson = {
    "@context": "https://schema.org",
    "@type": "RealEstateAgent",
    "url": process.env.GATSBY_SITE_URL + '/' + PageLinks.about + '/',
    "name": process.env.GATSBY_SITE_NAME,
    "image": PageData.banner?.image?.url,
    "logo": process.env.GATSBY_SITE_URL + `/images/logo.png`
  };

  return (
    <SEO title={PageData?.seo?.metaTitle ? PageData?.seo?.metaTitle : PageData?.title} description={PageData?.seo?.metaDescription ? PageData?.seo?.metaDescription : PageData?.title}>
      {schema &&
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(ldJson) }}
        />
      }
    </SEO>
  )
}

export default LandingPage




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
            ... on STRAPI__COMPONENT_PAGE_MODULES_TEXT_MODULE {
              ...TextModuleFragment
            }
        }
    }
  }
`