import React from "react";
import './assets/styles/_index.scss';
const { Site_Vars } = require("../../common/site/config");

const NewHomesDetailsSidebar = (props) => {
    return (
        <>
            <div className="secondary-text text-sm-heading">Key Details</div>
            <ul className="list-unstyled new-homes-sidebar-list">
                <li>
                    <div className="new-homes-detail-text-sm">{props.price_qualifier ? props.price_qualifier : "Price" }</div>
                    <div className="new-homes-detail-text">{Site_Vars.default_currency}{props?.price?.toLocaleString()} {props?.max_price ? ` - ${Site_Vars.default_currency}${props?.max_price?.toLocaleString()}` : ''}</div>
                </li>
                <li>
                    <div className="new-homes-detail-text-sm">Estimated completion</div>
                    <div className="new-homes-detail-text">Summer 2023</div>
                </li>
                <li>
                    <div className="new-homes-detail-text-sm">Tenure</div>
                    <div className="new-homes-detail-text">Freehold</div>
                </li>
                <li>
                    <div className="new-homes-detail-text-sm">Council Tax Band:</div>
                    <div className="new-homes-detail-text">Band C</div>
                </li>
            </ul>
        </>
    )
}

export default NewHomesDetailsSidebar