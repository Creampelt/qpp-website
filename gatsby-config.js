/** @type {import('gatsby').GatsbyConfig} */
require("dotenv").config({
  path: `.env.${process.env.NODE_ENV}`,
})

module.exports = {
  siteMetadata: {
    title: `Q++ &bull; UT Austin`,
    siteUrl: `https://texasqpp.com`,
    description: "Official website for Q++, the organization for LGBTQ+ people in tech at the University of Texas at Austin."
  },
  plugins: [
    "gatsby-plugin-sass",
    "gatsby-plugin-image",
    "gatsby-plugin-react-helmet",
    "gatsby-transformer-sharp",
    {
      resolve: "gatsby-plugin-sharp",
      options: {
        defaults: {
          placeholder: "none",
          backgroundColor: "transparent"
        }
      }
    },
    {
      resolve: "gatsby-source-filesystem",
      options: {
        "name": "images",
        "path": "./src/images/"
      },
      __key: "images"
    },
    {
      resolve: "gatsby-plugin-google-fonts",
      options: {
        fonts: [
          "roboto mono\:400,700",
          "roboto"
        ],
        display: 'swap'
      }
    },
    {
      resolve: "gatsby-source-contentful",
      options: {
        spaceId: "wnncb7ll2syo",
        accessToken: "-BvK0N2zpIzJRB81G06cHJaPRcmQ36KpRboIqn0Zy3g",
      },
    },
    {
      resolve: `gatsby-transformer-remark`,
      options: {},
    },
  ]
};