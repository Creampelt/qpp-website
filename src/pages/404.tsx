import * as React from "react";
import { graphql, Link, useStaticQuery } from "gatsby";
import { Helmet } from "react-helmet";
import "../stylesheets/index.scss";
import "../stylesheets/404.scss";

type Query = {
  favicon: {
    image: {
      file: {
        url: string
      }
    }
  },
  svg404: {
    image: {
      url: string
    }
  }
};

const NotFoundPage = () => {
  const data: Query = useStaticQuery(graphql`
    {
      favicon: contentfulImage(contentfulid: { eq: "favicon" }) {
        image {
          file {
            url
          }
        }
      }
      svg404: contentfulImage(contentfulid: { eq: "404" }) {
        image {
          url
        }
      }
    }
  `);

  return (
    <main className={"not-found-page"}>
      <Helmet>
        <meta charSet={"utf-8"}/>
        <meta name={"viewport"} content={"width=device-width, initial-scale=1"}/>
        <title>404: Not Found</title>
        <link rel={"icon"} type={"image/x-icon"} href={data.favicon.image.file.url} />
      </Helmet>
      <img src={data.svg404.image.url} alt={"404"} />
      <p>
        Whoops! Not sure how you got here, but this URL doesn't exist. Try
        something else or <Link to={"/"}>return home</Link>.
      </p>
    </main>
  )
};

export default NotFoundPage;
