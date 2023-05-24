/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.com/docs/reference/config-files/gatsby-node/
 */

/**
 * @type {import('gatsby').GatsbyNode['createPages']}
 */
const path = require("path")
const fs = require('fs');
const axios = require('axios').default;
const { toXML } = require('jstoxml');


exports.onCreatePage = ({ page, actions }) => {
  const { createPage } = actions

  // Property search results
  if (page.path === `/property//`) {
    page.matchPath = `/property/*`
    createPage(page)
  } else if (page.path.match(/^\/property\//)) {
    page.matchPath = "/property/*"
    createPage(page)
  }

}

exports.onPreBuild = async () => {

  const propAreajson = () => axios.get(`${process.env.GATSBY_STRAPI_SRC}/json/areas.json`);
  const allpropareajsondata = await propAreajson();

  if (allpropareajsondata) {
    fs.writeFileSync("./static/areas.json", JSON.stringify(allpropareajsondata.data), { flag: 'w+' })
  }

}

exports.onPostBuild = async () => {
  const propAreajson = () => axios.get(`${process.env.GATSBY_STRAPI_SRC}/json/areas.json`);
  const allpropareajsondata = await propAreajson();

  if (allpropareajsondata) {
    fs.writeFileSync("./static/areas.json", JSON.stringify(allpropareajsondata.data), { flag: 'w+' })
  }
  //robots.txt update when its production
  if ("production" == process.env.MY_SERVER_ENV) {
    let robotsTxt = "";
    robotsTxt = "User-agent: *" + "\n";
    robotsTxt += "Disallow: /email/" + "\n";
    robotsTxt += "Sitemap: " + process.env.GATSBY_SITE_URL + "/sitemap.xml" + "\n";
    robotsTxt += "Host: " + process.env.GATSBY_SITE_URL;

    fs.writeFileSync('./public/robots.txt', robotsTxt);
  } else {
    let robotsTxt = "";
    robotsTxt = "User-agent: *" + "\n";
    robotsTxt += "Disallow: /" + "\n";
    robotsTxt += "Sitemap: " + process.env.GATSBY_SITE_URL + "/sitemap.xml" + "\n";
    robotsTxt += "Host: " + process.env.GATSBY_SITE_URL;

    fs.writeFileSync('./public/robots.txt', robotsTxt);
  }
  //end robots txt

  // create results.xml
  var obj_area = JSON.parse(fs.readFileSync('./static/areas.json', 'utf8'));
  var obj_building;
  if (fs.existsSync('./src/search_config/property_type.json')) {
    obj_building = JSON.parse(fs.readFileSync('./src/search_config/property_type.json', 'utf8'));
  } else if (fs.existsSync('./src/gatsby-theme-starberry-mira/search_config/property_type.json')) {
    obj_building = JSON.parse(fs.readFileSync('./src/gatsby-theme-starberry-mira/search_config/property_type.json', 'utf8'));
  }
  var obj_ptype;
  if (fs.existsSync('./src/search_config/search_type.json')) {
    obj_ptype = JSON.parse(fs.readFileSync('./src/search_config/search_type.json', 'utf8'));
  } else if (fs.existsSync('./src/gatsby-theme-starberry-mira/search_config/search_type.json')) {
    obj_ptype = JSON.parse(fs.readFileSync('./src/gatsby-theme-starberry-mira/search_config/search_type.json', 'utf8'));
  }

  var myproparr = []
  var now = new Date();
  now.setSeconds(0, 0);
  var datetime = now.toISOString();//.replace(/T/, " ").replace(/:00.000Z/, "");

  obj_ptype.map((ptype) => {
    var ptypestr = ""
    if (ptype.value == "buy") {
      ptypestr = "for-sale"
    } else if (ptype.value == "rent") {
      ptypestr = "to-rent"
    }
    obj_area.map((area) => {

      var uriStr = ""
      if (area.slug != "") {
        uriStr = "property/" + ptypestr + "/in-" + area.slug

        myproparr.push({ "url": { "loc": `${process.env.GATSBY_SITE_URL}/${uriStr}/`, "lastmod": `${datetime}` } });

        obj_building.map((building, index) => {

          if (building.value != "") {

            uriStr = "property/" + ptypestr + "/in-" + area.slug + "/type-" + building.value

            myproparr.push({ "url": { "loc": `${process.env.GATSBY_SITE_URL}/${uriStr}/`, "lastmod": `${datetime}` } });

          }

        })
      }

    })

  })

  if (myproparr.length > 0) {
    const xmlOptions = {
      header: false,
      indent: '  ',
    };

    const feed = toXML({
      _name: 'urlset',
      _content: myproparr,
      _attrs: {
        xmlns: 'http://www.sitemaps.org/schemas/sitemap/0.9'
      }
    }, xmlOptions);

    try {
      fs.writeFileSync('./public/search.xml', feed, { encoding: 'utf8', flag: 'a+' });
    } catch (err) {
      console.log('Cannot write file!!!', err);
    }
  }
  // done results.xml
}



// // Implement the Gatsby API “createPages”. This is called once the
// // data layer is bootstrapped to let plugins create pages from data.
exports.createPages = async ({ graphql, actions, reporter }) => {
  const { createPage } = actions


  // Query for markdown nodes to use in creating pages.
  const result = await graphql(
    `
      {
        site {
          siteMetadata {
            pageLinks {
              career
              news
              team
              office
              areaguide
            }
          }
        }

        allStrapiProperty(sort: {fields: createdAt, order: DESC}) {
          edges {
            node {
              slug
              crm_id
              strapi_id
              search_type
            }
          }
        }
        
        
        allStrapiNewDevelopments(filter: {publish: {eq: true}}) {
          edges {
            node {
              slug
              strapi_id
            }
          }
        }

        allStrapiMenu(
          filter: {publish: {eq: true}, link_type: {eq: "internal"}, page: {layout: {ne: null}}}
        ) {
          edges {
            node {
              title
              slug
              strapi_id
              page {
                layout
                id
              }
              strapi_parent {
                slug
                strapi_parent {
                  slug
                }
              }
            }
          }
        }
        
        allStrapiBlog(filter: {publish: {eq: true}}) {
          edges {
            node {
              slug
              strapi_id
            }
          }
        }

        allStrapiAreaGuide(filter: {publish: {eq: true}}) {
          edges {
            node {
              slug
              strapi_id
            }
          }
        }
        
        allStrapiTeam(filter: {publish: {eq: true}}) {
          edges {
            node {
              slug
              strapi_id
            }
          }
        }

        allStrapiCareer(filter: {publish: {eq: true}}) {
          edges {
            node {
              slug
              strapi_id
            }
          }
        }

      }
    `
  )

  // Handle errors
  if (result.errors) {
    reporter.panicOnBuild(`Error while running GraphQL query.`)
    return
  }


  const landingPageTemplate = require.resolve(`./src/templates/landing-template.js`)
  const homePageTemplate = require.resolve(`./src/templates/home-template.js`)
  const staticPageTemplate = require.resolve(`./src/templates/static-template.js`)
  const propertyDetailsTemplate = require.resolve(`./src/templates/property-details.js`)
  const newDevelopmentDetailsTemplate = require.resolve(`./src/templates/new-development-details`)
  const newsLandingPageTemplate = require.resolve(`./src/templates/news-landing.js`)
  const areaGuideLandingPageTemplate = require.resolve(`./src/templates/areaguide-landing.js`)
  const newsDetailsTemplate = require.resolve(`./src/templates/news-details.js`)
  const teamLandingPageTemplate = require.resolve(`./src/templates/team-landing.js`)
  const teamDetailsTemplate = require.resolve(`./src/templates/team-details.js`)
  const valuationPageTemplate = require.resolve(`./src/templates/valuation-template.js`)
  const reviewsTemplate = require.resolve(`./src/templates/reviews-template.js`)
  const careerLandingPageTemplate = require.resolve(`./src/templates/career-landing.js`)
  const careerDetailsTemplate = require.resolve(`./src/templates/career-details.js`)
  const formTemplate = require.resolve(`./src/templates/form-template.js`)
  const areaGuideDetailsTemplate = require.resolve(`./src/templates/areaguide-details.js`)

  const menus_data = result.data.allStrapiMenu.edges;
  const news_data = result.data.allStrapiBlog.edges;
  const team_data = result.data.allStrapiTeam.edges;
  const jobs_data = result.data.allStrapiCareer.edges;
  const properties_data = result.data.allStrapiProperty.edges;
  const areaguide_data = result.data.allStrapiAreaGuide.edges;

  const site_data = result.data.site.siteMetadata?.pageLinks;

  menus_data.forEach(({ node }) => {
    let page_url = node.slug
    let page_layout = landingPageTemplate
    if (node.strapi_parent) {
      page_url = node.strapi_parent.slug + '/' + node.slug
    }
    if (node.strapi_parent && node.strapi_parent.strapi_parent) {
      page_url = node.strapi_parent.strapi_parent.slug + '/' + node.strapi_parent.slug + '/' + node.slug
    }
    if (node.page?.layout == 'landing_page') {
      page_layout = landingPageTemplate
    }
    if (node.page?.layout == 'home_page') {
      page_layout = homePageTemplate
    }
    if (node.page?.layout == 'static_page') {
      page_layout = staticPageTemplate
    }
    if (node.page?.layout == 'news_landing_page') {
      page_layout = newsLandingPageTemplate
    }
    if (node.page?.layout == 'areaguide_landing_page') {
      page_layout = areaGuideLandingPageTemplate
    }
    if (node.page?.layout == 'people_landing_page') {
      page_layout = teamLandingPageTemplate
    }
    if (node.page?.layout == 'valuation_landing_page') {
      page_layout = valuationPageTemplate
    }
    if (node.page?.layout == 'reviews_page') {
      page_layout = reviewsTemplate
    }
    if (node.page?.layout == 'careers_landing_page') {
      page_layout = careerLandingPageTemplate
    }
    if (node.page?.layout == 'form_page') {
      page_layout = formTemplate
    }
    if (page_url === 'home') {
      createPage({
        path: `/`,
        component: page_layout,
        context: {
          page_id: node.page.id,
        },
      })
    }
    else {
      createPage({
        path: page_url,
        component: page_layout,
        context: {
          page_id: node.page.id,
        },
      })
    }
  })

  news_data.forEach(({ node }) => {
    createPage({
      path: `/${site_data.news}/${node.slug}/`,
      component: newsDetailsTemplate,
      context: {
        page_id: node.strapi_id,
      },
    })
  })

  areaguide_data.forEach(({ node }) => {
    createPage({
      path: `/${site_data.areaguide}/${node.slug}/`,
      component: areaGuideDetailsTemplate,
      context: {
        page_id: node.strapi_id,
      },
    })
  })

  jobs_data.forEach(({ node }) => {
    createPage({
      path: `/${site_data.career}/${node.slug}/`,
      component: careerDetailsTemplate,
      context: {
        page_id: node.strapi_id,
      },
    })
  })

  team_data.forEach(({ node }) => {
    createPage({
      path: `/${site_data.team}/${node.slug}/`,
      component: teamDetailsTemplate,
      context: {
        page_id: node.strapi_id,
      },
    })
  })

  properties_data.forEach(({ node }) => {
    let details_path = '/property-for-sale'
    if (node.search_type == "lettings") {
      details_path = '/property-to-rent'
    }
    createPage({
      path: details_path + '/' + node.slug + '/' + node.strapi_id,
      component: propertyDetailsTemplate,
      context: {
        strapi_id: node.strapi_id,
      },
    })
  })
  
  result.data.allStrapiNewDevelopments.edges.forEach(({ node }) => {
    let details_path = '/new-home-for-sale'
    createPage({
      path: details_path + '/' + node.slug + '/' + node.strapi_id,
      component: newDevelopmentDetailsTemplate,
      context: {
        strapi_id: node.strapi_id,
      },
    })
  })

}