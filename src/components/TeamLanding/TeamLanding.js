import React, { useState, useEffect } from "react";
import { Row, Col } from "react-bootstrap";
import loadable from "@loadable/component";
import ScrollAnimation from 'react-animate-on-scroll';
import _ from "lodash";
import { Link } from "gatsby";
import { customStyles } from "../SelectDropdownStyle/SelectDropdownStyle";
import InnerPagination from "../InnerPagination/InnerPagination"
import '../NewsLanding/assets/styles/_index.scss';
import NewsImg_1 from "../../images/journal_img_1.png";
const { usePagination } = require("@starberry/gatsby-theme-utils/Hooks/UsePagination")
const Select = loadable(() => import("react-select"));
const PeopleCard = loadable(() => import("../PeopleCard/PeopleCard"));

const InnerIntroModule = (props) => {

    const [filter, setFilter] = useState('everyone');
    let [projects, setProjects] = useState(props.data);
    const selectOptions = [{ value: 'everyone', label: 'All' }];
    let [directorsCount, setDirectorsCount] = useState(_.filter(props.data, function (o) { return (o.node.category.strapi_json_value).includes("directors"); }));
    let [negotiatorsCount, setNegotiatorsCount] = useState(_.filter(props.data, function (o) { return (o.node.category.strapi_json_value).includes("negotiators"); }));
    let [marketingCount, setMarketingCount] = useState(_.filter(props.data, function (o) { return (o.node.category.strapi_json_value).includes("marketing"); }));
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
        if (filt !== "everyone") {
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
        if (directorsCount.length > 0) {
            selectOptions.push({ value: 'directors', label: 'Directors' })
        }
        if (negotiatorsCount.length > 0) {
            selectOptions.push({ value: 'negotiators', label: 'Negotiators' })
        }
        if (marketingCount.length > 0) {
            selectOptions.push({ value: 'marketing', label: 'Marketing' })
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
                                <a href="javascript:;" className="link active" onClick={(event) => { setFilter('everyone'); applyCategory('everyone'); newClass(event); }}>All</a>
                            </li>
                            {directorsCount.length > 0 && <li className="list-inline-item">
                                <a href="javascript:;" type="button" className="link" onClick={(event) => {
                                    setFilter('directors'); applyCategory('directors'); newClass(event);
                                }}>Directors</a>
                            </li>}
                            {negotiatorsCount.length > 0 && <li className="list-inline-item">
                                <a href="javascript:;" type="button" className="link" onClick={(event) => {
                                    setFilter('negotiators'); applyCategory('negotiators'); newClass(event);
                                }}>Negotiators</a>
                            </li>}
                            {marketingCount.length > 0 && <li className="list-inline-item">
                                <a href="javascript:;" type="button" className="link" onClick={(event) => {
                                    setFilter('marketing'); applyCategory('marketing'); newClass(event);
                                }}>Marketing</a>
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
                <div className="inner-wrapper-card-main people-wrapper">
                    {currentItems?.map(({ node }, index) => {
                        return (
                            <ScrollAnimation animateIn="animate__slideInUp" delay={100} animateOnce offset={50}>
                                <PeopleCard data={node} />
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