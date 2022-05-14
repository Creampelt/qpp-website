import * as React from "react";
import "../stylesheets/navbar.scss";
import logo from "../images/logo_alpha_2048.png";

type NavbarProps = {
  links: NavLink[],
  pos: number,
  setPos: (i: number) => void
};

const Navbar: React.FunctionComponent<NavbarProps> = ({ links, pos, setPos }) => {
  const linkRefs = React.useRef(Array(links.length).fill(null));
  const [width, setWidth] = React.useState(0);
  const [offset, setOffset] = React.useState(0);

  const getWidth = (i: number) => (
    i == -1 ? 0 : linkRefs.current[i]?.getBoundingClientRect().width
  );

  const getOffset = (pos: number) => {
    let o = 0;
    for (let i: number = 0; i < pos; i++) {
      o += getWidth(i) + 40;
    }
    return o;
  };

  const getUnderlineWidth = (pos: number, width: number, max: number) => {
    const min = 15;
    return pos == -1 ? 0 : pos * (width - min * 2) / (max - 1) + min;
  }

  const underlineWidth = getUnderlineWidth(pos, width, links.length);

  React.useEffect(() => {
    setWidth(getWidth(pos));
    setOffset(getOffset(pos));
  }, [linkRefs, pos]);

  return (
    <nav>
      <a href={"/"} onClick={(e) => { e.preventDefault(); setPos(-1) }}>
        <img className={"logo"} src={logo} alt={"Q++"}/>
      </a>
      <ul className={pos.toString()}>
        {links.map(({title, to}, i) => (
          <li key={to} onClick={() => setPos(i)}>
            <a
              ref={(ref) => linkRefs.current[i] = ref}
              onClick={(e) => { e.preventDefault(); setPos(i) }}
              href={to}
            >
              {title}
            </a>
          </li>
        ))}
        <div
          className={"underline"}
          style={{ width, transform: `translateX(${offset}px)` }}
        >
          <span style={{
            backgroundColor: pos == -1 ? links[0].colors[0] : links[pos].colors[0],
            width: underlineWidth
          }} />
          <span style={{
            backgroundColor: pos == -1 ? links[0].colors[1] : links[pos].colors[1],
            width: width - underlineWidth, left: underlineWidth
          }} />
        </div>
      </ul>
    </nav>
  );
};

export default Navbar;