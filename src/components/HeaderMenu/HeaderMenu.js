import React from "react";
import { useStaticQuery, graphql, Link } from "gatsby"
import { Nav, Navbar } from "react-bootstrap";
import './assets/styles/_index.scss';
import { PageLinks } from "../../common/site/page-static-links";
const { CTALink } = require("@starberry/gatsby-theme-utils/Modules/CTALinkModule")


const HeaderMenu = (props) => {
    const data = useStaticQuery(graphql`
        query {
            allStrapiBurgerMenu(
                filter: {publish: {eq: true}}
                sort: {fields: sort, order: ASC}
              ) {
                edges {
                  node {
                    title
                    link {
                      ...MenuFragment
                    }
                    add_new {
                      title
                      link {
                        ...MenuFragment
                      }
                    }
                  }
                }
            }
        }
    `);

    const menus = data.allStrapiBurgerMenu.edges;

    return (
        <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto d-flex align-items-center">
                {menus && menus.map(({ node }, i) => (
                    <React.Fragment>
                        {node.add_new.length === 0 ?
                            <li>
                                <CTALink {...node} class="nav-link" />
                            </li> :
                            <li className="dropdown">
                                <CTALink {...node} class="nav-link" />
                                <ul className="dropdown-menu-item">
                                    {node.add_new && node.add_new.map((item, i) => (
                                        <li className="drop-menu-item">
                                            <CTALink {...item} />
                                        </li>
                                    ))}
                                </ul>
                            </li>}

                    </React.Fragment>
                ))}
                <li className="list-inline-item">
                    <Link to={`/${PageLinks.results_sales}/`} aria-label="search" className="nav-link"><i className="icon icon-search"></i></Link>
                </li>
            </Nav>
        </Navbar.Collapse>
    )
}

export default HeaderMenu