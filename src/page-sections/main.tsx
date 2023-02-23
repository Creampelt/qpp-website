import * as React from "react";
import { Helmet } from "react-helmet";
import Navbar from "../components/navbar";
import Header from "./header";
import About from "./about";
import GetInvolved from "./get-involved";
import Sponsors from "./sponsors";
import Footer from "../components/footer";
import "../stylesheets/index.scss";
import { graphql, useStaticQuery } from "gatsby";
import { MDXProvider } from "@mdx-js/react"

const BUFFER = 10;

type IndexProps = {
  section: number
};

type Query = {
  favicon: {
    image: {
      file: {
        url: string
      }
    }
  },
  title: {
    content: {
      content: string
    }
  },
  links: All<ContentfulNavbarTitle>
};

const Main: React.FunctionComponent<IndexProps> = ({ section }) => {
  const data: Query = useStaticQuery(graphql`
    {
      favicon: contentfulImage(contentfulid: { eq: "favicon" }) {
        image {
          file {
            url
          }
        }
      }
      title: contentfulText(contentfulid: { eq: "siteTitle" }) {
        content {
          content
        }
      }
      links: allContentfulSectionTitle(
        filter: { displayInNavbar: { eq: true } }
        sort: { index: ASC }
      ) {
        edges {
          node {
            title
            url
            colors
          }
        }
      }
    }
  `);

  const links: NavLink[] = data.links.edges.map(({ node }) => ({
    title: node.title,
    to: node.url,
    colors: node.colors
  }));

  const [pos, setPos] = React.useState(section);
  const [isScrolling, _setIsScrolling] = React.useState(false);
  const about = React.useRef<HTMLDivElement>(null);
  const getInvolved = React.useRef<HTMLDivElement>(null);
  const sponsors = React.useRef<HTMLDivElement>(null);

  const isScrollingRef = React.useRef<boolean>(isScrolling);
  const setIsScrolling = (value: boolean) => {
    isScrollingRef.current = value;
    _setIsScrolling(value);
  };

  const refs = [about, getInvolved, sponsors];

  const onScroll = (refs: React.RefObject<HTMLDivElement>[]) => {
    if (isScrollingRef.current) return;
    for (let i = refs.length - 1; i >= 0; i--) {
      const ref = refs[i].current;
      if (ref && i == 0 && ref.getBoundingClientRect().top > BUFFER) {
        setPos(-1);
        break;
      } else if (ref && ref.getBoundingClientRect().top <= BUFFER) {
        setPos(i);
        break;
      }
    }
  };

  const scrollTo = (i: number) => {
    setPos(i);
    if (i !== -1) {
      refs[i].current?.scrollIntoView({ behavior: "smooth" });
      waitForScrollToRef(refs[i]);
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" });
      waitForScrollToDest(() => window.scrollY);
    }
  };

  const waitForScrollToRef = async (ref: React.RefObject<HTMLDivElement>) => {
    const { current } = ref;
    if (!current) return;
    const getDest = () => current.getBoundingClientRect().top;
    await waitForScrollToDest(getDest);
  }

  const waitForScrollToDest = async (getDest: () => number) => {
    setIsScrolling(true);
    const scrolling = getDest() > 0
      ? () => (getDest() > 10)
      : () => (getDest() < -10);
    const timeout = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));
    while (scrolling()) {
      await timeout(25);
    }
    setIsScrolling(false)
  }

  React.useEffect(() => scrollTo(section), []);

  React.useEffect(() => {
    window.addEventListener("scroll", () => onScroll(refs));
    return window.removeEventListener("scroll", () => onScroll(refs));
  }, [refs]);

  React.useEffect(() => {
    window.history.pushState({}, "", pos == -1 ? "/" : links[pos].to);
  }, [pos]);

  return (
    <MDXProvider>
      <div>
        <Helmet>
          <meta charSet={"utf-8"} />
          <meta name={"viewport"} content={"width=device-width, initial-scale=1"} />
          <title>{data.title.content.content}</title>
          <link rel={"canonical"} href={"https://texasqpp.com"} />
          <link rel={"icon"} type={"image/x-icon"} href={data.favicon.image.file.url} />
        </Helmet>
        <Navbar links={links} pos={pos} setPos={scrollTo} />
        <main>
          <Header />
          <About ref={about} />
          <GetInvolved ref={getInvolved} />
          {/*<Sponsors ref={sponsors} />*/}
        </main>
        <Footer />
      </div>
    </MDXProvider>
  );
};

export default Main;
