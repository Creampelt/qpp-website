import * as React from "react";
import type { FooterQueryType } from "../utils/queryTypes";
import { graphql, useStaticQuery } from "gatsby";

const Footer: React.FunctionComponent = () => {
  const data: FooterQueryType = useStaticQuery(graphql`
    query {
      footerLinks: allContentfulFooterLink(sort: { index: ASC }) {
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
          <img
            src={node.image.url}
            alt={node.contentfulid}
            title={node.contentfulid}
          />
        </a>
      ))}
    </footer>
  )
};

export default Footer;