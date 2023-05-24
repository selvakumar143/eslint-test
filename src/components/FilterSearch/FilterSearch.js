import React, { useState } from "react";
import { Link } from "gatsby";
import { navigate } from "gatsby"
import { Container, Row, Col, Form } from "react-bootstrap";
import loadable from "@loadable/component";
import searchType from "../../search_config/search_type.json";
import BedroomList from "../../search_config/bedrooms.json";
import propertyTypes from "../../search_config/property_type.json";
import minPrice from "../../search_config/min_price.json";
import maxPrice from "../../search_config/max_price.json";
import useHasScrolled from "../../hooks/useHasScrolled";
import { filterCustomStyles } from "../SelectDropdownStyle/SelectDropdownStyle";
import './assets/styles/_index.scss';
const Select = loadable(() => import("react-select"));
const SearchBoxFilter = loadable(() => import("./SearchBoxFilter"));

const FilterSearch = (props) => {

    // Scroll
    const scrolled = useHasScrolled()
    // Scroll

    // Dropdown react select styles
    const customStyles = {
        option: (styles, { data, isDisabled, isFocused, isSelected }) => {
            return {
                ...styles,
                // backgroundColor: isSelected ? "#081D3C" : "null",
                // color: isSelected ? "#ffffff" : "#34373D",
                "&:hover": {
                    // color: "#ffffff",
                    cursor: "pointer",
                    // backgroundColor: "#081D3C",
                }
            }
        },
        control: styles => ({
            ...styles,
            backgroundColor: null,
            border: 0,
            paddingLeft: 0,
            outline: 0,
            boxShadow: "none",
            color: "#fff",
            fontSize: "1rem",
        }),
        valueContainer: styles => ({
            ...styles,
            fontSize: "1rem",
            paddingLeft: 0,
            lineHeight: "21px",
            cursor: "pointer",
        }),
        dropdownIndicator: styles => ({
            ...styles,
            color: "#fff",
        }),
        indicatorsContainer: styles => ({
            ...styles,
            color: "#fff",
            cursor: "pointer",
        }),
        indicatorSeparator: () => null,
        placeholder: defaultStyles => {
            return {
                ...defaultStyles,
                color: "#ffffff",
                marginLeft: 0,
            }
        },
    }
    // Dropdown react select styles

    // More filters
    const [showFilter, setShowFilter] = useState(false);

    const moreFilters = (e) => {
        setShowFilter(true);
    }

    const moreFiltersShow = (e) => {
        setShowFilter(false);
    }
    // More filters

    // View on map & list
    const [showMap, setShowMap] = useState(true);
    const [showList, setShowList] = useState(false);

    const mapView = (e) => {
        setShowMap(false);
        setShowList(true);
    }

    const listView = (e) => {
        setShowList(false);
        setShowMap(true);
    }
    // View on map & list
    const SearchTypeChange = (e) => {
        var navPath = ''
        if (e.value === "buy") {
            navPath = "/property/for-sale/" + `in-${process.env.GATSBY_DEFAULT_AREA}/`;
        } else if (e.value === "rent") {
            navPath = "/property/to-rent/" + `in-${process.env.GATSBY_DEFAULT_AREA}/`;
        }
        navigate(navPath)
    }

    const handleSubmit = event => {
        event.preventDefault();
        const formsdata = (event.target);
        const json = {}
        Object.keys(formsdata).map(key => (
            json[formsdata[key].name] = formsdata[key].value
        ))
        delete json.submit;
        delete json?.undefined;
        //add existing sortby value
        //json['sortby'] = props?.page_url_data?.sortVal
        props.createResultsUrl(json);
    }

    //filters values
    const search_type_options = searchType;
    //props?.page_url_data?.search_type
    let search_type_key;
    if (props?.page_url_data?.searchtypeVal === "lettings") {
        search_type_key = 1;
    } else if (props?.page_url_data?.searchtypeVal === "sales") {
        search_type_key = 0;
    }
    const min_price_options = minPrice;
    //props?.page_url_data?.minpriceVal
    let min_price_key = Object.keys(min_price_options).find(key => min_price_options[key].value === props?.page_url_data?.minpriceVal);

    const max_price_options = maxPrice;
    //props?.page_url_data?.maxpriceVal
    let max_price_key = Object.keys(max_price_options).find(key => max_price_options[key].value === props?.page_url_data?.maxpriceVal);
    const bedroom_options = BedroomList;
    //props?.page_url_data?.bedVal
    let bedroom_key = Object.keys(bedroom_options).find(key => bedroom_options[key].value === props?.page_url_data?.bedVal);
    const building_options = propertyTypes;
    //props?.page_url_data?.buildingval
    let building_key = Object.keys(building_options).find(key => building_options[key].value === props?.page_url_data?.buildingval);

    let area_val;
    if (props?.page_url_data?.areaVal && props?.page_url_data?.areaVal !== (process.env.GATSBY_DEFAULT_AREA.toLowerCase())) {
        area_val = props?.page_url_data?.areaVal
    }
    // const [query, setQuery] = useState(area_val);
    // // list of filters end here
    // const searchboxhandleChange = (value) => {
    //     setQuery(value)
    //     //setClass(false);
    //     //$(".search-field").removeClass("actv_cls")
    // }

    return (
        <section className={`filter-search-wrapper sticky-top ${scrolled ? "filter-scrolled" : ""}`}>
            <Container>
                <Row>
                    <Col>
                        <div className={`filter-search-features ${showFilter === true ? "filter-show" : ""}`}>
                            <Form className="refine-form" method="post" onSubmit={handleSubmit} onKeyPress={(e) => { e.key === 'Enter' && e.preventDefault(); }}>
                                <div className={`${showFilter === true ? "" : "d-md-flex align-items-center justify-content-between"}`}>
                                    <ul className="list-inline filter-search-list-first d-flex flex-wrap align-items-center">
                                        <li className="list-inline-item order-xl-1 order-2">
                                            <div className={`dropdown-select buy-dropdown mobile-filter ${showFilter === true ? "d-block" : ""}`}>
                                                <Select
                                                    options={search_type_options}
                                                    defaultValue={search_type_options[search_type_key]}
                                                    value={search_type_options.value}
                                                    name={"search_type"}
                                                    placeholder={"Buy"}
                                                    className={"select-control"}
                                                    classNamePrefix={"react-select"}
                                                    styles={filterCustomStyles}
                                                    onChange={(e) => SearchTypeChange(e)}
                                                    isSearchable={false}
                                                    components={{ DropdownIndicator: () => <i className={`${showFilter === true ? "icon icon-select-dropdown-primary" : ""}`}></i>, IndicatorSeparator: () => null }}
                                                />
                                            </div>
                                        </li>

                                        <li className="list-inline-item order-xl-2 order-1">
                                            <div className={`search-box ${showFilter === true ? "mobile-filter-show" : ""}`}>
                                                <SearchBoxFilter areaVal={area_val} />
                                            </div>
                                        </li>
                                    </ul>

                                    <ul className="list-inline filter-search-list d-xl-flex align-items-center">
                                        <li className="list-inline-item">
                                            <div className={`dropdown-select price-dropdown mobile-filter ${showFilter === true ? "d-block" : ""}`}>
                                                <Select
                                                    options={min_price_options}
                                                    defaultValue={min_price_options[min_price_key]}
                                                    value={min_price_options.value}
                                                    placeholder={"Min Price"}
                                                    name={"min_price"}
                                                    className={"select-control"}
                                                    classNamePrefix={"react-select"}
                                                    styles={filterCustomStyles}
                                                    isSearchable={false}
                                                    components={{ DropdownIndicator: () => <i className={`${showFilter === true ? "icon icon-select-dropdown-primary" : ""}`}></i>, IndicatorSeparator: () => null }}
                                                />
                                            </div>
                                        </li>

                                        <li className="list-inline-item">
                                            <div className="search-divider d-xl-block d-none"></div>
                                        </li>

                                        <li className="list-inline-item">
                                            <div className={`dropdown-select price-dropdown mobile-filter ${showFilter === true ? "d-block" : ""}`}>
                                                <Select
                                                    options={max_price_options}
                                                    defaultValue={max_price_options[max_price_key]}
                                                    value={max_price_options.value}
                                                    placeholder={"Max Price"}
                                                    name={"max_price"}
                                                    className={"select-control"}
                                                    classNamePrefix={"react-select"}
                                                    styles={filterCustomStyles}
                                                    isSearchable={false}
                                                    components={{ DropdownIndicator: () => <i className={`${showFilter === true ? "icon icon-select-dropdown-primary" : ""}`}></i>, IndicatorSeparator: () => null }}
                                                />
                                            </div>
                                        </li>

                                        <li className="list-inline-item">
                                            <div className="search-divider d-xl-block d-none"></div>
                                        </li>

                                        <li className="list-inline-item">
                                            <div className={`dropdown-select bed-dropdown mobile-filter ${showFilter === true ? "d-block" : ""}`}>
                                                <Select
                                                    options={bedroom_options}
                                                    defaultValue={bedroom_options[bedroom_key]}
                                                    value={bedroom_options.value}
                                                    placeholder={"Bedrooms"}
                                                    name={"bedrooms"}
                                                    className={"select-control"}
                                                    classNamePrefix={"react-select"}
                                                    styles={filterCustomStyles}
                                                    isSearchable={false}
                                                    components={{ DropdownIndicator: () => <i className={`${showFilter === true ? "icon icon-select-dropdown-primary" : ""}`}></i>, IndicatorSeparator: () => null }}
                                                />
                                            </div>
                                        </li>

                                        <li className="list-inline-item">
                                            <div className="search-divider d-xl-block d-none"></div>
                                        </li>

                                        <li className="list-inline-item">
                                            <div className={`dropdown-select property-dropdown mobile-filter ${showFilter === true ? "d-block" : ""}`}>
                                                <Select
                                                    options={building_options}
                                                    defaultValue={building_options[building_key]}
                                                    value={building_options.value}
                                                    name={"building_type"}
                                                    placeholder={"Property Type"}
                                                    className={"select-control"}
                                                    classNamePrefix={"react-select"}
                                                    styles={filterCustomStyles}
                                                    isSearchable={false}
                                                    components={{ DropdownIndicator: () => <i className={`${showFilter === true ? "icon icon-select-dropdown-primary" : ""}`}></i>, IndicatorSeparator: () => null }}
                                                />
                                            </div>
                                        </li>

                                        <li className="list-inline-item search-results-btn d-flex align-items-center">
                                            <div className={`d-xl-none search-more-filters ${showFilter === true ? "d-none" : ""}`}>
                                                <button className="more-filters-btn" onClick={moreFilters}>More Filters <i className="icon icon-more-filters"></i></button>
                                            </div>

                                            <div className={`search-btn-wrapper ${showFilter === true ? "d-none" : ""}`}>
                                                <button name="submit" className="button-sec button-sec-primary-outline">Search</button>
                                            </div>

                                            <div className={`search-btn-wrapper ${showFilter === true ? "search-btn-mobile" : "d-none"}`}>
                                                <button className="button-sec button-sec-primary-outline" name="submit" onClick={moreFiltersShow}>Update</button>
                                            </div>
                                            <Form.Control name={"sortby"} type="hidden" defaultValue={props?.page_url_data?.sortVal} />
                                            <Form.Control name={"includesold"} type="hidden" defaultValue={props?.page_url_data?.soldVal} />
                                            <Form.Control name={"layout"} type="hidden" defaultValue={props?.page_url_data?.layoutVal} />
                                        </li>
                                    </ul>
                                </div>
                            </Form>
                        </div>
                    </Col>
                </Row>
            </Container>
        </section>
    )
}

export default FilterSearch