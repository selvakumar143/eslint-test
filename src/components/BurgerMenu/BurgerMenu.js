import React from "react";
import { useStaticQuery, graphql } from "gatsby"
import { Accordion } from 'react-bootstrap';
import { Link } from "gatsby";
import './assets/styles/_index.scss';
const { CTALink } = require("@starberry/gatsby-theme-utils/Modules/CTALinkModule")

const BurgerMenu = (props) => {
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
        <div className="burger-menu">
            <ul className="list-unstyled burger-menu-list">
                {menus && menus.map(({ node }, i) => (
                    <React.Fragment>
                        {node.add_new.length === 0 ?
                            <li>
                                <CTALink {...node} />
                            </li> :
                            <li>
                                <Accordion className="burger-menu-accordion">
                                    <Accordion.Item eventKey={i}>
                                        <Accordion.Header>
                                            <CTALink {...node} />
                                        </Accordion.Header>
                                        <Accordion.Body>
                                            <ul className="list-unstyled inner-burger-menu-list">
                                                {node.add_new && node.add_new.map((item, i) => (
                                                    <li>
                                                        <CTALink {...item} />
                                                    </li>
                                                ))}
                                            </ul>
                                        </Accordion.Body>
                                    </Accordion.Item>
                                </Accordion>
                            </li>}
                    </React.Fragment>
                ))}
            </ul>
        </div>
    )
}

export default BurgerMenu