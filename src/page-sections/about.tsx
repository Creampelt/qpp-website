import * as React from "react";
import Heading from "../components/heading";
import AppearOnScroll from "../components/appear-on-scroll";
import { graphql, useStaticQuery } from "gatsby";

type Query = {
  aboutTitle: ContentfulSectionTitle,
  aboutDescription: { content: { content: string } },
  benefits: All<ContentfulBenefit>
}

const BenefitCard: React.FunctionComponent<Benefit> = ({ img, title, body }) => (
  <div className={"benefit-card"}>
    <img src={img.url} alt={img.title} />
    <h3>{title}</h3>
    <p>{body}</p>
  </div>
);

const About = React.forwardRef<HTMLDivElement>((_, ref) => {
  const data: Query = useStaticQuery(graphql`
    {
      aboutTitle: contentfulSectionTitle(contentfulid: { eq: "about" }) {
        title
      }
      aboutDescription: contentfulText(contentfulid: { eq: "aboutDescription" }) {
        content {
          content
        }
      }
      benefits: allContentfulBenefit(sort: { fields: index }) {
        edges {
          node {
            img {
              title
              url
            }
            title
            body {
              body
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
        <p className={"about-intro"}>{data.aboutDescription.content.content}</p>
      </div>
      <AppearOnScroll className={"benefits"}>
        {data.benefits.edges.map(({ node }) => <BenefitCard {...node} body={node.body.body} key={node.title} />)}
      </AppearOnScroll>
    </div>
  );
});

export default About;