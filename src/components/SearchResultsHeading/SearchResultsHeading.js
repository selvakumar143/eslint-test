import React from "react";
import './assets/styles/_index.scss';

const SearchResultsHeading = (props) => {
    return (
        <>
            <div className="search-results-heading">Properties for sale in Kent, UK</div>
            {
                props.tag === "new-homes" &&
                <p className="search-results-desc-text">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type.</p>
            }
        </>
    )
}

export default SearchResultsHeading