import React from "react";
import { Link } from "gatsby";
import './assets/styles/_index.scss';

const OfficeDetailSidebar = (props) => {
    return (
        <div className="office-detail-sidebar-wrapper">
            <div className="office-detail-card-text-wrapper">
                <div className="office-detail-card-title">
                    <Link to={``}>Location Estate Agents</Link>
                </div>
                <div className="office-detail-card-text">Mira, High Street, LN1 2AB</div>
                <div className="office-detail-card-mobile">
                    <a href={`tel:`}>07891 219 374</a>
                </div>
                <div className="office-detail-card-email">
                    <Link to={``} className="link-underline">location@mira.co.uk</Link>
                </div>
            </div>

            <div className="office-detail-card-text-wrapper mb-0">
                <div className="office-detail-card-title">
                    <Link to={``}>Open Hours</Link>
                </div>
                <div className="office-detail-card-text">Mira, High Street, LN1 2AB</div>
                <div className="office-detail-card-mobile">
                    <a href={`tel:`}>07891 219 374</a>
                </div>
                <div className="office-detail-card-email">
                    <Link to={``} className="link-underline">location@mira.co.uk</Link>
                </div>
            </div>
        </div>
    )
}

export default OfficeDetailSidebar