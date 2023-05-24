import React from "react";
import { Row, Col } from "react-bootstrap";
import { Link } from "gatsby";
import Select from "react-select";
import { customStyles } from "../SelectDropdownStyle/SelectDropdownStyle";
import './assets/styles/_index.scss';

const InnerIntroModule = (props) => {
    return (
        <Row>
            <Col md={4}>
                <h3 className="inner-intro-heading">{props.title}</h3>
            </Col>
            {
                props.tag === "area-guides" ? ""
                :
                <Col md={8} className="d-md-flex  align-items-center justify-content-end">
                    <ul className="list-inline inner-intro-list d-md-block d-none">
                        <li className="list-inline-item">
                            <Link to="" className="active">All</Link>
                        </li>
                        <li className="list-inline-item">
                            <Link to="">Homes</Link>
                        </li>
                        <li className="list-inline-item">
                            <Link to="">Events</Link>
                        </li>
                        <li className="list-inline-item">
                            <Link to="">Lifestyle</Link>
                        </li>
                        <li className="list-inline-item">
                            <Link to="">Guides</Link>
                        </li>
                    </ul>
                    <div className="mobile-tab-wrapper d-md-none">
                        <Select
                            options={
                                [
                                    { value: 'all', label: 'All' },
                                    { value: 'homes', label: 'Homes' },
                                    { value: 'events', label: 'Events' },
                                    { value: 'lifestyle', label: 'Lifestyle' },
                                    { value: 'guides', label: 'Guides' }
                                ]
                            }
                            isSearchable={false}
                            placeholder={"All"}
                            className={"select-control"}
                            classNamePrefix={"react-select"}
                            styles={customStyles}
                            components={{ DropdownIndicator: () => <i className="icon icon-select-dropdown-dark"></i>, IndicatorSeparator: () => null }}
                        />
                    </div>
                </Col>
            }
        </Row>
    )
}

export default InnerIntroModule