import * as React from "react";
import Heading from "../components/heading";
import dellLogo from "../images/dellLogo.png";
import ciscoLogo from "../images/ciscoLogo.png";

type CategoryProps = {
  title: string,
  sponsors: Sponsor[]
};

const SPONSORS: SponsorCategory[] = [
  {
    title: "Rainbow",
    sponsors: [
      { name: "Dell", logo: dellLogo, website: "https://google.com" },
      { name: "Dell", logo: dellLogo, website: "https://google.com" },
      { name: "Dell", logo: dellLogo, website: "https://google.com" },
      { name: "Cisco", logo: ciscoLogo, website: "https://google.com" },
      { name: "Cisco", logo: ciscoLogo, website: "https://google.com" },
      { name: "Dell", logo: dellLogo, website: "https://google.com" }
    ]
  },
  {
    title: "Gold",
    sponsors: [
      { name: "Dell", logo: dellLogo, website: "https://google.com" },
      { name: "Dell", logo: dellLogo, website: "https://google.com" },
      { name: "Dell", logo: dellLogo, website: "https://google.com" },
      { name: "Cisco", logo: ciscoLogo, website: "https://google.com" },
      { name: "Cisco", logo: ciscoLogo, website: "https://google.com" },
      { name: "Dell", logo: dellLogo, website: "https://google.com" }
    ]
  },
  {
    title: "Silver",
    sponsors: [
      { name: "Dell", logo: dellLogo, website: "https://google.com" },
      { name: "Dell", logo: dellLogo, website: "https://google.com" },
      { name: "Cisco", logo: ciscoLogo, website: "https://google.com" },
      { name: "Dell", logo: dellLogo, website: "https://google.com" }
    ]
  },
  {
    title: "Bronze",
    sponsors: [
      { name: "Dell", logo: dellLogo, website: "https://google.com" },
      { name: "Dell", logo: dellLogo, website: "https://google.com" },
      { name: "Dell", logo: dellLogo, website: "https://google.com" }
    ]
  }
];

const Category: React.FunctionComponent<CategoryProps> = ({ title, sponsors }) => (
  <div className={`category ${title.toLowerCase()}`}>
    <h2>{title}</h2>
    <div>
      {sponsors.map((sponsor, i) => (
        <a key={i} href={sponsor.website} target={"_blank"}>
          <img src={sponsor.logo} alt={sponsor.name} />
        </a>
      ))}
    </div>
  </div>
);

const Sponsors = React.forwardRef<HTMLDivElement>((_, ref) => (
  <div ref={ref} className={"section sponsors"}>
    <Heading>Sponsors</Heading>
    {SPONSORS.map((category) => <Category {...category} />)}
  </div>
));

export default Sponsors;