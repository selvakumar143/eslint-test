import React from "react";
import { graphql } from 'gatsby'
import loadable from "@loadable/component";
import Layout from "../components/layout";
import Seo from "../components/seo"
import { PageLinks } from "../common/site/page-static-links";

const BreadcrumbModule = loadable(() => import("../components/BreadcrumbModule/BreadcrumbModule"));
const StaticDetailIntro = loadable(() => import("../components/StaticDetailIntro/StaticDetailIntro"));
const StaticDetailDesc = loadable(() => import("../components/StaticDetailDesc/StaticDetailDesc"));
const FeaturedSlider = loadable(() => import("../components/FeaturedSlider/FeaturedSlider"));

const NewsDetail = ({ data }, props) => {
    const PageData = data?.strapiBlog
    const MoreNews = data?.allStrapiBlog.edges

    let breadcrumData;

    if (PageLinks?.news_parent_label) {
        breadcrumData = { parentlabel: PageLinks.news_parent_label, parentlink: PageLinks.news_parent, subparentlabel: PageLinks.news_label, subparentlink: PageLinks.news, title: PageData.title }
    } else {
        breadcrumData = { parentlabel: PageLinks.news_label, parentlink: PageLinks.news, title: PageData.title }
    }

    return (
        <Layout>
            <div className="layout-padding-top"></div>

            <BreadcrumbModule {...breadcrumData} />

            <StaticDetailIntro {...PageData} />

            <StaticDetailDesc {...PageData} />

            <FeaturedSlider data={MoreNews} tag="details" />
        </Layout>
    )
}

export const Head = ({ data }) => {
    const PageData = data?.strapiBlog
    var ldJson = {
        "@context": "https://schema.org",
        "@type": "NewsArticle",
        "mainEntityOfPage": {
            "@type": "WebPage",
            "@id": typeof window !== 'undefined' ? window.location.href : ''
        },
        "headline": PageData?.title,
        "image": PageData?.banner_image ? PageData?.banner_image?.url : '', 
        "datePublished": PageData?.publishedAt,
        "dateModified": PageData?.updatedAt,
        "author": {
            "@type": "Person",
            "name": PageData.author ? PageData.author?.title : process.env.GATSBY_SITE_NAME
        },
      
        "publisher": {
            "@type": "Organization",
            "name": process.env.GATSBY_SITE_NAME,
            "logo": {
                "@type": "ImageObject",
                "url": process.env.GATSBY_SITE_URL + `/images/logo.png`
            }
        },
        "description": `Read about ${PageData.title} here and subscribe to our newsletter to stay up-to-date about everything going on at ${process.env.GATSBY_SITE_NAME}.`
    }

    return (
        <Seo title={PageData.title} description={`Read about ${PageData.title} here and subscribe to our newsletter to stay up-to-date about everything going on at ${process.env.GATSBY_SITE_NAME}.`}>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(ldJson) }}
            />
        </Seo>
    )
}
export default NewsDetail

export const query = graphql`
query ($page_id: Int) {
    strapiBlog(strapi_id: {eq: $page_id}) {
        ...BlogFragment
        banner_image {
          alternativeText
          url
        }
        author {
          slug
          name
          strapi_id
          imagetransforms {
            image_Transforms
          }
          image {
            alternativeText
            url
          }
        }
        add_blog_content {
            ... on STRAPI__COMPONENT_PAGE_MODULES_PLAIN_CONTENT {
                ...PlainContentFragment
            }
            ... on STRAPI__COMPONENT_PAGE_MODULES_IMAGE {
                ...ImageFragment
            }
        }
    }
    
    allStrapiBlog(filter: {strapi_id: {ne: $page_id}}) {
        edges {
            node {
                ...BlogFragment
                tile_image {
                    alternativeText
                    url
                }
            }
        }
    }
  }
`