import React, { useState, useEffect } from "react";
import { Row, Col } from "react-bootstrap";
import ScrollAnimation from 'react-animate-on-scroll';
import loadable from "@loadable/component";
import _ from "lodash";
import { Link } from "gatsby";
import { customStyles } from "../SelectDropdownStyle/SelectDropdownStyle";
import InnerPagination from "../InnerPagination/InnerPagination"
import NewsCard from "../NewsCard/NewsCard"
import './assets/styles/_index.scss';
import NewsImg_1 from "../../images/journal_img_1.png";
const { usePagination } = require("@starberry/gatsby-theme-utils/Hooks/UsePagination")
const Select = loadable(() => import("react-select"));

const InnerIntroModule = (props) => {

    const [filter, setFilter] = useState('everything');
    let [projects, setProjects] = useState(props.data);
    const selectOptions = [{ value: 'everything', label: 'Everything' }];
    let [buyingCount, setBuyingCount] = useState(_.filter(props.data, function (o) { return (o.node.category.strapi_json_value).includes("buying"); }));
    let [sellingCount, setSellingCount] = useState(_.filter(props.data, function (o) { return (o.node.category.strapi_json_value).includes("selling"); }));
    let [rentingCount, setRentingCount] = useState(_.filter(props.data, function (o) { return (o.node.category.strapi_json_value).includes("renting"); }));
    let [landlordsCount, setLandlordsCount] = useState(_.filter(props.data, function (o) { return (o.node.category.strapi_json_value).includes("landlords"); }));
    let [filteredList, setFilteredList] = useState(props.data);
    const [set, setClass] = useState(false);

    const newClass = (event) => {
        var parent = document.getElementById('filter-link');
        parent.classList.add('filter-active');
        setClass(false);
        var allChildElements = parent.querySelectorAll('.link');
        for (const box of allChildElements) {
            box.classList.remove('active');
        }
        event.target.classList.add('active')
    }

    const applyCategory = (filt) => {
        if (filt !== "everything") {
            setProjects([]);
            const filtered = _.filter(props.data, function (o) { return (o.node.category.strapi_json_value).includes(filt); });
            setProjects(filtered);
            setFilteredList(filtered);
        } else {
            setProjects(props.data);
            setFilteredList(props.data);
        }
    }


    // for pagination
    const itemsPerPage = 12
    const { currentItems, currentPage, setCurrentPage } = usePagination({
        items: filteredList,
        itemsPerPage,
    })
    // for pagination


    useEffect(() => {
        if (buyingCount.length > 0) {
            selectOptions.push({ value: 'buying', label: 'Buying' })
        }
        if (sellingCount.length > 0) {
            selectOptions.push({ value: 'selling', label: 'Selling' })
        }
        if (rentingCount.length > 0) {
            selectOptions.push({ value: 'renting', label: 'Renting' })
        }
        if (landlordsCount.length > 0) {
            selectOptions.push({ value: 'landlords', label: 'Landlords' })
        }
    }, [filteredList])

    return (
        <React.Fragment>
            <Row>
                <Col md={4}>
                    <ScrollAnimation animateIn="animate__slideInUp" delay={100} animateOnce offset={50}>
                        <h3 className="inner-intro-heading">{props.title}</h3>
                    </ScrollAnimation>
                </Col>
                <Col md={8} className="d-md-flex  align-items-center justify-content-end">
                    <ScrollAnimation animateIn="animate__slideInUp" delay={100} animateOnce offset={50}>
                        <ul className="list-inline inner-intro-list d-md-block d-none" id="filter-link">
                            <li className="list-inline-item">
                                <a href="javascript:;" className="link active" onClick={(event) => { setFilter('everything'); applyCategory('everything'); newClass(event); }}>All</a>
                            </li>
                            {buyingCount.length > 0 && <li className="list-inline-item">
                                <a href="javascript:;" type="button" className="link" onClick={(event) => {
                                    setFilter('buying'); applyCategory('buying'); newClass(event);
                                }}>Buying</a>
                            </li>}
                            {sellingCount.length > 0 && <li className="list-inline-item">
                                <a href="javascript:;" type="button" className="link" onClick={(event) => {
                                    setFilter('selling'); applyCategory('selling'); newClass(event);
                                }}>Selling</a>
                            </li>}
                            {rentingCount.length > 0 && <li className="list-inline-item">
                                <a href="javascript:;" type="button" className="link" onClick={(event) => {
                                    setFilter('renting'); applyCategory('renting'); newClass(event);
                                }}>Renting</a>
                            </li>}
                            {landlordsCount.length > 0 && <li className="list-inline-item">
                                <a href="javascript:;" type="button" className="link" onClick={(event) => {
                                    setFilter('landlords'); applyCategory('landlords'); newClass(event);
                                }}>Landlords</a>
                            </li>}
                        </ul>
                    </ScrollAnimation>
                    <div className="mobile-tab-wrapper d-md-none">
                        <Select
                            options={selectOptions}
                            onChange={(e) => { setFilter(e.value); applyCategory(e.value); }}
                            value={selectOptions.find(obj => obj.value === filter)}
                            isSearchable={false}
                            placeholder={"All"}
                            className={"select-control"}
                            classNamePrefix={"react-select"}
                            styles={customStyles}
                            components={{ DropdownIndicator: () => <i className="icon icon-select-dropdown-dark"></i>, IndicatorSeparator: () => null }}
                        />
                    </div>
                </Col>
            </Row>
            {currentItems.length > 0 ?
                <div className="inner-wrapper-card-main">
                    {currentItems?.map(({ node }, index) => {
                        return (
                            <ScrollAnimation animateIn="animate__slideInUp" delay={100} animateOnce offset={50}>
                                <NewsCard data={node} />
                            </ScrollAnimation>
                        )
                    }
                    )}
                </div> :
                <p>Sorry, noresults found, please check after sometimes</p>}
            <InnerPagination
                currentPage={currentPage}
                itemsPerPage={itemsPerPage}
                totalItems={filteredList.length}
                setCurrentPage={setCurrentPage}
            />
        </React.Fragment>
    )
}

export default InnerIntroModule