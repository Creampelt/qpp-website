import * as React from "react";
import Heading from "../Heading";
import AppearOnScroll from "../AppearOnScroll";
import BenefitCard from "../BenefitCard";
import type { AboutQueryType } from "../../utils/queryTypes";
import { graphql, useStaticQuery } from "gatsby";

const About = React.forwardRef<HTMLDivElement>((
  _,
  ref
) => {
  const data: AboutQueryType = useStaticQuery(graphql`
    query {
      aboutTitle: contentfulSectionTitle(contentfulid: { eq: "about" }) {
        title
      }
      aboutDescription: contentfulText(
        contentfulid: { eq: "aboutDescription" }
      ) {
        content {
          childMarkdownRemark {
            html
          }
        }
      }
      benefits: allContentfulBenefit(sort: { index: ASC }) {
        edges {
          node {
            img {
              title
              url
            }
            title
            body {
              childMarkdownRemark {
                html
              }
            }
          }
        }
      }
    }
  `);

  return (
    <div ref={ref} className={"section about"}>
      <div className={"intro"}>
        <Heading>{data.aboutTitle.title}</Heading>
        <span
          className={"about-intro"}
          dangerouslySetInnerHTML={{
            __html: data.aboutDescription.content.childMarkdownRemark.html
        }}
        />
      </div>
      <AppearOnScroll className={"benefits"}>
        {data.benefits.edges.map(({ node }) => (
          <BenefitCard
            {...node}
            body={node.body.childMarkdownRemark.html}
            key={node.title}
          />
        ))}
      </AppearOnScroll>
    </div>
  );
});

export default About;