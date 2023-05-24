import { useStaticQuery, graphql } from "gatsby"

export const useAllStrapiTeam = () => {
  return useStaticQuery(
    graphql`
      query useAllStrapiTeam {
        allStrapiTeam(filter: {publish: {eq: true}}) {
          nodes {
            name
            property_team_mapping
            image {
              url
            }
            phone
            imagetransforms {
              image_Transforms
            }
            strapi_id
          }
        }
      }
    `
  )
}