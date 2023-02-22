import * as React from "react";
import Heading from "../components/heading";
import Form from "../components/form";
import dayjs from "dayjs";
import { graphql, useStaticQuery } from "gatsby";
import axios, { AxiosResponse } from "axios";

const DATE_FORMAT = "YYYY-MM-DD hh:mm A";
const EVENTS_ENDPOINT = "https://us-central1-org-assistant.cloudfunctions.net/getEvents?orgId=xHtVQbaPJrwOFKJ6kJbc&seasonId=Spring%202023";

type Query = {
  getInvolvedTitle: ContentfulSectionTitle,
  formFields: All<ContentfulFormField>,
  upcomingEventsTitle: ContentfulSectionTitle
};

type EventsResponse = AxiosResponse<{
  data: {
    events: QueriedEvent[]
  }
}>;

const EventElement: React.FunctionComponent<UpcomingEvent> = ({ name, location, start, end }) => (
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

const GetInvolved = React.forwardRef<HTMLDivElement>((_, ref) => {
  const data: Query = useStaticQuery(graphql`
    {
      getInvolvedTitle: contentfulSectionTitle(contentfulid: { eq: "getInvolved" }) {
        title
      }
      formFields: allContentfulFormField(filter: { formId: { eq: "getInvolved" } }, sort: { fields: index }) {
        edges {
          node {
            contentfulid
            title
            type
            options
          }
        }
      }
      upcomingEventsTitle: contentfulSectionTitle(contentfulid: { eq: "upcomingEvents" }) {
        title
      }
    }
  `);

  const [events, setEvents] = React.useState<UpcomingEvent[]>([]);

  React.useEffect(() => {
    axios.get(EVENTS_ENDPOINT).then(({ data }: EventsResponse) => {
      const now = dayjs();
      const upcomingEvents = data.data.events
        .map(({ startTime, endTime, ...event }) => ({
        ...event,
        start: dayjs.unix(startTime["_seconds"]),
        end: dayjs.unix(endTime["_seconds"])
      })).filter(({ end }) => end.isAfter(now, "minutes"))
      setEvents(upcomingEvents);
    }).catch((e) => console.error(e.message));
  }, []);

  return (
    <div ref={ref} className={"section get-involved"}>
      <Heading>{data.getInvolvedTitle.title}</Heading>
      <Form
        formName={"get-involved"}
        data={data.formFields.edges.map(({ node }) => ({
          ...node,
          id: node.contentfulid
        }))}
      />
      <div className={"upcoming-events"}>
        <h2>{data.upcomingEventsTitle.title}</h2>
        <div className={"events-list"}>
          {events.length === 0
            ? <p className={"no-events"}>There are currently no scheduled events.</p>
            : events.map((event, i) => <EventElement key={i} {...event} />)}
        </div>
      </div>
    </div>
  )
});

export default GetInvolved;