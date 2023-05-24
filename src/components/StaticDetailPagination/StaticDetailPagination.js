import React from "react";
import { Link } from "gatsby";
import './assets/styles/_index.scss';

const StaticDetailPagination = (props) => {
    return (
        <div className={`inner-load-more-wrap ${props.tag}`}>
            <div className="d-flex align-items-center justify-content-between">
                <button className={`results-btn d-flex align-items-center`} disabled={""}><i className="icon icon-results-back"></i> <span className="secondary-text d-md-block d-none">Back</span></button>
                
                <div className="text-center pages-count d-flex align-items-center">
                    <ul className="list-inline pagination-list">
                        <li className="list-inline-item">
                            <Link to="#" className="active">1</Link>
                        </li>
                        <li className="list-inline-item">
                            <Link to="#">2</Link>
                        </li>
                        <li className="list-inline-item">
                            <Link to="#">3</Link>
                        </li>
                        <li className="list-inline-item">
                            <Link to="#">4</Link>
                        </li>
                        <li className="list-inline-item">
                            <Link to="#">5</Link>
                        </li>
                        <li className="list-inline-item">
                            <Link to="#">6</Link>
                        </li>
                    </ul>
                </div>
                
                <button className={`results-btn d-flex align-items-center`} disabled={""}><span className="secondary-text d-md-block d-none">Next</span> <i className="icon icon-results-next"></i></button>
            </div>
        </div>
    )
}

export default StaticDetailPagination