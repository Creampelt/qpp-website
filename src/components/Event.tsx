import * as React from "react";
import { DATE_FORMAT } from "../utils/constants";

type EventElementProps = UpcomingEvent;

const EventElement: React.FunctionComponent<EventElementProps> = ({
  name,
  location,
  start,
  end
}) => (
  <div className={"event"} key={`${name}_${location}_${start.format(DATE_FORMAT)}_${end.format(DATE_FORMAT)}`}>
    <div className={"bullet"} />
    <div>
      <h6 className={"column name-column"}>{name}</h6>
      <p className={"column"}>{location}</p>
      <p className={"column"}>
        {start.isSame(end, "day")
          ? `${start.format("M/D")} from ${start.format("h:mma")} to ${end.format("h:mma")}`
          : `${start.format("M/D [at] h:mma")} to ${end.format("M/D [at] h:mma")}`
        }
      </p>
    </div>
  </div>
);

export default EventElement;