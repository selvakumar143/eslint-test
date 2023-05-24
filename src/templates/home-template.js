import React, { useEffect, useState } from "react";
import { graphql } from 'gatsby'
import loadable from "@loadable/component";
import Layout from "../components/layout";
import SEO from "../components/seo";

// import ReviewImg from "../images/review.png";
import Banner from "../components/Banner/HomeBanner";
import TileBlockReview from "../components/TileBlockReview/TileBlockReview";

const FeaturedProperties = loadable(() => import("../components/FeaturedProperties/FeaturedProperties"));
const PatternBanner = loadable(() => import("../components/PatternBanner/PatternBanner"));
const TileBlock = loadable(() => import("../components/TileBlock/TileBlock"));
const TileBlockRight = loadable(() => import("../components/TileBlockRight/TileBlockRight"));
const FeaturedSlider = loadable(() => import("../components/FeaturedSlider/FeaturedSlider"));

const HomePageTemplate = ({ data }, props) => {
    const PageData = data?.strapiPage
    const siteData = data?.strapiSiteConfig
    const [renderComponent, setRenderComponent] = useState(false);
    useEffect(() => {
        window.addEventListener("mousemove", () => {
            if (renderComponent === false) {
                setRenderComponent(true)
            }
        })
        window.addEventListener("touchmove", () => {
            if (renderComponent === false) {
                setRenderComponent(true)
            }
        })
        window.addEventListener("keypress", () => {
            if (renderComponent === false) {
                setRenderComponent(true)
            }
        })

    }, [])


    return (
        <Layout popularSearch={PageData?.select_popular_search?.title}>
            <div className="layout-padding-top"></div>

            {PageData.banner && <Banner title={PageData.title} {...PageData.banner} id={PageData.strapi_id} />}


            {PageData?.Add_Page_Modules?.length > 0 && PageData.Add_Page_Modules?.map((module, index) => {
                return (
                    <>
                        {module.strapi_component === "page-modules.text-module" && <PatternBanner
                            tag={module.layout === "background_secondary_color" ? "blue" : module.layout === "background_primary_color" ? "brown" : ''}
                            {...module}
                        />}

                        {module.strapi_component === "page-modules.image-and-content" && module.background_color_transparent && module.image_alignment === "left" && <TileBlock {...module} id={PageData.strapi_id} imagetransforms={PageData.imagetransforms} />}

                        {module.strapi_component === "page-modules.image-and-content" && module.background_color_transparent && module.image_alignment === "right" && <TileBlockRight  {...module} id={PageData.strapi_id} imagetransforms={PageData.imagetransforms} />}

                        {module.strapi_component === "page-modules.global-module" && (module.select_module === "featured_properties" || module.select_module === "featured_properties_sales") && renderComponent && <FeaturedProperties />}

                        {module.strapi_component === "page-modules.global-module" && module.select_module === "latest_news_slider" && <FeaturedSlider />}

                        {module.strapi_component === "page-modules.global-module" && module.select_module === "google_reviews_slider" && <TileBlockReview
                            reviewtext={"“Imagine if the clothing company Boden diversified into property sales - you'd expect colourful scatter cushions and a chocolate labrador dozing by a fire. That's the welcoming look radiated by Mr and Mrs Clarke.”"}
                            reviewauthor={"Aaron grey, seller"}
                            // reviewImg={ReviewImg}
                            tag="home-page"
                        />}
                    </>
                )
            })}

        </Layout>
    )
}


export const Head = ({ data }, props) => {
    const PageData = data?.strapiPage
    const siteData = data?.strapiSiteConfig
  
    var schemaSameAs = ''
    if (siteData?.facebook_link.length > 1) {
      schemaSameAs = siteData?.facebook_link + ','
    }
    if (siteData?.twitter_link.length > 1) {
      schemaSameAs += siteData?.twitter_link + ','
    }
    if (siteData?.instagram_link.length > 1) {
      schemaSameAs += siteData?.instagram_link + ','
    }
    if (siteData?.linkedin_link.length > 1) {
      schemaSameAs += siteData?.linkedin_link + ','
    }
  
    var ldJson = {
      "@context": "https://schema.org",
      "@type": "Organization",
      "url": process.env.GATSBY_SITE_URL,
      "name": process.env.GATSBY_SITE_NAME,
      "alternateName": process.env.GATSBY_SITE_NAME,
      "logo": process.env.GATSBY_SITE_URL + `/images/logo.png`,
      "contactPoint": {
        "@type": "ContactPoint",
        "telephone": siteData?.mobile_device_phone,
        "areaServed": process.env.GATSBY_DEFAULT_AREA,
        "contactType": "Sales"
      },
      "sameAs": schemaSameAs.replace(/,\s*$/, "").split(',')
    };
  
    return (
      <SEO title={PageData?.seo?.metaTitle ? PageData?.seo?.metaTitle : PageData?.title} description={PageData?.seo?.metaDescription ? PageData?.seo?.metaDescription : PageData?.title}>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(ldJson) }}
        />
      </SEO>
    )
  }
  
export default HomePageTemplate



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

    
    strapiSiteConfig {
        twitter_link
        instagram_link
        linkedin_link
        facebook_link
        add_contact_details {
          phone
        }
      }
  }
`