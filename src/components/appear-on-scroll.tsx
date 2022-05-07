import * as React from "react";

type AppearOnScrollProps = {
  className: string | undefined;
}

const AppearOnScroll: React.FunctionComponent<AppearOnScrollProps> = ({ className, children }) => {
  const [show, setShow] = React.useState(false);
  const divRef = React.useRef<HTMLDivElement>(null);

  const onScroll = () => {
    if (divRef.current && (
      divRef.current.getBoundingClientRect().top < window.innerHeight / 2 ||
      divRef.current.getBoundingClientRect().bottom < window.innerHeight
    )) {
      setShow(true);
    }
  }

  React.useEffect(() => {
    window.addEventListener("scroll", () => onScroll());
    return window.removeEventListener("scroll", () => onScroll());
  }, []);

  return (
    <div ref={divRef} className={`appear-on-scroll ${show ? "shown" : "hidden"} ${className || ""}`}>
      {children}
    </div>
  )
};

export default AppearOnScroll;