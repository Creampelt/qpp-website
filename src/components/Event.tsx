import * as React from "react";

type EventElementProps = UpcomingEvent;

const EventElement: React.FunctionComponent<EventElementProps> = ({
  name,
  location,
  start,
  end
}) => (
  <li className={"event"}>
    <h6 className={"column name-column"}>{name}</h6>
    <p className={"column"}>{location}</p>
    <p className={"column"}>
      {start.isSame(end, "day")
        ? `${start.format("M/D")} from ${start.format("h:mma")} to ${end.format("h:mma")}`
        : `${start.format("M/D [at] h:mma")} to ${end.format("M/D [at] h:mma")}`
      }
    </p>
  </li>
);

export default EventElement;