import React, { useState, Suspense } from "react";
import loadable from "@loadable/component";
import { Link, navigate } from "gatsby";
import { Container, Row, Col, Form } from "react-bootstrap";
import Select from "react-select";
import Layout from "../components/layout";
import { customStyles } from "../components/SelectDropdownStyle/SelectDropdownStyle";


const FilterSearch = loadable(() => import("../components/FilterSearch/FilterSearch"));
const PropertyCard = loadable(() => import("../components/PropertyCard/PropertyCard"));
const NewHomesCard = loadable(() => import("../components/NewHomesCard/NewHomesCard"));
const PropertyCardBadge = loadable(() => import("../components/PropertyCardBadge/PropertyCardBadge"));
const SearchResultsPagination = loadable(() => import("../components/SearchResultsPagination/SearchResultsPagination"));
const NoResultProperties = React.lazy(() => import("../components/NoResultsProperties/NoResultsProperties"));
//const MapReults = React.lazy(() => import("../components/maps/google/results"));
const GoogleMapReults = React.lazy(() => import("../components/maps/google/results"));
const LeafletMapReults = React.lazy(() => import("../components/maps/leaflet/results"));

const SearchResultsTemplate = (props) => {

    const mapService = process.env.GATSBY_MAP_PROVIDER == "leaflet" ? "leaflet" : "google";

    const changesortby = event => {
        //get sortby value
        let sortbyUrl = '';
        if (event?.value) {
            sortbyUrl = 'sortby-' + event.value + '/'
        }
        //get current url
        const urlwithoutsort_filt = (props?.location_path).split("page-");
        const urlwithoutsort = urlwithoutsort_filt[0].split("sortby-");
        // concat url and navigate
        navigate(urlwithoutsort[0] + sortbyUrl)
    }
    const changeincludesold = event => {
        let sortbyUrl = '';
        //get current url
        const urlwithoutsort_filt = (props?.location_path).split("page-");
        const urlwithoutsort = urlwithoutsort_filt[0].split("sortby-");
        if (document.getElementById('include-sold').checked) {
            if (props?.page_url_data.searchtypeVal === "sales") {
                sortbyUrl = 'includes-sold/'
            }
            else {
                sortbyUrl = 'includes-let-agreed/'
            }
            // concat url and navigate
            navigate(urlwithoutsort[0] + sortbyUrl)
        } else {
            if (props?.page_url_data.searchtypeVal === "sales") {
                navigate(urlwithoutsort[0].replace('includes-sold/', ''))
            }
            else {
                navigate(urlwithoutsort[0].replace('includes-let-agreed/', ''))
            }
        }
    }
    //const changelayout = event => {
    //get current url
    const mymapview_url = (props?.location_path).split("map-view/");
    // concat url and navigate
    //navigate()
    //}
    const sortby_options = [
        { value: '', label: 'Most Recent' },
        { value: 'price-desc', label: 'Highest Price' },
        { value: 'price-asc', label: 'Lowest Price' }
    ];
    //props?.page_url_data?.search_type
    let sortby_key;
    if (props?.page_url_data?.sortVal === props.indexname) {
        sortby_key = 0;
    } else if (props?.page_url_data?.sortVal === props.indexname + "_price_desc") {
        sortby_key = 1;
    } else if (props?.page_url_data?.sortVal === props.indexname + "_price_asc") {
        sortby_key = 2;
    }

    // View on map & list
    const [showMap, setShowMap] = useState(true);
    const [showList, setShowList] = useState(false);

    const [showDesc, setShowDesc] = useState(false)
    const mapView = (e) => {
        setShowMap(false);
        setShowList(true);
    }

    const listView = (e) => {
        setShowList(false);
        setShowMap(true);
    }
    // View on map & list

    var itemListElement = [];
    if (props?.total > 0 && props.hits) {
        (props.hits).map((val, key) => {
            let details_path = '/property-for-sale'
            if (val.search_type == "lettings") {
                details_path = '/property-to-rent'
            }
            if (props.page_url_data.propertyTypeVal === "new_developments") {
                details_path = '/new-home-for-sale'
            }
            let propid = ''
            if (val?.strapi_id)
                propid = val.strapi_id
            else if (val?.objectID)
                propid = val.objectID
            itemListElement.push(
                {
                    "@type": "ListItem",
                    "position": key + 1,
                    "url": process.env.GATSBY_SITE_URL + details_path + '/' + val.slug + '/' + (propid) + '/',
                    "name": val.slug.replace(/-/g, " ")
                }
            )
        })
    }


    var ldJson = props.hits ? {
        "@context": "https://schema.org",
        "@type": "SearchResultsPage",
        "publisher": {
            "@type": "Corporation",
            "name": process.env.GATSBY_SITE_NAME + " in " + process.env.GATSBY_DEFAULT_AREA,
            "logo": {
                "@type": "ImageObject",
                "url": process.env.GATSBY_SITE_URL + `/images/logo.png`,
                "width": 250,
                "height": 100
            }
        },
        "mainEntity": {
            "@type": "ItemList",
            "numberOfItems": props.total,
            "name": props?.pageh1,
            "description": props?.introcopy,
            "itemListElement": itemListElement
        }
    } : '';


    return (
        <Layout
            layout={"sticky-module"}
        >
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(ldJson) }}
            />
            <div className="layout-padding-top"></div>

            <FilterSearch mymapview_url={mymapview_url[0]} page_url_data={props.page_url_data} createResultsUrl={props.createResultsUrl} />

            <div className="search-results-wrapper">
                <Container>
                    <Row>
                        <Col lg={6}>
                            <div className="search-results-heading">{props?.pageh1} <i className="icon icon-info" onClick={() => setShowDesc(!showDesc)}></i></div>
                            {showDesc && <p className="search-results-desc-text" dangerouslySetInnerHTML={{ __html: props?.introcopy }} />}
                        </Col>
                    </Row>
                    <Row>
                        <Col md={5} className="d-flex align-items-center">
                            <div className="search-results-count">{props?.page_url_data?.layoutVal == "" && (props.total > props.hitsPerPage) &&
                                <div className="search-results-title">Showing {props.hitsPerPage * (props?.current_page_number) + 1}-{props.hitsPerPage * (props?.current_page_number + 1)} of {props.total} Properties</div>
                            }</div>
                        </Col>
                        <Col md={7}>
                            <ul className="list-inline search-results-list d-flex justify-content-md-end justify-content-between align-items-center">
                                {
                                    process.env.GATSBY_PROPERTY_INCLUDE_SOLD === "true" ?
                                        <li className="list-inline-item d-xl-inline-flex d-none">
                                            <Form.Check
                                                className="search-results-check"
                                                inline
                                                label={props?.page_url_data.searchtypeVal === "sales" ? "Include Sold" : "Let Agreed"}
                                                name=""
                                                checked={props?.page_url_data?.soldVal ? true : false}
                                                type={"checkbox"}
                                                id={`include-sold`}
                                                onChange={changeincludesold}
                                            />
                                        </li>
                                        : ""
                                }
                                <li className="list-inline-item">
                                    <div className="dropdown-select d-flex align-items-center search-results-sort">
                                        <span>Sort:</span>
                                        <Select
                                            options={sortby_options}
                                            defaultValue={sortby_options[sortby_key]}
                                            value={sortby_options.value}
                                            placeholder={"Most Recent"}
                                            onChange={changesortby}
                                            className={"select-control"}
                                            classNamePrefix={"react-select"}
                                            styles={customStyles}
                                            isSearchable={false}
                                            components={{ DropdownIndicator: () => <i className="icon icon-select-dropdown-dark"></i>, IndicatorSeparator: () => null }}
                                        />
                                    </div>
                                </li>
                                <li className="list-inline-item">
                                    <div className="map-link">
                                        {props?.page_url_data?.layoutVal == "" &&
                                            <Link to={mymapview_url[0] + "map-view/"} className="d-flex align-items-center"><i className="icon icon-map"></i> <span>View on Map</span></Link>
                                        }
                                        {props?.page_url_data?.layoutVal &&
                                            <Link to={mymapview_url[0]} className="d-flex align-items-center"><i className="icon icon-list"></i> <span>View on Grid</span></Link>
                                        }
                                    </div>
                                </li>
                            </ul>
                        </Col>
                    </Row>
                    {props.total == 0 &&
                        <Row>
                            <Col>
                                <div className="no-results-section">
                                    <p>Unfortunately, we do not currently have any properties that match your search criteria.</p><p>We have selected some of our showcase properties for you to browse below. Alternatively, you can search again in the bar above.</p>
                                    <NoResultProperties />
                                </div>
                            </Col>
                        </Row>
                    }
                </Container>

                {props?.page_url_data?.layoutVal == "" &&
                    <Container>
                        {props?.total > 0 &&
                            <div className={props.page_url_data.propertyTypeVal === "residential" ? "property-card-wrapper-main" : "property-card-wrapper-main new-homes-card-wrapper-main"}>
                                {(props.hits).map(function (hit, i) {
                                    let v = i + 1
                                    return (
                                        <>
                                            {props.page_url_data.propertyTypeVal === "residential" ? <PropertyCard myindexval={i} status={hit.status} data={hit} key={i} /> : <NewHomesCard myindexval={i} status={hit.status} data={hit} key={i} />}
                                            {v > 0 && (v % 6) == 0 && v != props.hitsPerPage &&
                                                <PropertyCardBadge />
                                            }
                                        </>
                                    )
                                })}

                                {(props.total > props.hitsPerPage) ? <SearchResultsPagination setMypageoption={props.setMypageoption} location_path={props?.location_path} page_url_data={props.page_url_data} total={props?.total} current_page_number={props?.current_page_number} hitsPerPage={props?.hitsPerPage} nbPages={props?.number_of_pages} /> : <div className="empty-space-search"></div>}
                            </div>
                        }
                    </Container>
                }
                {props?.page_url_data?.layoutVal &&
                    <div className="map-results">
                        {props?.total > 0 && mapService == "google" &&
                            <GoogleMapReults hits={props?.hits} propertyTypeVal={props?.page_url_data?.propertyTypeVal} />
                        }
                        {props?.total > 0 && mapService == "leaflet" &&
                            <LeafletMapReults hits={props?.hits} propertyTypeVal={props?.page_url_data?.propertyTypeVal} />
                        }
                    </div>
                }
            </div>
        </Layout>
    )
}

export default SearchResultsTemplate