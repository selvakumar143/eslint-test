import React, { useState } from "react";
import { Link } from "gatsby";
import { useStaticQuery, graphql } from "gatsby"
import { Navbar, Container, Offcanvas } from "react-bootstrap";
import useHasScrolled from "../../hooks/useHasScrolled";
import HeaderLogo from "../HeaderLogo/HeaderLogo";
import HeaderMenu from "../HeaderMenu/HeaderMenu";
import BurgerMenu from "../BurgerMenu/BurgerMenu";
import LogoImg from "../../images/logo.svg";
import { PageLinks } from "../../common/site/page-static-links";
import './assets/styles/_index.scss';

const Header = (props) => {

    // Scroll
    const scrolled = useHasScrolled()
    // Scroll

    // Burger Menu
    const [showBurger, setShowBurger] = useState(false);
    const handleCloseBurger = () => setShowBurger(false);
    const handleShowBurger = () => setShowBurger(true); 
    // Burger Menu

    
    const data = useStaticQuery(graphql`
        query {
            strapiSiteConfig {
                add_contact_details {
                  phone
                }
            }
        }
    `);

    const phone = data.strapiSiteConfig.add_contact_details?.phone;

    return (
        <>
            <header className={`header ${scrolled ? "header-scrolled" : ""} ${props.layout}`}>
                <Navbar bg="" expand="lg" fixed="top">
                    <Container fluid>
                        <HeaderLogo />

                        <HeaderMenu />
                        
                        <div className="d-lg-none ms-auto contact-wrapper">
                            <ul className="list-inline d-flex align-items-center">
                                <li className="list-inline-item d-md-flex d-none">
                                    <Link to={`/${PageLinks.valuation}/`} aria-label="valuation" ><span>Valuation</span></Link>
                                </li>
                                <li className="list-inline-item">
                                    <Link to={`/${PageLinks.results_sales}/`} aria-label="search" ><i className="icon icon-search"></i></Link>
                                </li>
                                <li className="list-inline-item">
                                    <a href={`tel:${phone}`} aria-label="phone"><i className="icon icon-phone"></i></a>
                                </li>
                                <li className="list-inline-item">
                                    <button onClick={handleShowBurger} role="button" aria-label="open"><i className="icon icon-burger-menu"></i></button>
                                </li>
                            </ul>
                        </div>
                    </Container>
                </Navbar>
            </header>
            <Offcanvas show={showBurger} onHide={handleCloseBurger} placement="top" className="burger-menu-wrapper">
                <Offcanvas.Header closeButton>
                    <img src={LogoImg} alt="" className="logo-img" />
                </Offcanvas.Header>
                <Offcanvas.Body>
                    <BurgerMenu />
                </Offcanvas.Body>
            </Offcanvas>
        </>
    )
}

export default Header