import * as React from "react";
import Heading from "../Heading";
import Form from "../Form";
import EventElement from "../Event";
import dayjs from "dayjs";
import type { GetInvolvedQueryType } from "../../utils/queryTypes";
import { graphql, useStaticQuery } from "gatsby";
import axios, { AxiosResponse } from "axios";
import { EVENTS_ENDPOINT } from "../../utils/constants";

type EventsResponse = AxiosResponse<{
  data: {
    events: QueriedEvent[]
  }
}>;

const GetInvolved = React.forwardRef<HTMLDivElement>((
  _,
  ref
) => {
  const data: GetInvolvedQueryType = useStaticQuery(graphql`
    query {
      getInvolvedTitle: contentfulSectionTitle(
        contentfulid: { eq: "getInvolved" }
      ) {
        title
      }
      formFields: allContentfulFormField(
        filter: { formId: { eq: "getInvolved" } }
        sort: { index: ASC }
      ) {
        edges {
          node {
            contentfulid
            title
            type
            options
          }
        }
      }
      upcomingEventsTitle: contentfulSectionTitle(
        contentfulid: { eq: "upcomingEvents" }
      ) {
        title
      }
    }
  `);
  const [
    events,
    setEvents
  ] = React.useState<UpcomingEvent[]>([]);

  React.useEffect(() => {
    axios.get(EVENTS_ENDPOINT).then(({ data }: EventsResponse) => {
      const now = dayjs();
      const upcomingEvents = data.data.events.map(({
        startTime,
        endTime,
        ...event
      }) => ({
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
        name={"get-involved"}
        fields={data.formFields.edges.map(({ node }): FormField => ({
          ...node,
          id: node.contentfulid
        }))}
      />
      <div className={"upcoming-events"}>
        <h2>{data.upcomingEventsTitle.title}</h2>
        <div className={"events-list"}>
          {events.length === 0 ? (
            <p className={"no-events"}>
              There are currently no scheduled events.
            </p>
          ) : events.map((event, i) => (
            <EventElement key={i} {...event} />
          ))}
        </div>
      </div>
    </div>
  )
});

export default GetInvolved;