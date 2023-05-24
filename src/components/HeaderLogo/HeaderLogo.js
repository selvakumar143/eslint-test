import React from "react";
import { Link } from "gatsby";
import LogoImg from "../../images/logo.svg";
import './assets/styles/_index.scss';

const HeaderLogo = (props) => {
    return (
        <Link to="/" className="navbar-brand">
            <img src={LogoImg} alt="" className="logo-img" />
        </Link>
    )
}

export default HeaderLogo