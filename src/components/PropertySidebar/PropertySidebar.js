import React from "react";
import './assets/styles/_index.scss';

const PropertySidebar = (props) => {
    return (
        <>
            {props.accomadationSummary?.strapi_json_value?.length > 0 &&
                <>
                    <div className="secondary-text text-sm-heading">Standout Features</div>
                    <ul className="list-unstyled property-sidebar-list">
                        {props.accomadationSummary?.strapi_json_value?.map((data) => {
                            return (
                                <li>{data}</li>
                            )
                        })}
                    </ul>
                </>
            }
        </>
    )
}

export default PropertySidebar