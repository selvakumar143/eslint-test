import React from "react";
import { Link, navigate } from "gatsby";
import './assets/styles/_index.scss';
import ImageModule from "../../modules/image-render";
import { PageLinks } from "../../common/site/page-static-links";

const PeopleCard = (props) => {
    const ImageRenderList = ({ item, imagename }) => {
        let processedImages = JSON.stringify({});
        if (item?.imagetransforms?.image_Transforms) {
            processedImages = item?.imagetransforms?.image_Transforms;
        }

        return (
            <ImageModule ImageSrc={item.image} title={item.name} altText={`${item.name} ${item.designation ? ' | ' + item.designation : ''}`} imagetransforms={processedImages} renderer="srcSet" imagename={imagename} strapi_id={item.strapi_id} />
        )
    }
    return (
        <div className="people-card-wrapper">
            <div className="people-card-img-zoom img-wrapper">
                <Link to={`/${PageLinks.team}/${props.data.slug}/`}>
                    <ImageRenderList item={props?.data} imagename={"team.image.tile_image"} />
                </Link>
            </div>
            <div className="people-card-text-wrapper">
                <div className="people-name">{props.data.name}</div>
                <div className="people-position">{props.data.designation}</div>
                <ul className="list-inline people-card-list">
                    {props.data.phone && <li className="list-inline-item">
                        <a href={`tel:${props.data.phone}`} className="people-phone">{props.data.phone}</a>
                    </li> }
                    <li className="list-inline-item">
                        <a  onClick={() => {navigate(`/${PageLinks.team_contact}/`,localStorage.setItem('team_name', props.data.name),localStorage.setItem('team_email', props.data.email) )}} className="people-email">Email</a>
                    </li>
                </ul>
            </div>
        </div>
    )
}

export default PeopleCard