import * as React from "react";
import { GatsbyImage, getImage } from "gatsby-plugin-image";
import Typewriter from "../Typewriter";
import type { HeaderQueryType } from "../../utils/queryTypes";
import { graphql, useStaticQuery } from "gatsby";

const Header: React.FunctionComponent = () => {
  const data: HeaderQueryType = useStaticQuery(graphql`
    query {
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
      {image && (
        <GatsbyImage
          className={"logo-center"}
          image={image}
          alt={data.logo.image.title}
          objectFit={"contain"}
        />
      )}
      <Typewriter duration={2} text={data.logoSubtitle.content.content} />
    </div>
  );
};

export default Header;
