import React, { useEffect, useState } from "react";
import { Link, graphql, navigate, useStaticQuery } from "gatsby";
import './assets/styles/_index.scss';
import { getWhatsAppURL } from "../../common/site/config";
import { PageLinks } from "../../common/site/page-static-links";

const FooterContactMobile = (props) => {

    // Sticky scroll
    const [scroll, setScroll] = useState(false);

    useEffect(() => {
        window.addEventListener("scroll", () => {
            setScroll(window.scrollY > 750)
        })
    }, [])
    // Sticky scroll

    const { site } = useStaticQuery(
        graphql`
          query {
            site {
              siteMetadata {
                mailVars {
                  company_phone
                }
              }
            }
          }
        `
    )

    const company_phone = site?.siteMetadata?.mailVars?.company_phone
    const href = { href: `tel: ${company_phone}` }
    const wpHref = { href: getWhatsAppURL(company_phone), target: '_blank' }
    const url = typeof window !== 'undefined' ? window.location.href : ''
    return (
        <>
            {
                scroll ?
                <section className="footer-contact-mobile-wrapper">
                    {
                        props.tag === "career-detail" ?
                        <ul className="list-inline d-flex justify-content-between career-detail-footer-list">
                            <li className="list-inline-item">
                                <Link to={`/${PageLinks.job_apply}/`} className="button-sec button-sec-primary-filled">Apply for this job</Link>
                            </li>
                            <li className="list-inline-item">
                                <Link to={`/${PageLinks.contact}/`} className="button-sec button-sec-primary-outline-dark">Contact us</Link>
                            </li>
                        </ul>
                        :
                        <ul className="list-inline d-flex justify-content-between">
                            <li className="list-inline-item">
                                <a onClick={() => {navigate('/book-a-viewing/',localStorage.setItem('property_id', props.crm_id), localStorage.setItem('property_address', props.display_address), localStorage.setItem('property_pageurl', url), localStorage.setItem('property_image', props.propImg && props.propImg.length > 0 ? props.propImg[0] : ''))}} className="button d-flex align-items-center justify-content-center">Email</a>
                            </li>
                            <li className="list-inline-item">
                                <Link {...href} className="button d-flex align-items-center justify-content-center">Call</Link>
                            </li>
                            <li className="list-inline-item">
                                <Link {...wpHref} className="button d-flex align-items-center justify-content-center">Whatsapp</Link>
                            </li>
                        </ul>
                    }
                </section>
                : ""
            }
        </>
    )
}

export default FooterContactMobile