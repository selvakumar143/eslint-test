import React from "react";
import { Link, navigate, useStaticQuery, graphql } from "gatsby";
import { Container, Row, Col } from "react-bootstrap";
import PropertyBanner from "../PropertyBanner/PropertyBanner";
import './assets/styles/_index.scss';
import { getWhatsAppURL, Site_Vars } from "../../common/site/config";
import { useAllStrapiTeam } from "../../hooks/use-all-strapiteam";
import ImageModule from "../../modules/image-render";

const PropertyBannerModule = (props) => {

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

    var team_data = useAllStrapiTeam()
    team_data = team_data.allStrapiTeam.nodes
    let team_key;
    if (props?.negotiator_mapping != "") {
        for (let k in team_data) {
            if (props?.negotiator_mapping == team_data[k].property_team_mapping) {
                team_key = k;
                break;
            }
        }
    }

    return (
        <section className="property-banner-module-wrapper">
            <Container>
                <Row className="d-flex align-items-center">
                    <Col xl={7}>
                        <PropertyBanner {...props} />
                    </Col>
                    <Col xl={1}></Col>
                    <Col xl={4}>
                        {props?.display_address && <h1 className="property-address">{props?.display_address}</h1>}
                        {props.price_qualifier && props?.price && <div className="property-price">{props.price_qualifier || ''} {Site_Vars.default_currency}{props?.price.toLocaleString() || ''}</div>}
                        {props?.title && <div className="property-title">{props?.title}</div>}
                        <div className="property-btn d-md-block d-none">
                            <a className="button-sec button-sec-primary-outline" onClick={() => { navigate('/book-a-viewing/', localStorage.setItem('property_id', props.crm_id), localStorage.setItem('property_address', props.display_address), localStorage.setItem('property_pageurl', url), localStorage.setItem('property_image', props.propImg && props.propImg.length > 0 ? props.propImg[0] : '')) }}>Enquire now</a>
                        </div>
                        {company_phone && <div className="property-contact d-md-block d-none">or call <Link {...href}>{company_phone}</Link> or <Link {...wpHref}>Whatsapp</Link></div>}
                        {team_key >= 0 &&
                            <div className="property-nego-wrapper d-flex align-items-center">
                                <div className="property-nego-img ">
                                    <div className="gatsby-image-wrapper">
                                        {/* <StaticImage src="../../images/property_detail_nego_img.png" layout="fullWidth" placeholder="blurred" formats={["webp"]} alt="banner" quality="90" className="img-fluid" /> */}
                                        <ImageModule
                                            ImageSrc={team_data[team_key]?.image}
                                            altText={`negotiator_image`}
                                            imagetransforms={team_data[team_key]?.imagetransforms?.imagetransforms}
                                            imagename={`team.image.propdetails_image`}
                                            renderer=""
                                            strapi_id={team_data[team_key]?.strapi_id}
                                            classNames="img-fluid rounded-circle"
                                        />
                                    </div>
                                </div>
                                <p className="property-nego-text">{`Speak with ${team_data[team_key].name} on `}<br /><a href={`tel:44${team_data[team_key].phone}`}>{team_data[team_key].phone}</a> or <Link to={`/`}>Email</Link> or <Link to={`https://wa.me/44${team_data[team_key].phone}?text=Hi`}>WhatsApp</Link></p>
                            </div>
                        }
                    </Col>
                </Row>
            </Container>
        </section>
    )
}

export default PropertyBannerModule