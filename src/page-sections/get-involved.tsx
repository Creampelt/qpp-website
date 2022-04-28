import * as React from "react";
import Heading from "../components/heading";
import Form from "../components/form";
import moment from "moment";

const dateFormat = "YYYY-MM-DD hh:mm A";

const EVENTS: UpcomingEvent[] = [
  { name: "Emily & Esther Wedding", location: "GDC 5.302", start: moment("2022-04-02 12:00 PM", dateFormat), end: moment("2022-04-02 06:00 PM", dateFormat) },
  { name: "Emily & Vincent Wedding", location: "GDC 5.302", start: moment("2022-04-09 12:00 PM", dateFormat), end: moment("2022-04-09 12:01 PM", dateFormat) },
  { name: "Emily & Sun Wedding", location: "GDC 5.302", start: moment("2022-04-16 12:00 PM", dateFormat), end: moment("2022-04-17 06:00 PM", dateFormat) },
  { name: "Emily & Lexi Wedding", location: "GDC 5.302", start: moment("2022-04-23 12:00 PM", dateFormat), end: moment("2022-04-23 06:00 PM", dateFormat) },
  { name: "Emily & Caterina Wedding", location: "GDC 5.302", start: moment("2022-04-30 12:00 PM", dateFormat), end: moment("2022-04-30 06:00 PM", dateFormat) },
  { name: "Emily & Esther Wedding", location: "GDC 5.302", start: moment("2022-04-02 12:00 PM", dateFormat), end: moment("2022-04-02 06:00 PM", dateFormat) },
  { name: "Emily & Vincent Wedding", location: "GDC 5.302", start: moment("2022-04-09 12:00 PM", dateFormat), end: moment("2022-04-09 12:01 PM", dateFormat) },
  { name: "Emily & Sun Wedding", location: "GDC 5.302", start: moment("2022-04-16 12:00 PM", dateFormat), end: moment("2022-04-17 06:00 PM", dateFormat) },
  { name: "Emily & Lexi Wedding", location: "GDC 5.302", start: moment("2022-04-23 12:00 PM", dateFormat), end: moment("2022-04-23 06:00 PM", dateFormat) },
  { name: "Emily & Caterina Wedding", location: "GDC 5.302", start: moment("2022-04-30 12:00 PM", dateFormat), end: moment("2022-04-30 06:00 PM", dateFormat) },
];

const EventElement: React.FunctionComponent<UpcomingEvent> = ({ name, location, start, end }) => (
  <div className={"event"}>
    <div className={"bullet"} />
    <div>
      <h6>{name}</h6>
      <p>{location}</p>
      <p>
        {start.isSame(end, "day")
          ? `${start.format("M/D")} from ${start.format("h:mma")} to ${end.format("h:mma")}`
          : `${start.format("M/D [at] h:mma")} to ${end.format("M/D [at] h:mma")}`
        }
      </p>
    </div>
  </div>
);

const GetInvolved = React.forwardRef<HTMLDivElement>((_, ref) => (
  <div ref={ref} className={"section get-involved"}>
    <Heading>Get Involved</Heading>
    <Form />
    <div className={"upcoming-events"}>
      <h2>Upcoming Events</h2>
      <div className={"events-list"}>
        {EVENTS.map((event, i) => <EventElement key={i} {...event} />)}
      </div>
    </div>
  </div>
));

export default GetInvolved;