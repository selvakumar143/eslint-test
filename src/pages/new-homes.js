import React from "react";
import { Link } from "gatsby";
import { Container, Row, Col } from "react-bootstrap";
import loadable from "@loadable/component";
import Layout from "../components/layout";
import { customStyles } from "../components/SelectDropdownStyle/SelectDropdownStyle";

import PropertyImg_1 from "../images/property_img_1.png";
import PropertyImg_2 from "../images/handpicked_img_1.png";
import PropertyImg_3 from "../images/property_img_2.png";
import PropertyImg_4 from "../images/property_img_3.png";
import PropertyImg_5 from "../images/property_img_4.png";
import PropertyImg_6 from "../images/property_img_5.png";

const Select = React.lazy(() => import("react-select"));
const FilterSearch = loadable(() => import("../components/FilterSearch/FilterSearch"));
const NewHomesCard = loadable(() => import("../components/NewHomesCard/NewHomesCard"));
const SearchResultsHeading = loadable(() => import("../components/SearchResultsHeading/SearchResultsHeading"));
const SearchResultsPagination = loadable(() => import("../components/SearchResultsPagination/SearchResultsPagination"));

const NewHomes = (props) => {

    const sortby_options = [
        { value: '', label: 'Most Recent' },
        { value: 'price-desc', label: 'Highest Price' },
        { value: 'price-asc', label: 'Lowest Price' }
    ];

    return (
        <Layout
            layout={"sticky-module"}
        >
            <div className="layout-padding-top"></div>

            <FilterSearch />

            <div className="search-results-wrapper">
                <Container>
                    <Row>
                        <Col lg={7}>
                            <SearchResultsHeading tag="new-homes" />
                        </Col>
                    </Row>
                    <Row>
                        <Col md={5} className="d-flex align-items-center">
                            <div className="search-results-count">Showing 1-12 of 143 results</div>
                        </Col>
                        <Col md={7}>
                            <ul className="list-inline search-results-list d-flex justify-content-md-end justify-content-between align-items-center">
                                <li className="list-inline-item">
                                    <div className="dropdown-select d-flex align-items-center search-results-sort">
                                        <span>Sort:</span>
                                        <Select
                                            options={sortby_options}
                                            isSearchable={false}
                                            placeholder={"Most Recent"}
                                            className={"select-control"}
                                            classNamePrefix={"react-select"}
                                            styles={customStyles}
                                            components={{ DropdownIndicator:() => <i className="icon icon-select-dropdown-dark"></i>, IndicatorSeparator:() => null }}
                                        />
                                    </div>
                                </li>
                                <li className="list-inline-item">
                                    <div className="map-link">
                                        <Link to={"#"}  className="d-flex align-items-center"><i className="icon icon-map"></i>View on Map</Link>
                                    </div>
                                </li>
                            </ul>
                        </Col>
                    </Row>
                </Container>

                <Container>
                    <div className="property-card-wrapper-main new-homes-card-wrapper-main">
                        <NewHomesCard
                            img={PropertyImg_1}
                        />

                        <NewHomesCard
                            img={PropertyImg_2}
                        />

                        <NewHomesCard
                            img={PropertyImg_3}
                        />

                        <NewHomesCard
                            img={PropertyImg_4}
                        />

                        <NewHomesCard
                            img={PropertyImg_5}
                        />

                        <NewHomesCard
                            img={PropertyImg_6}
                        />

                        <SearchResultsPagination tag="new-homes" />
                    </div>
                </Container>
            </div>
        </Layout>
    )
}

export default NewHomes