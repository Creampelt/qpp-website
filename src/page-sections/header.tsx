import * as React from "react";
import { GatsbyImage, getImage } from "gatsby-plugin-image";
import { graphql, useStaticQuery } from "gatsby";
import "../stylesheets/index.scss";

type Query = {
  logo: ContentfulImage,
  logoSubtitle: { content: { content: string } }
};

const Header: React.FunctionComponent = () => {
  const data: Query = useStaticQuery(graphql`
    {
      logo: contentfulImage(contentfulid: { eq: "logo" }) {
        image {
          title
          gatsbyImageData(layout: CONSTRAINED)
        }
      }
      logoSubtitle: contentfulText(contentfulid: { eq: "logoSubtitle" }) {
        content {
          content
        }
      }
    }
  `);

  const image = getImage(data.logo.image.gatsbyImageData);
  return (
    <div className={"section index"}>
      {image && <GatsbyImage className={"logo-center"} image={image} alt={data.logo.image.title} />}
      <div className={"typewriter"}>
        <h2 className={"text"}>{data.logoSubtitle.content.content}</h2>
      </div>
    </div>
  );
};

export default Header;
