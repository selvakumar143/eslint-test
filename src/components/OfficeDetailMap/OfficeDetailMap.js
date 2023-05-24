import React from "react";
import { Link } from "gatsby";
import GoogleSingleMap from "../maps/google/single";
import './assets/styles/_index.scss';

const OfficeDetailMap = (props) => {
    return (
        <section className="office-detail-map-wrapper">
            <div className="office-detail-map-title">Ladyhole Lane, Keighley, West Yorkshire</div>
            <GoogleSingleMap lat={53.7401385} lng={-2.2464526} />
            <div className="office-detail-map-text-link"><span>Want to explore Keighley further?</span> Explore our <Link to="">Keighley Area Guide</Link></div>
        </section>
    )
}

export default OfficeDetailMap