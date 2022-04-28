/** @type {import('gatsby').GatsbyConfig} */
module.exports = {
  siteMetadata: {
    title: `Q++ &bull; UT Austin`,
    siteUrl: `https://texasqpp.com`
  },
  plugins: [
    "gatsby-plugin-sass",
    "gatsby-plugin-image",
    "gatsby-plugin-react-helmet",
    "gatsby-plugin-sharp",
    "gatsby-transformer-sharp",
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
  ]
};