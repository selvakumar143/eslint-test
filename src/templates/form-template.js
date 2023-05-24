import React from "react";
import { graphql } from 'gatsby'
import SEO from "../components/seo"
import { Container, Row, Col } from "react-bootstrap";
import loadable from "@loadable/component";
import Layout from "../components/layout";
import ContactFormFields from "../../static/forms/contact_form.json";
import ValuationFormFields from "../../static/forms/instant_valuation_form.json";
import HomeVisitValuationFormFields from "../../static/forms/homevisit_valuation_form.json";
import BookAViewingFormFields from "../../static/forms/book_a_viewing_form.json";
import CareerFormFields from "../../static/forms/career_form.json";
import TeamContactFormFields from "../../static/forms/team_contact_form.json";
import { PageLinks } from "../common/site/page-static-links";

const BreadcrumbModule = loadable(() => import("../components/BreadcrumbModule/BreadcrumbModule"));
const ContactIntro = loadable(() => import("../components/ContactIntro/ContactIntro"));
const ContactDetail = loadable(() => import("../components/ContactDetail/ContactDetail"));
const DefaultForm = loadable(() => import("../components/forms/default-form-layout"))

const Contact = ({ data }, props) => {
    const PageData = data?.strapiPage
    const siteData = data?.strapiSiteConfig
    const name = typeof window !== 'undefined' && localStorage && localStorage.getItem('team_name') ? localStorage.getItem('team_name') : ''
    const email = typeof window !== 'undefined' && localStorage && localStorage.getItem('team_email') ? localStorage.getItem('team_email') : ''
    const pagemenu = PageData.choose_menu[0]?.slug

    
    const pid = typeof window !== 'undefined' && localStorage && localStorage.getItem('property_id') ? localStorage.getItem('property_id') : ''
    const prop_url = typeof window !== 'undefined' && localStorage && localStorage.getItem('property_pageurl') ? localStorage.getItem('property_pageurl') : ''
    const prop_address = typeof window !== 'undefined' && localStorage && localStorage.getItem('property_address') ? localStorage.getItem('property_address') : ''
    const prop_img_url = typeof window !== 'undefined' && localStorage && localStorage.getItem('property_image') ? localStorage.getItem('property_image') : ''
    const email_template_type = typeof pid == "undefined" ? "book_a_viewing_global" : "book_a_viewing"


    return (
        <Layout popularSearch={PageData?.select_popular_search?.title}>
            <div className="layout-padding-top"></div>

            <BreadcrumbModule subparentlabel={PageData.choose_menu[0]?.strapi_parent?.title} subparentlink={PageData.choose_menu[0]?.strapi_parent?.slug} parentlabel={PageData.choose_menu[0]?.strapi_parent?.strapi_parent?.title} parentlink={PageData.choose_menu[0]?.strapi_parent?.strapi_parent?.slug} title={PageData.title} tag="menu"/>

            <div className="contact-page-wrapper section-p">
                <Container>
                    <Row>
                        <Col xl={4}>
                            <ContactIntro {...PageData.banner} name={pagemenu === "contact-team" ? name : ''}/>

                            <ContactDetail />
                        </Col>
                        <Col xl={1}></Col>
                        <Col xl={7}>
                            {PageData?.Add_Page_Modules?.length > 0 && PageData.Add_Page_Modules?.map((module, index) => {
                                return (
                                    <>
                                        {module.strapi_component === "page-modules.global-module" && module.select_module === "contact_form" && <div className="contact-form-wrapper">
                                            <DefaultForm fields={ContactFormFields} classname="enquiry-form-wrapper" />
                                        </div>
                                        }
                                        {module.strapi_component === "page-modules.global-module" && module.select_module === "instant_valuation_form" && <DefaultForm fields={ValuationFormFields} classname="contact-form-wrapper" /> }
                                        {module.strapi_component === "page-modules.global-module" && module.select_module === "home_visit_valuation_form" && <DefaultForm fields={HomeVisitValuationFormFields} classname="contact-form-wrapper" /> }
                                        {module.strapi_component === "page-modules.global-module" && module.select_module === "book_a_viewing_form" && <DefaultForm fields={BookAViewingFormFields} prop_url={`${prop_url}`} prop_address={`${prop_address}`} prop_img_url={`${prop_img_url}`} email_template_type={`${email_template_type}`} classname="contact-form-wrapper" /> }
                                        {module.strapi_component === "page-modules.global-module" && module.select_module === "career_form" && <DefaultForm fields={CareerFormFields} classname="contact-form-wrapper" /> }
                                        {module.strapi_component === "page-modules.global-module" && module.select_module === "team_contact_form" && <DefaultForm fields={TeamContactFormFields} to_email_id={email ? email : ''} title={name ? name : ''} classname="contact-form-wrapper" /> }
                                    </>
                                )
                            })}

                        </Col>
                    </Row>
                </Container>
            </div>
        </Layout>
    )
}

export const Head = ({ data }) => {
    const PageData = data?.strapiPage  
    const siteData = data?.strapiSiteConfig
    var contact_path = '/' + PageLinks.contact + '/'
    var schema = false

    if(contact_path === (typeof window !== 'undefined' ? window.location.pathname : '')) {
        schema = true;
    }

    var ldJson = {
        "@context": "https://schema.org",
        "@type": "RealEstateAgent",
        "url": process.env.GATSBY_SITE_URL + '/' + PageLinks.contact + '/',
        "name": process.env.GATSBY_SITE_NAME,
        "logo": process.env.GATSBY_SITE_URL + `/images/logo.png`,
        "description": PageData?.seo?.metaDescription ? PageData?.seo?.metaDescription : PageData?.title,
        "address": {
            "@type": "PostalAddress",
            "address": siteData?.add_contact_details?.address,
        },
        "contactPoint": {
            "@type": "ContactPoint",
            "email": siteData?.add_contact_details?.email,
            "telephone": siteData?.add_contact_details?.phone,
        }
    };
    return (
        <SEO title={PageData?.seo?.metaTitle ? PageData?.seo?.metaTitle : PageData?.title} description={PageData?.seo?.metaDescription ? PageData?.seo?.metaDescription : PageData?.title} >
        {schema && <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(ldJson) }}
        />}
        </SEO>
    )
}
export default Contact


export const query = graphql`
query ($page_id: String) {
    strapiPage(id: {eq: $page_id}) {
        ...PageFragment
        Add_Page_Modules {
            ... on STRAPI__COMPONENT_PAGE_MODULES_GLOBAL_MODULE {
              ...GlobalModuleFragment
            }
        }
    }

    strapiSiteConfig {
        add_contact_details {
          phone
          email
          address
        }
      }
  }
`