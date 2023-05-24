import React from "react";
import StaticShare from "../StaticShare/StaticShare";
import './assets/styles/_index.scss';

const StaticDetailSidebar = (props) => {

    
    function capitalizeWords(arr) {
        return arr.map((word) => {
            const capitalizedFirst = word.charAt(0).toUpperCase();
            const rest = word.slice(1).toLowerCase();
            return capitalizedFirst + rest;
        });
    }
    
    var cat_list = ''
    if(props.category) {
        cat_list = capitalizeWords(props.category?.strapi_json_value)
    }
    
    return (
        <div className="static-detail-sidebar-wrapper">
            <ul className="list-unstyled static-detail-list">
                {props.date && <li>
                    <div className="static-detail-text-sm secondary-text">Date Posted</div>
                    <div className="static-detail-text">{props.date}</div>
                </li> }
                {cat_list.length > 0 && <li>
                    <div className="static-detail-text-sm secondary-text">Category</div>
                    <div className="static-detail-text">{String(cat_list).replace(",", ", ")}</div>
                </li> }
                <li>
                    <StaticShare />
                </li>
            </ul>
        </div>
    )
}

export default StaticDetailSidebar