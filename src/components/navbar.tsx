import * as React from "react";
import "../stylesheets/navbar.scss";
import { GatsbyImage, getImage } from "gatsby-plugin-image";
import { graphql, useStaticQuery } from "gatsby";

type Query = {
  logo: ContentfulImage
}

type NavbarProps = {
  links: NavLink[],
  pos: number,
  setPos: (i: number) => void
};

const Navbar: React.FunctionComponent<NavbarProps> = ({ links, pos, setPos }) => {
  const data: Query = useStaticQuery(graphql`
    {
      logo: contentfulImage(contentfulid: { eq: "logo" }) {
        image {
          gatsbyImageData(layout: CONSTRAINED, width: 50)
        }
      }
    }
  `);

  const logo = getImage(data.logo.image.gatsbyImageData);
  const linkRefs = React.useRef(Array(links.length).fill(null));
  const [isMobile, setIsMobile] = React.useState(false);
  const [width, setWidth] = React.useState(0);
  const [offset, setOffset] = React.useState(0);
  const [navOpen, setNavOpen] = React.useState(false);

  const getWidth = (i: number): number => {
    if (i === -1)
      return 0;
    const current = linkRefs.current[i];
    if (!current)
      return 0;
    return current.getBoundingClientRect().width;
  };

  const getOffset = (pos: number): number => {
    let o = 0;
    for (let i: number = 0; i < pos; i++) {
      o += getWidth(i) + 40;
    }
    return o;
  };

  const getUnderlineWidth = (pos: number, width: number, max: number): number => {
    const min = 15;
    return pos == -1 ? 0 : pos * (width - min * 2) / (max - 1) + min;
  };

  const toggleNavOpen = () => {
    setNavOpen((prev) => !prev);
  };

  const setNavPos = (pos: number) => {
    setPos(pos);
    if (isMobile) {
      setTimeout(() => setNavOpen(false), 200);
    }
  }

  const underlineWidth = getUnderlineWidth(pos, width, links.length);
  const underlineSpanStyle = (index: 0 | 1) => {
    let style = {};
    if (!isMobile && index === 0) {
      style = { width: underlineWidth };
    } else if (!isMobile) {
      style = { width: width - underlineWidth, left: underlineWidth };
    }
    return {
      ...style,
      backgroundColor: pos === -1 ? links[0].colors[index] : links[pos].colors[index]
    };
  }

  React.useEffect(() => {
    const determineIsMobile = () => setIsMobile(window.innerWidth <= 500);
    determineIsMobile();
    window.addEventListener("resize", determineIsMobile);
    return () => window.removeEventListener("resize", determineIsMobile);
  }, []);

  React.useEffect(() => {
    setWidth(getWidth(pos));
    setOffset(getOffset(pos));
  }, [linkRefs, pos]);

  return (
    <nav>
      <a href={"/"} onClick={(e) => { e.preventDefault(); setPos(-1) }}>
        {logo && <GatsbyImage className={"logo"} alt={"Q++"} image={logo} objectFit={"contain"} />}
      </a>
      <div className={"hamburger"} onClick={toggleNavOpen}>
        <span />
        <span />
        <span />
      </div>
      <ul className={`${navOpen || !isMobile ? "" : "closed"} ${pos.toString()}`}>
        {links.map(({ title, to }, i) => (
          <li key={to} onClick={() => setNavPos(i)}>
            <a
              ref={(ref) => linkRefs.current[i] = ref}
              onClick={(e) => { e.preventDefault(); setNavPos(i) }}
              href={to}
            >
              {title}
            </a>
          </li>
        ))}
        <div
          className={"underline"}
          style={isMobile ? {
            transform: pos === -1 ? "scaleY(0)" : `scaleY(1) translateY(${pos}00%)`,
            height: pos === -1 ? "0" : "24.5px"
          } : { width, transform: `translateX(${offset}px)` }}
        >
          <span style={underlineSpanStyle(0)} />
          <span style={underlineSpanStyle(1)} />
        </div>
      </ul>
    </nav>
  );
};

export default Navbar;