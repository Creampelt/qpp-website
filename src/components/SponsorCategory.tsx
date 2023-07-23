import * as React from "react";
import { GatsbyImage, getImage } from "gatsby-plugin-image";

type SponsorCategoryProps = {
  title: string,
  sponsors: Sponsor[]
};

const SponsorCategory: React.FunctionComponent<SponsorCategoryProps> = ({
  title,
  sponsors = []
}) => (
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

export default SponsorCategory;