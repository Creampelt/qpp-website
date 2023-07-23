import * as React from "react";
import Heading from "../Heading";
import SponsorCategory from "../SponsorCategory";
import type { SponsorsQueryType } from "../../utils/queryTypes";
import { graphql, useStaticQuery } from "gatsby";

const Sponsors = React.forwardRef<HTMLDivElement>((
  _,
  ref
) => {
  const data: SponsorsQueryType = useStaticQuery(graphql`
    query {
      sponsorsTitle: contentfulSectionTitle(contentfulid: { eq: "sponsors" }) {
        title
      }
      sponsorText: contentfulText(contentfulid: { eq: "sponsorText" }) {
        content {
          childMarkdownRemark {
            html
          }
        }
      }
      sponsors: allContentfulSponsorCategory(sort: { index: ASC }) {
        edges {
          node {
            title
            sponsors {
              logo {
                gatsbyImageData(
                  layout: CONSTRAINED
                  width: 250
                  height: 200
                )
              }
              website
              name
            }
          }
        }
      }
    }
  `);
  const sponsors = data.sponsors.edges
    .map(({ node }) => node);
  return (
    <div ref={ref} className={"section sponsors"}>
      <Heading>{data.sponsorsTitle.title}</Heading>
      <span dangerouslySetInnerHTML={{
        __html: data.sponsorText.content.childMarkdownRemark.html
      }} />
      {sponsors.map((category) => (
        <SponsorCategory {...category} key={category.title} />
      ))}
    </div>
  )
});

export default Sponsors;