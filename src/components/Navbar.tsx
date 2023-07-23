import * as React from "react";
import "../stylesheets/navbar.scss";
import { GatsbyImage, getImage } from "gatsby-plugin-image";
import type { NavbarQueryType } from "../utils/queryTypes";
import { graphql, useStaticQuery } from "gatsby";
import {
  getLinkWidth,
  getLinkOffset,
  getUnderlineSpanStyle
} from "../utils/helpers";
import { MOBILE_WIDTH } from "../utils/constants";

type NavbarProps = {
  links: NavLink[],
  pos: number,
  setPos: (i: number) => void
};

const Navbar: React.FunctionComponent<NavbarProps> = ({
  links,
  pos,
  setPos
}) => {
  const data: NavbarQueryType = useStaticQuery(graphql`
    {
      logo: contentfulImage(contentfulid: { eq: "logo" }) {
        image {
          gatsbyImageData(layout: CONSTRAINED, width: 50)
        }
      }
    }
  `);

  const logo = getImage(data.logo.image.gatsbyImageData);
  const linkRefs = React.useRef<HTMLAnchorElement[]>(
    Array(links.length).fill(null)
  );
  const [isMobile, setIsMobile] = React.useState(true);
  const [width, setWidth] = React.useState(0);
  const [offset, setOffset] = React.useState(0);
  const [navOpen, setNavOpen] = React.useState(false);

  const underlineDivStyle: React.CSSProperties = isMobile ? {
    transform: pos === -1
      ? "scaleY(0)"
      : `scaleY(1) translateY(${pos}00%)`,
    height: pos === -1 ? "0" : "24.5px"
  } : { width, transform: `translateX(${offset}px)` };

  const setNavPos = (pos: number) => {
    setPos(pos);
    if (isMobile) {
      setTimeout(() => setNavOpen(false), 200);
    }
  };

  const onNavLinkClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    pos: number
  ) => {
    e.preventDefault();
    setNavPos(pos);
  }

  React.useEffect(() => {
    const determineIsMobile = () => {
      setIsMobile(window.innerWidth <= MOBILE_WIDTH);
    };
    determineIsMobile();
    window.addEventListener("resize", determineIsMobile);
    return () => window.removeEventListener("resize", determineIsMobile);
  }, []);

  React.useEffect(() => {
    setWidth(getLinkWidth(linkRefs.current, pos));
    setOffset(getLinkOffset(linkRefs.current, pos));
  }, [linkRefs, pos]);

  React.useEffect(() => {
    const closeNav = () => setNavOpen(false);
    window.addEventListener("scroll", closeNav);
    return () => window.removeEventListener("scroll", closeNav);
  });

  return (
    <nav>
      <a
        href={"/"}
        onClick={(e) => onNavLinkClick(e, -1)}
      >
        {logo && (
          <GatsbyImage
            className={"logo"}
            alt={"Q++"}
            image={logo}
            objectFit={"contain"}
          />
        )}
      </a>
      <div className={"hamburger"} onClick={() => setNavOpen(!navOpen)}>
        <span />
        <span />
        <span />
      </div>
      <ul
        className={`${navOpen || !isMobile ? "" : "closed"} ${pos.toString()}`}
      >
        {links.map((
          { title, to },
          i
        ) => (
          <li key={to} onClick={() => setNavPos(i)}>
            <a
              ref={(ref) => linkRefs.current[i] = ref}
              onClick={(e) => onNavLinkClick(e, i)}
              href={to}
            >
              {title}
            </a>
          </li>
        ))}
        <div className={"underline"} style={underlineDivStyle}>
          <span
            style={getUnderlineSpanStyle(links, isMobile, width, pos, 0)}
          />
          <span
            style={getUnderlineSpanStyle(links, isMobile, width, pos, 1)}
          />
        </div>
      </ul>
    </nav>
  );
};

export default Navbar;