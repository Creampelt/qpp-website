import * as React from "react";
import Heading from "../components/heading";
import { graphql, useStaticQuery } from "gatsby";
import { GatsbyImage, getImage } from "gatsby-plugin-image";

type CategoryProps = {
  title: string,
  sponsors: Sponsor[]
};

type Query = {
  sponsorsTitle: ContentfulSectionTitle,
  formFields: All<ContentfulFormField>,
  sponsors: All<ContentfulSponsorCategory>
}

const Category: React.FunctionComponent<CategoryProps> = ({ title, sponsors }) => (
  <div className={`category ${title.toLowerCase()}`}>
    <h2>{title}</h2>
    <div>
      {sponsors.map((sponsor, i) => {
        const image = getImage(sponsor.logo.gatsbyImageData);
        return image ? (
          <a key={i} href={sponsor.website} target={"_blank"}>
            <GatsbyImage
              image={image}
              objectFit={"contain"}
              alt={sponsor.name}
            />
          </a>
        ) : null;
      })}
    </div>
  </div>
);

const Sponsors = React.forwardRef<HTMLDivElement>((_, ref) => {
  const data: Query = useStaticQuery(graphql`
    {
      sponsorsTitle: contentfulSectionTitle(contentfulid: { eq: "sponsors" }) {
        title
      }
      formFields: allContentfulFormField(sort: { fields: index }) {
        edges {
          node {
            title
            type
            options
          }
        }
      }
      sponsors: allContentfulSponsorCategory(sort: { fields: index }) {
        edges {
          node {
            title
            sponsors {
              logo {
                gatsbyImageData(layout: CONSTRAINED)
              }
              website
              name
            }
          }
        }
      }
    }
  `);

  const sponsors = data.sponsors.edges.map(({ node }) => node);

  return (
    <div ref={ref} className={"section sponsors"}>
      <Heading>{data.sponsorsTitle.title}</Heading>
      {sponsors.map((category) => <Category {...category} key={category.title} />)}
    </div>
  )
});

export default Sponsors;