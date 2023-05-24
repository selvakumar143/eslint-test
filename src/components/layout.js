/**
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.com/docs/how-to/querying-data/use-static-query/
 */

import * as React from "react"
import Header from "./Header/Header";
import loadable from "@loadable/component";
import "../styles/main.scss";
import "animate.css/animate.min.css";
const Footer = loadable(() => import("./Footer/Footer"));

 const Layout = ({ children, layout, footertag, popularSearch }) => {
   return (
     <>
      <Header 
        layout={layout}
      />
        <main>{children}</main>
      <Footer 
        popularSearch={popularSearch}
        footertag={footertag}
      />
     </>
   )
 }
 
 export default Layout