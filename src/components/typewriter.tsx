import * as React from "react";

type TypewriterProps = {
  duration: number,
  text: string
}

const Typewriter: React.FunctionComponent<TypewriterProps & React.HTMLProps<HTMLDivElement>> = ({ duration, text }) => {
  const [displayedIndex, setDisplayedIndex] = React.useState(0);
  const [timer, setTimer] = React.useState<ReturnType<typeof setTimeout> | null>(null);

  const displayNextIndex = (i: number = 1) => {
    if (i > text.length) return;
    setDisplayedIndex(i);
    setTimer(
      setTimeout(() => displayNextIndex(i + 1), duration * 1000 / text.length)
    );
  }

  React.useEffect(() => {
    if (timer)
      clearTimeout(timer);
    displayNextIndex();
  }, [text, duration]);

  return (
    <div className={"typewriter"}>
      <p className={"text"}>
        {displayedIndex >= text.length ? text : text.slice(0, displayedIndex)}
        <span className={"cursor"} />
      </p>
    </div>
  );
};

export default Typewriter;