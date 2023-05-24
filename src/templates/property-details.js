import React from "react";
import loadable from "@loadable/component";
import Layout from "../components/layout";
import Seo from '../components/seo';
import sitelogoimage from "../images/logo.svg";
import { graphql } from "gatsby";

const PropertyHistoryBack = loadable(() => import("../components/PropertyHistoryBack/PropertyHistoryBack"));
const PropertyBannerModule = loadable(() => import("../components/PropertyBannerModule/PropertyBannerModule"));
const PropertyNavSticky = loadable(() => import("../components/PropertyNavSticky/PropertyNavSticky"));
const PropertyDescription = loadable(() => import("../components/PropertyDescription/PropertyDescription"));
const PropertyDetailsGallery = loadable(() => import("../components/PropertyDetailsGallery/PropertyDetailsGallery"));
const PropertyDetailsMap = loadable(() => import("../components/PropertyDetailsMap/PropertyDetailsMap"));
const FeaturedProperties = loadable(() => import("../components/FeaturedProperties/SimilarProperties"));
const PatternBanner = loadable(() => import("../components/PatternBanner/PatternBannerPropertyDetails"));
const FooterContactMobile = loadable(() => import("../components/FooterContactMobile/FooterContactMobile"));

const PropertyDetail = ({ data, children }) => {

    var imagename = "property.images.details";
    var galleryImageName = "property.images.results"

    let processedImages = JSON.stringify({});
    if (data?.strapiProperty.imagetransforms?.images_Transforms) {
        processedImages = data?.strapiProperty?.imagetransforms?.images_Transforms;
    }

    let propertyDetailImg = [];
    //if((data?.strapiProperty?.images).length > 0) {
    for (let i = 0; i < data?.strapiProperty?.images?.strapi_json_value.length; i++) {
        if (data.strapiProperty?.images?.strapi_json_value[i].url) {
            propertyDetailImg.push(data.strapiProperty?.images?.strapi_json_value[i].url);
        }
    }

    let floorPlanImg = [];
    for (let i = 0; i < data?.strapiProperty?.floorplan?.strapi_json_value.length; i++) {
        if (data.strapiProperty?.floorplan?.strapi_json_value[i].srcUrl) {
            floorPlanImg.push(data.strapiProperty?.floorplan?.strapi_json_value[i].srcUrl);
        }
    }
    //}
    // we could server resized version instead of original one to avoid load time
    //features = []
    //if(data.strapiProperty?.accommodation_summary?.strapi_json_value)
    let features = []//data.strapiProperty?.accommodation_summary?.strapi_json_value;


    return (
        <Layout layout={"sticky-module"} footertag={"footer-contact"} >
            <div className="layout-padding-top">
                <PropertyHistoryBack />
                <PropertyBannerModule {...data.strapiProperty} propImg={propertyDetailImg} processedImages={processedImages} imagename={imagename} crm_id={data?.strapiProperty?.crm_id} prop_id={data?.strapiProperty?.strapi_id} floorPlanImg={floorPlanImg} />
                <PropertyNavSticky {...data.strapiProperty} propImg={propertyDetailImg} floorPlanImg={floorPlanImg} />
                <PropertyDescription propImg={propertyDetailImg} processedImages={processedImages} imagename={imagename} features={features} {...data.strapiProperty} />
                <PropertyDetailsGallery {...data.strapiProperty} propImg={propertyDetailImg} processedImages={processedImages} imagename={galleryImageName} prop_id={data?.strapiProperty?.strapi_id}/>
                <PropertyDetailsMap
                    lat={data.strapiProperty?.latitude}
                    lng={data.strapiProperty?.longitude}
                />
                <FeaturedProperties prop_id={data?.strapiProperty?.strapi_id}
                    tag="property-details"
                />
                <PatternBanner
                    tag="brown"
                    title="start your journey"
                    desc="Our team of estate agents are experienced, passionate and creative people who are well connected in their local community."
                />
            </div>
            <div className="d-md-none">
                <FooterContactMobile {...data.strapiProperty}/>
            </div>
        </Layout>
    )
}

export const query = graphql`
  query ($strapi_id: Int) {
    strapiProperty(strapi_id: {eq: $strapi_id}) {
        title
        crm_id
        accommodation_summary {
            strapi_json_value
        }
        display_address
        latitude
        floorarea_min
        floorarea_type
        slug
        longitude
        search_type
        long_description{
            data {
                long_description
            }
        }
        price
        images {
            strapi_json_value {
                srcUrl
                url
            }
          }
        description {
            data {
              description
            }
        }
        building {
            strapi_json_value
        }
        bedroom
        bathroom
        selling_info {
            tenure {
              type
            }
        }
        imagetransforms {
            images_Transforms
        }
        price_qualifier
        epc {
            strapi_json_value {
              srcUrl
            }
        }
        floorplan {
            strapi_json_value {
              srcUrl
            }
        }
        office_mapping
        negotiator_mapping
        strapi_id
        video_tour {
            strapi_json_value {
              url
              caption
            }
        }
    }
  }
`

export const Head = (props) => {
    //seo title, h1 and desc prepare, this can send to utilis function later
    let desc_meta_ptype = props.data.strapiProperty?.building?.strapi_json_value.join(" and ")
    let desc_meta_seachtype = `for sale`
    if (props.data.strapiProperty?.building == "lettings") {
        desc_meta_seachtype = `to rent`
    }
    let desc_meta_beds = props.data.strapiProperty?.bedroom
    let desc_meta_address = props.data.strapiProperty?.display_address
    let desc_meta_price = `£` + new Intl.NumberFormat('en-UK').format(props.data.strapiProperty?.price)

    let pagetitle = `${desc_meta_ptype} ${desc_meta_seachtype} with ${desc_meta_beds} bedrooms in ${desc_meta_address} at ${desc_meta_price}`

    let pagemetadesc = `Know the details of ${desc_meta_ptype} ${desc_meta_seachtype} with ${desc_meta_beds} bedrooms in ${desc_meta_address} at ${desc_meta_price}. Book a viewing with ${process.env.GATSBY_SITE_NAME} to get assistance in finding the right ${desc_meta_ptype} for you.`

    let pageUrl = process.env.GATSBY_SITE_URL + (props?.location?.pathname).replace(/\/?$/, '/')
    let myimgtransforms = ''
    if (props.data.strapiProperty?.imagetransforms?.images_Transforms) {
        myimgtransforms = JSON.parse(props.data.strapiProperty?.imagetransforms?.images_Transforms);
    }
    let pageImg = sitelogoimage;
    if (myimgtransforms.length > 0 && Object.keys(myimgtransforms).length > 0) {
        // let mymetaimg = Object.values(myimgtransforms);
        let pageImg_filt = []
        for (const myimgtransform in myimgtransforms) {
            if (typeof myimgtransforms[myimgtransform]['webp'] !== "undefined") {
                pageImg_filt = Object.values(myimgtransforms[myimgtransform]['webp']);
                break;
            }
        }
        if (pageImg_filt.length > 0)
            pageImg = pageImg_filt[0]
    }

    var ldJson = {
        "@context": "https://schema.org",
        "@type": "Product",
        "name": props.data.strapiProperty?.slug.replace(/-/g, " "),
        "image": props.data.strapiProperty?.images?.strapi_json_value[0]?.url,
        "description": pagemetadesc,
        "brand": {
            "@type": "Organization",
            "name": process.env.GATSBY_SITE_NAME,
            "logo": process.env.GATSBY_SITE_URL + `/images/logo.png`
        },
        "offers": {
            "@type": "Offer",
            "url": pageUrl,
            "priceCurrency": "GBP",
            "price": props.data.strapiProperty?.price,
            "availability": "https://schema.org/InStock"
        }
    
    };

    return (
        <Seo title={pagetitle} description={pagemetadesc}>
            <meta name="image" content={pageImg} />
            <meta name="twitter:image" content={pageImg} />
            <meta name="og:url" content={pageUrl} />
            <meta name="twitter:url" content={pageUrl} />
            <link rel="canonical" href={pageUrl} />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(ldJson) }}
            />
        </Seo>
    )
}

export default PropertyDetail
