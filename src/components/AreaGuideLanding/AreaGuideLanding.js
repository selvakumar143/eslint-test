import React, { useState, useEffect } from "react";
import { Row, Col } from "react-bootstrap";
import ScrollAnimation from 'react-animate-on-scroll';
import loadable from "@loadable/component";
import _ from "lodash";
import { Link } from "gatsby";
import { customStyles } from "../SelectDropdownStyle/SelectDropdownStyle";
import InnerPagination from "../InnerPagination/InnerPagination"
import AreaGuideCard from "../AreaGuideCard/AreaGuideCard"
const { usePagination } = require("@starberry/gatsby-theme-utils/Hooks/UsePagination")
const Select = loadable(() => import("react-select"));

const InnerIntroModule = (props) => {

    const [filter, setFilter] = useState('everything');
    let [projects, setProjects] = useState(props.data);
    let [filteredList, setFilteredList] = useState(props.data);
    const [set, setClass] = useState(false);

    // for pagination
    const itemsPerPage = 12
    const { currentItems, currentPage, setCurrentPage } = usePagination({
        items: filteredList,
        itemsPerPage,
    })
    // for pagination
    return (
        <React.Fragment>
            {currentItems.length > 0 ?
                <div className="inner-wrapper-card-main area-guide-wrapper">
                    {currentItems?.map(({ node }, index) => {
                        return (
                            <ScrollAnimation animateIn="animate__slideInUp" delay={100} animateOnce offset={50}>
                                <AreaGuideCard data={node} />
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