import * as React from "react";
import { graphql, useStaticQuery } from "gatsby";

type Query = {
  footerLinks: All<ContentfulFooterLink>
};

const Footer: React.FunctionComponent = () => {
  const data: Query = useStaticQuery(graphql`
    {
      footerLinks: allContentfulFooterLink(sort: { fields: index }) {
        edges {
          node {
            image {
              url
            }
            contentfulid
            url
          }
        }
      }
    }
  `);

  return (
    <footer>
      {data.footerLinks.edges.map(({ node }) => (
        <a key={node.contentfulid} href={node.url} target={"_blank"}>
          <img src={node.image.url} alt={node.contentfulid} title={node.contentfulid} />
        </a>
      ))}
    </footer>
  )
};

export default Footer;